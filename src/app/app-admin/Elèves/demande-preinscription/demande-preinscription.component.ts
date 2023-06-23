import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PreinscriptionService } from 'src/app/shared/services/preinscription.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-demande-preinscription',
  templateUrl: './demande-preinscription.component.html',
  styleUrls: ['./demande-preinscription.component.css']
})
export class DemandePreinscriptionComponent implements OnInit {
  showMsg: boolean= false;
  preinscrits: any;
  annee_id!:number
  @ViewChild('closeModal') closeModal!: ElementRef;



  constructor(private preInscritService: PreinscriptionService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listPreinscription();

  }

  listPreinscription(){
    this.preInscritService.getPreinscription(this.annee_id).subscribe(res=>{
      console.log(res);
      this.preinscrits=res;
    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idPreinscrit!: number;
  onClick(event: number) {
    this.idPreinscrit = event
    console.log("idPreinscrit:", this.idPreinscrit)
  }

  deletePreinscription(id: number){
    this.preInscritService.supprimerPreinscription(id).subscribe(res=>{
      this.listPreinscription();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg= true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)
      
    })
  }

}
