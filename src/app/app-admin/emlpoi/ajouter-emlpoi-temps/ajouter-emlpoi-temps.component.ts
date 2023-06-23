import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Emploi } from 'src/app/shared/models/emploi.model';
import { Seance } from 'src/app/shared/models/seance.model';
import { EmploiService } from 'src/app/shared/services/emploi.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { SalleService } from 'src/app/shared/services/salle.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { Enseignant } from 'src/app/shared/models/enseignant.model';

@Component({
  selector: 'app-ajouter-emlpoi-temps',
  templateUrl: './ajouter-emlpoi-temps.component.html',
  styleUrls: ['./ajouter-emlpoi-temps.component.css']
})
export class AjouterEmlpoiTempsComponent implements OnInit {
  groupes: any;
  emplois:any
  seances:any
  b:any
  MatiereEnseignant: any
  salles: any
  maxSeances: number = 48
  index=0
  annee_id!:number

  emploi: Emploi<Seance> = {
    groupe_id: 0,
    seances: []
  }

  

  @ViewChild('emploiForm') emploiForm!: NgForm;
  showMsg: boolean = false

  semaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  demiJour1: string[] = ['08:00:00', '09:00:00', '10:00:00', '11:00:00']
  demiJour2: string[] = ['14:00:00', '15:00:00', '16:00:00', '17:00:00']
  heures=this.demiJour1.concat(this.demiJour2)


  constructor(private groupeService: GroupeService, private emploiService: EmploiService,private salleService: SalleService,) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log('annee')
      console.log(this.annee_id)
    }
    this.getSeances();
    this.listGroupe();
    this.listEmplois();
    this.listSalles();
    this.Seances();
  }
  //retourne les seances d'une annee scolaire specifique
 getSeances(){
  this.emploiService.getSeances(this.annee_id).subscribe(res => {
    console.log('seances')
    console.log(res);
    this.seances = res;
   
  })
}
  enseignantSalleOccupe(id:number,j:string,h:string){
  return this.seances.some((s: any) => (((s.enseignant.id==id)||(s.salle.id === id))&&((s.jour.toUpperCase() === j.toUpperCase())&&(s.heure==h))))

  }

  listEmplois(){
    this.emploiService.getEmploi(this.annee_id).subscribe(res => {
      // console.log(res);
      this.emplois = res;
      console.log('emplois')
      console.log(this.emplois)
    })
// console.log( this.emplois)
  }
  exist(groupeId: number) {
    return this.emplois.some((e: any) => (e.groupe.id === groupeId))
  } 

 Seances(){
  for (let i = 0; i < this.semaine.length; i++) {
    for (let j = 0; j < this.heures.length; j++) {
     
      //  console.log(i,j)
     this.emploi.seances.push(new Seance())
    // console.log(this.emploi.seances.length)
    this.index=this.emploi.seances.length-1
    this.emploi.seances[this.index].jour=this.semaine[i]
     this.emploi.seances[this.index].heure=this.heures[j]
     
 

    }
   }
   console.log('emploi')

   console.log(this.emploi)
  
 }
 
 seance(j:string,h:string){
  return this.emploi.seances.findIndex((e:any) => ((e.jour=== j)&&e.heure==h))

 }
  listGroupe() {
    this.groupeService.getGroupe(this.annee_id).subscribe(res => {
      console.log('groupes')
      console.log(res);
      this.groupes = res;
     
    })
  }


  //à chaque fois un groupe est séléctionné, cette fct permet de retourne la liste des enseignants d'un groupes spécifiques avec leurs matières
  onSelect() {
   this.emploiService.afficherMatiereEnseignant(this.emploi.groupe_id).subscribe(res => {
      this.MatiereEnseignant = res;
      console.log('Enseignants')
      console.log(this.MatiereEnseignant)

    })
  }
  //cette fct permet de retourne la liste des enseignants 
  listSalles() {
    this.salleService.getSalles().subscribe(res => {
      this.salles = res;
      console.log('salles')
      console.log(this.salles)
    })
  }

  ajouterEmploi() {
    this.emploi.seances = this.emploi.seances.filter((element:any) => element.enseignant_id>0);
    console.log('emploifinale')
    console.log(this.emploi)
    this.emploiService.ajouterEmploi(this.emploi).subscribe(res => {
      console.warn(res);
      this.emploiForm.resetForm();
      this.Seances();
      this.showMsg = true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)

    })

  }



}
