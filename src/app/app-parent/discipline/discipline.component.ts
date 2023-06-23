import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/shared/services/absence.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent.service';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {
  absences:any
  eleveId=0
  l!:number
  id!: number;
  parent!: any
  clicked: boolean=false
  annee_id!:number

  constructor(private as: AbsenceService, private authService: AuthService, private ps:ParentService) { }

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
        this.AbsencesByEleveId(this.parent.eleves[0].id)
    }

    })
  }

  onSelect(){
    this.AbsencesByEleveId(this.eleveId)  
    this.clicked=true
  }

  AbsencesByEleveId(id:number){
     this.as.AbsencesByEleveId(id,this.annee_id).subscribe(res => {
    console.log(res);
    this.absences= res;
    // this.absences.eleve_id=0
  })
  }
 
    


}
