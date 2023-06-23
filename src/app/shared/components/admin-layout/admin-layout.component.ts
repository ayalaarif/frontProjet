import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { AnneeScolaire } from '../../models/annee-scolaire.model';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit { 
  @ViewChild('closeModal') closeModal!: ElementRef; 
  A=new AnneeScolaire()
   data:any
  user!: User;
  changeA=false
  annees:any
  annee_id=0
  constructor(private authService: AuthService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.reloadIfNecessary();
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString)
    }
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    // if(sessionStorage.getItem("changeAnnee")){
      let a=sessionStorage.getItem('annee');
      if (a) {
        this.A = JSON.parse(a)
      }
    //   // this.anneeService.changeAnneeScolaire(this.A.id)
      
    // }else{
    //   this.anneeService.getlastyear().subscribe(res=>{
    //     console.log(res);
    //     this.data=res
    //     this.A=this.data;
    //      this.anneeService.changeAnneeScolaire(this.A.id)
    //    // this.A=this.data
    //    // console.log(this.A)
          
    //   }) 
      
    
   
  // console.log(this.A)
    // this.anneeService.annee=this.annee
    // console.log(this.anneeService.annee)
    this.listeAnnees()
    
  }

  reloadIfNecessary() {
    var isLoadedBefore = sessionStorage.getItem("IsLoadedBefore");
    if (isLoadedBefore == "true") {
      return;
    }
    else {
      sessionStorage.setItem("IsLoadedBefore", "true");
      /*use your reload method*/
      window.location.reload();
    }
  }

  logout() {
    this.authService.logout();
  }
  listeAnnees(){
    this.anneeService.getAnnees().subscribe(res=>{
      console.log(res);
      this.annees=res;
    })
  }
  changerAnnee(){
    this.A = this.annees.find((element:any) => element.id==this.A.id);
    sessionStorage.removeItem('annee');
    sessionStorage.setItem('annee', JSON.stringify(this.A));
    console.log(this.A)
    // this.anneeService.changeAnneeScolaire(this.A.id)
    this.closeModal.nativeElement.click();
     window.location.reload();
    
  }
  // getLastYear(){
  //   this.anneeService.getlastyear().subscribe(res=>{
  //     console.log(res);
  //     this.annee=res;
  //     console.log(this.annee)
        
  //   }) 

  // }

}
