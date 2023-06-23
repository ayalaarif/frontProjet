import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent.service';
import { BulletinService } from 'src/app/shared/services/bulletin.service';


@Component({
  selector: 'app-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.css']
})
export class BulletinsComponent implements OnInit {
  bulletins:any
  eleveId=0
  l!:number
  id!: number;
  parent!: any
  clicked: boolean=false
  annee_id!:number
  constructor(private authService: AuthService, private ps:ParentService,private bulletinService:BulletinService ) { }

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
      this.l=this.parent.eleves.length
      if(this.l==1){
        this.listeBulletinsEleve(this.parent.eleves[0].id)
    }

    })
  }

  onSelect(){
    this.listeBulletinsEleve(this.eleveId)  
    this.clicked=true
  }
  listeBulletinsEleve(id:number) {
    this.bulletinService.listeBulletinsEleve(id,this.annee_id).subscribe(res => {
      console.log(this.eleveId)
      console.log(res);
      this.bulletins = res;

    })
  }

}
