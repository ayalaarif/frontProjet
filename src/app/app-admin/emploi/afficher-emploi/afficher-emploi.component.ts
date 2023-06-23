import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { EmploiService } from 'src/app/shared/services/emploi.service';
import { ActivatedRoute } from '@angular/router';
import{ jsPDF } from "jspdf";
@Component({
  selector: 'app-afficher-emploi',
  templateUrl: './afficher-emploi.component.html',
  styleUrls: ['./afficher-emploi.component.css']
})
export class AfficherEmploiComponent implements OnInit {
  @ViewChild('emploi',{static:false}) el!:ElementRef
  Emploi:any
  id!:number
  seance:any 

  semaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  demiJour1: string[] = ['08:00:00', '09:00:00', '10:00:00', '11:00:00']
  demiJour2: string[] = ['14:00:00', '15:00:00', '16:00:00', '17:00:00']
 


  constructor(private emploiService: EmploiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.id = this.route.snapshot.params['id'];
    this.getEmploiById()
    
    
  }
  getEmploiById(){
    this.emploiService.getEmploiById(this.id).subscribe(res=>{
      console.log(res);
      this.Emploi= res;
      console.log(typeof(this.Emploi.seances[0].heure))

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
