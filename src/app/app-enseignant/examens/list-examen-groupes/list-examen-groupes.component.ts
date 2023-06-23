import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-list-examen-groupes',
  templateUrl: './list-examen-groupes.component.html',
  styleUrls: ['./list-examen-groupes.component.css']
})
export class ListExamenGroupesComponent implements OnInit {
  ExamenId!:number
  ExamenGroupes: any
  showMsg: boolean= false
  data1:any
  annee_id!:number
  @ViewChild('closeModal') closeModal!: ElementRef;
 
  constructor(private route: ActivatedRoute,private Es: ExamenService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.ExamenId = this.route.snapshot.params['id'];
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    this.getExamenGroupes();
    this.data1={
      examen_id:this.ExamenId,
      groupe_id:0
  
    }

    
  }
  // retourne un examen specifique avec ses groupes 
 getExamenGroupes(){
     this.Es.ExamenGroupes(this.ExamenId,this.annee_id).subscribe(res =>{
      this.ExamenGroupes= res;
      console.warn(this.ExamenGroupes);
     
    })

  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idExamGrp!: number;
  onClick(event: number) {
    this.idExamGrp = event
    console.log("idExamGrp:", this.idExamGrp)
  }

  deleteGroupe(groupe_id:number){
    this.data1.groupe_id=groupe_id

    this.Es.supprimerGroupe(this.data1).subscribe(res=>{
     this.getExamenGroupes();
     console.log(res);
     this.closeModal.nativeElement.click();
     this.showMsg= true;
     setTimeout( ()=>{
      this.showMsg=false;
    },2000)


   })


}

}
