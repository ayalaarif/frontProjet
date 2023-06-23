import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CoursService } from 'src/app/shared/services/cours.service';
import { ActivatedRoute } from '@angular/router';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-list-cours-groupes',
  templateUrl: './list-cours-groupes.component.html',
  styleUrls: ['./list-cours-groupes.component.css']
})
export class ListCoursGroupesComponent implements OnInit {

  constructor(private route: ActivatedRoute,private cs: CoursService,public anneeService: AnneeScolaireService) { }
  coursId!:number
  CoursGroupes: any
  showMsg: boolean= false
  data1:any
  annee_id!:number
  @ViewChild('closeModal') closeModal!: ElementRef;

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    this.coursId = this.route.snapshot.params['id'];
    this.getCoursGroupes();
    this.data1={
      cours_id:this.coursId,
      groupe_id:0
  
    }

  }
  //retourne un cours specifique avec ses groupes 
  getCoursGroupes(){
    this.cs.listCoursGroupes(this.coursId,this.annee_id).subscribe(res =>{
      this.CoursGroupes= res;
      console.warn(this.CoursGroupes);
     
    })

  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idCoursGrp!: number;
  onClick(event: number) {
    this.idCoursGrp = event
    console.log("idSalle:", this.idCoursGrp)
  }

  deleteGroupe(groupe_id:number){
    this.data1.groupe_id=groupe_id
    this.cs.supprimerGroupe(this.data1).subscribe(res=>{
     this.getCoursGroupes();
     console.log(res);
     this.closeModal.nativeElement.click();
     this.showMsg= true;
     setTimeout( ()=>{
      this.showMsg=false;
    },2000)

   })


}
}
