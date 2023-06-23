import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Punition } from 'src/app/shared/models/punition.model';
import { AbsenceService } from 'src/app/shared/services/absence.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { PunitionService } from 'src/app/shared/services/punition.service';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
@Component({
  selector: 'app-ajouter-punition',
  templateUrl: './ajouter-punition.component.html',
  styleUrls: ['./ajouter-punition.component.css']
})
export class AjouterPunitionComponent implements OnInit {
  groupes: any;
  id!: number
  groupe_id!: number
  listEleves: any;
  @ViewChild('punitionForm') punitionForm!: NgForm;
  @ViewChild('box1') box1!: NgModel


  showMsg: boolean = false
  MsgError: boolean = false
  listSeances!: any
  punition = new Punition()
  annee_id!:number
  sessions:any

  constructor(private authService: AuthService, private gs: GroupeService, private ps: PunitionService, private as: AbsenceService,private sessionService:SessionScolaireService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    this.punition.enseignant_id = this.id
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listGroupes();
    this.listeSessions()
    this.punition.eleve_id = 0
  }

  listeSessions(){
    this.sessionService.getSessions(this.annee_id).subscribe(res=>{
      console.log(res);
      this.sessions=res;
    })
  }
  listGroupes() {
    this.gs.listGroupe(this.id,this.annee_id).subscribe(res => {
      this.groupes = res;
      console.log(this.groupes);

    })
  }

  onSelect() {

    console.log("groupe_id:", this.groupe_id)
    this.listEleveByGroupeId();
    this.punition.eleve_id = 0
    this.seances()


  }

  listEleveByGroupeId() {
    this.gs.listEleveByGroupeId(this.groupe_id).subscribe(res => {
      this.listEleves = res;
      console.log(this.listEleves);

    })
  }
 
 

  selectedValue: boolean= false;
  selected(_event: any){
    if(_event.target.value == 'Exclusion hors de la classe'){
      this.selectedValue= true
    }else{
      this.selectedValue= false

    }
     
     console.log("x: ",this.selectedValue)
     console.log(_event.target.value)
  }

  seances() {
    this.as.ListSeancesByGroupeId(this.groupe_id, this.id).subscribe(res => {
      this.listSeances = res;
      console.log("seances: ",this.listSeances);

    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
  }

  donnerPunition() {
    if (!this.punitionForm.form.valid || this.box1.invalid || this.punition.eleve_id == 0 && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {

      this.ps.donnerPunition(this.punition).subscribe(res => {
        console.warn(res);
        this.punitionForm.resetForm();
        this.punition.eleve_id = 0
        this.MsgError = false
        this.showMsg = true;
        this.selectedValue= false;
        setTimeout(() => {
          this.showMsg = false;
        }, 2000)

      })
    }

  }

}
