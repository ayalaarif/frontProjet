import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent.service';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { EmploiService } from 'src/app/shared/services/emploi.service';
import{ jsPDF } from "jspdf";

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {
  @ViewChild('emploi',{static:false}) el!:ElementRef
  id!: number;
  parent!: any
  l!:number
  eleveId=0
  groupeId=0
  annee_id!:number
  seance:any
  Emploi:any
  // keys:any
  clicked: boolean=false
  semaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  demiJour1: string[] = ['08:00:00', '09:00:00', '10:00:00', '11:00:00']
  demiJour2: string[] = ['14:00:00', '15:00:00', '16:00:00', '17:00:00']
 



  constructor(private authService: AuthService, private ps:ParentService,private eleveService: EleveService,private e:EmploiService ) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.id = this.authService.getParentId()
    this.getParentById()
   

  }
  onSelect(){
    this.getEmlpoiEleve(this.groupeId)  
    this.clicked=true
  }

  getParentById(){
    this.ps.getParentById(this.id,this.annee_id).subscribe(res=> {
      console.log(res);
      this.parent= res;
      this.parent.eleves = this.parent.eleves.filter((element:any) => element.groupes.length>0);
      this.l=this.parent.eleves.length
      if(this.l==1){
        this.getEmlpoiEleve(this.parent.eleves[0].groupes[0].id)
    }

    })
  }
  getEmlpoiEleve(groupeId:number){
    
    this.e.getEmploiByGroupeId(groupeId).subscribe(res => {
      console.log(res);
      
     this.Emploi=res
    //  console.log('seances')
    //  console.log(this.seances)
    //  this.keys=Object.keys(this.seances)
    //   console.log('keys'+this.keys)
      
  
     

    })
      
  }
  exist(j: string,h:string) {
    this.seance=this.Emploi.seances.find((e:any) => ((e.jour.toUpperCase() === j.toUpperCase())&&e.heure==h))
    return this.seance
  }
  makePDF(){
    let pdf=new jsPDF('p','pt','a2');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        // pdf.text("emploi",10,10);
        // Width:100%,
        pdf.save(this.Emploi.groupe.niveau.libelle+this.Emploi.groupe.num+this.Emploi.annee_scolaire);

      }
    });
    
  }

}
