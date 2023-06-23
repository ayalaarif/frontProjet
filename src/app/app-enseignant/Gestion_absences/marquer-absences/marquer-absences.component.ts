import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { Discipline } from 'src/app/shared/models/discipline.model';
import { DisciplineEleves } from 'src/app/shared/models/discipline-eleves.model';
import { NgForm } from '@angular/forms';
import { AbsenceService } from 'src/app/shared/services/absence.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';

import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-marquer-absences',
  templateUrl: './marquer-absences.component.html',
  styleUrls: ['./marquer-absences.component.css']
})
export class MarquerAbsencesComponent implements OnInit {
  @ViewChild('absenceForm') absenceForm !: NgForm;
  @ViewChildren("checkbox") checkbox!: QueryList<ElementRef>;
  types: any = [
    { name: 'Absent(e)', id: 1, selected: false },
    { name: 'Retard', id: 2, selected: false },

  ]
  annee_id!:number
  groupes: any;
  id!: number
  groupe_id!: number
  listEleves: any;
  EleveLength!: number
  AbencesLength!: number
  seances: any
  sessions:any
  absences: any
  select: boolean = false
  selectSeance: boolean = false
  changeDate: boolean = false
  showMsg: boolean = false
  errorMsg: boolean = false
  data = {
    groupe_id: 0,
    seance_id: 0,
    date: ""


  }
  // discipline=new Discipline<DisciplineEleves>()
  discipline: Discipline<DisciplineEleves> = {
    seance_id: 0,
    session_id:0,
    date:"",
    DisciplineEleve: []
  }

  constructor(private authService: AuthService, private gs: GroupeService,private absenceService: AbsenceService,public anneeService: AnneeScolaireService,private sessionService:SessionScolaireService,private notifService: NotificationService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listeSessions();
    this.listGroupes();
    this.discipline.seance_id = 0
  }

  listeSessions(){
    this.sessionService.getSessions(this.annee_id).subscribe(res=>{
      console.log(res);
      this.sessions=res;
    })
  }

  //Retourne la liste des groupes affectés à un enseignant spécifique
  listGroupes() {
    this.gs.listGroupe(this.id,this.annee_id).subscribe(res => {
      this.groupes = res;
      console.log("groupes");
      console.log(this.groupes);

    })
  }
  
  //à chaque fois un groupe est séléctionné,Retourne la liste des élèves et les seances affectés à ce groupe
  onSelectGroupe() {

    // console.log("groupe_id:", this.groupe_id)
    this.selectSeance = false
    this.changeDate = false
    this.discipline.date = ""
    this.discipline.seance_id = 0
    this.ListSeancesByGroupeId()
    this.listEleveByGroupeId()


  }
  onSelectSeance() {
    this.selectSeance = true
    this.ListAbsencesEleves()

  }
  onchangeDate() {
    this.changeDate = true
    this.ListAbsencesEleves()
  }
  exist(id: number) {
    return this.absences.some((element: any) => (element.eleve_id == id));
  }
  //Retourne la liste des eleves d'un groupe spécifique 
  listEleveByGroupeId() {
    this.gs.listEleveByGroupeId(this.groupe_id).subscribe(res => {
      this.listEleves = res;
      this.EleveLength = this.listEleves.length
      console.log("listEleves");
      console.log(this.listEleves);
      this.select = true
      for (var i = 0; i < this.EleveLength; i++) {
        this.discipline.DisciplineEleve.push(new DisciplineEleves());
        this.discipline.DisciplineEleve[i].eleve_id = this.listEleves[i].id
        console.log(this.discipline.DisciplineEleve[i])
      }
      console.log(this.discipline.DisciplineEleve)

    })
  }
  //Retourne la liste des absences  des eleves
  ListAbsencesEleves() {
    this.data.groupe_id = this.groupe_id
    this.data.seance_id = this.discipline.seance_id
    this.data.date = this.discipline.date
    this.absenceService.ListAbsencesEleves(this.data).subscribe(res => {
      console.log("res")
      console.log(res)
      this.absences = res;
      this.AbencesLength = this.absences.length
      console.log("absences");
      console.log(this.absences);


    })
  }
  //Retourne la liste des seances d'un groupe spécifique 
  ListSeancesByGroupeId() {
    this.absenceService.ListSeancesByGroupeId(this.groupe_id, this.id).subscribe(res => {
      this.seances = res;
      console.log("seances");
      console.log(this.seances);

    })
  }
  selectCheckBox(id: string, i: number, name: string) {
    console.log("7achtiii bihhh hnaa",id)
    this.checkbox.forEach(c => {
      if (c.nativeElement.id != id) {
        if ((c.nativeElement.id).includes("filled-in-box-" + i)) {
          c.nativeElement.checked = false
          if (name != 'Retard') {
            this.discipline.DisciplineEleve[i].margeRetard = ""
          }

        }


      }
      else {
        if (c.nativeElement.checked) {
          this.discipline.DisciplineEleve[i].type = name
        } else {
          this.discipline.DisciplineEleve[i].type = ""
        }
      }

    });



  }

  marquerAbsences() {
    this.discipline.DisciplineEleve = this.discipline.DisciplineEleve.filter((element: any) => (element.type === 'Absent(e)') || (element.type === 'Retard'));
    console.log("resultatFinal")
    console.log(this.discipline)
    if (this.discipline.DisciplineEleve.length > 0) {
      this.absenceService.ajouterAbsence(this.discipline).subscribe(res => {
        // console.warn(res);
        this.absenceForm.resetForm();
        this.errorMsg = false
        this.discipline.seance_id = 0
        delete this.seances
        this.selectSeance = false
        this.changeDate = false
        // this.Niveau_matieres.niveau_id = 0;
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
        }, 2000)

      })
    } else {
      this.errorMsg = true
      for (var i = 0; i < this.EleveLength; i++) {
        this.discipline.DisciplineEleve.push(new DisciplineEleves());
        this.discipline.DisciplineEleve[i].eleve_id = this.listEleves[i].id
        console.log(this.discipline.DisciplineEleve[i])
      }
    }



  }
  // getSelectedTypeName(i:number):string  {
  //   let selectedTypeName = "";

  //   for(let t of this.types){
  //     // for selected check boxes value would be true
  //     console.log(t.id+'-'+i)
  //     if(this.absenceForm.value[t.id+'-'+i]){
  //       selectedTypeName=t.name;
  //     }
  //   }

  //   return selectedTypeName;
  // }



}
