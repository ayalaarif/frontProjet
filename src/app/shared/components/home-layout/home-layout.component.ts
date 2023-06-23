import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnneeScolaire } from '../../models/annee-scolaire.model';
import { LoginVM } from '../../models/viewModels/login-vm.model';
import { AuthService } from '../../services/auth.service';
import { AnneeScolaireService} from '../../services/annee-scolaire.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('closeModal') closeModal!: ElementRef;
  isAuth!: boolean;
  msgError!: string[];
  role!: string
  A=new AnneeScolaire()
  data:any
  listNotifications!: Notification[];
  newNotifs!: number;
  intervalId!: any;

  constructor(private authService: AuthService, private router: Router, private ns: NotificationService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("IsLoadedBefore");
    sessionStorage.getItem('user') ? this.isAuth = true : this.isAuth = false;
    console.log(this.isAuth);

    this.role= this.authService.getRole()
    this.anneeService.getlastyear().subscribe(res=>{
      console.log(res);
      this.data=res
      this.A=this.data;
      sessionStorage.setItem('annee', JSON.stringify(this.A));
    // console.log("role:"+ this.role)
  
  })

   
    // console.log("role:"+ this.role)


    if (this.isAuth && this.role === 'parentt') {
      let idParent = this.authService.getParentId();
      this.getNotifications(idParent);
      this.intervalId = window.setInterval(() => {
        /// call your function here
        this.getNotifications(idParent);
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId)
      clearInterval(this.intervalId)
  }

  login(data: LoginVM) {
    console.log(data);
    this.authService.login(data).subscribe(result => {
      console.warn(result);

      /***** After login ******/
      sessionStorage.setItem('user', JSON.stringify(result.user));
      sessionStorage.setItem('token', JSON.stringify(result.token));
      this.closeModal.nativeElement.click();
      this.isAuth = true;
      if (result.user.role === 'admin') {
        this.router.navigate(['/admin']);
      }
      else if (result.user.role === 'eleve') {
        this.router.navigate(['/eleve/accueil']);
      }
      else if (result.user.role === 'enseignant') {
        this.router.navigate(['/enseignant']);
      }
      else if (result.user.role === 'parentt') {
        this.router.navigate(['/parent']);
      }

    },
      err => {
        console.warn("Erreur login:", err);
        this.msgError = err.error.message;

      })
  }

  logout() {
    this.authService.logout();
    this.isAuth = false;
  }

  // getRole(){
  //   this.data= sessionStorage.getItem('user');
  //   if(this.data.user.role=== 'enseignant')
  //   this.isEnseignant= true
  //   console.log("ens: "+this.isEnseignant)
  // }

  getNotifications(id: number) {
    this.ns.getNotifications(id).subscribe(res => {
      this.listNotifications = res;
      this.newNotifs = this.listNotifications.filter(x => x.isOpen == false).length
    })
  }

  onOpenNotif(notif: Notification) {
    //call api openNotification ==> modifier isopen à true
    this.ns.openNotification(notif.id).subscribe(res => {
      if(this.newNotifs!=0){
        this.newNotifs--;
      }
      
      if (notif.type == "Punition") {
        this.router.navigate(['parent/punitions'])
      }

      if (notif.type == "Discipline") {
        this.router.navigate(['parent/discipline'])
      }
    })


  }

}
