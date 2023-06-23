import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent.service';

@Component({
  selector: 'app-afficher-profile',
  templateUrl: './afficher-profile.component.html',
  styleUrls: ['./afficher-profile.component.css']
})
export class AfficherProfileComponent implements OnInit {
  id!: number;
  parent!: any
   annee_id!:number

  constructor(private authService: AuthService, private ps:ParentService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.id = this.authService.getParentId()
    this.getParentById()

  }

  getParentById(){
    this.ps.getParentById(this.id,this.annee_id).subscribe(res=> {
      console.log(res);
      this.parent= res;
      this.parent.eleves = this.parent.eleves.filter((element:any) => element.groupes.length>0);
      
    })
  }

}
