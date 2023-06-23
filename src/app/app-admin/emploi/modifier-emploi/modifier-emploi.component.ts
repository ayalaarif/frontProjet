import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emploi } from 'src/app/shared/models/emploi.model';
import { EmploiService } from 'src/app/shared/services/emploi.service';
import { NgForm } from '@angular/forms';
import { Seance } from 'src/app/shared/models/seance.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { SalleService } from 'src/app/shared/services/salle.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-modifier-emploi',
  templateUrl: './modifier-emploi.component.html',
  styleUrls: ['./modifier-emploi.component.css']
})
export class ModifierEmploiComponent implements OnInit {
  id!: number
  index!: number
  data: any
  // groupes: any
  seances:any
  salles: any
  MatiereEnseignant: any
  emploi=new Emploi<Seance>()
  @ViewChild('emploiForm') emploiForm!: NgForm;
  showMsg: boolean = false
  show: boolean = false
  semaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  demiJour1: string[] = ['08:00:00', '09:00:00', '10:00:00', '11:00:00']
  demiJour2: string[] = ['14:00:00', '15:00:00', '16:00:00', '17:00:00']
  heures=this.demiJour1.concat(this.demiJour2)
  exist!:boolean
  annee_id!:number



  constructor(private groupeService: GroupeService,private route: ActivatedRoute,private emploiService: EmploiService, private salleService: SalleService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.id = this.route.snapshot.params['id']
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }

    // this.listGroupe()
    this.getSeances()
    this.listSalles()
    this.getEmploi()
    
   
    
  }
  // listGroupe() {
  //   this.groupeService.getGroupe(this.annee_id).subscribe(res => {
  //     console.log(res);
  //     this.groupes = res;
  //   })
  // }
  listSalles() {
    this.salleService.getSalles().subscribe(res => {
      this.salles = res;
      console.log(this.salles)
    })
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
  
  
  
  //à chaque fois un groupe est séléctionné, cette fct permet de retourne la liste des enseignants d'un groupes spécifiques avec leurs matières
  onSelect() {
    this.emploiService.afficherMatiereEnseignant(this.emploi.groupe_id).subscribe(res => {
       this.MatiereEnseignant = res;
       console.log(this.MatiereEnseignant)
 
     })
   }
  //cette fct permet de retourne un emploi specifique
  getEmploi() {
    this.emploiService.getEmploiById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.emploi = this.data;
       console.log(this.emploi)
       this.onSelect()
       for (let i = 0; i < this.semaine.length; i++) {
        for (let j = 0; j < this.heures.length; j++) {
          this.exist=this.emploi.seances.some((e:any) => ((e.jour.toUpperCase()=== this.semaine[i].toUpperCase())&&e.heure==this.heures[j]))
      
          if(!this.exist){ 
            this.emploi.seances.push(new Seance())
            this.index=this.emploi.seances.length-1
            this.emploi.seances[this.index].id=0
            this.emploi.seances[this.index].jour=this.semaine[i]
             this.emploi.seances[this.index].heure=this.heures[j]
            } }  
       }
       this.show=true

    })
   
    
  }
  seance(j:string,h:string){
    return this.emploi.seances.findIndex((e:any) => ((e.jour=== j)&&e.heure==h))
  
   }
  modifierEmploi() {
    this.emploi.seances = this.emploi.seances.filter((element:any) => ((element.enseignant_id>0)||((element.enseignant_id==0)&&(element.id>0))));
    console.log(this.emploi)
      this.emploiService.modifierEmploi(this.id, this.emploi).subscribe(res => {
        // this.emploiForm.resetForm(); 
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  

}
