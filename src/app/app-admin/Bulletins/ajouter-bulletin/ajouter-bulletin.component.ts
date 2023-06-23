import { Component, OnInit ,ViewChild } from '@angular/core';
import { Bulletin } from 'src/app/shared/models/bulletin.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
import { NgForm } from '@angular/forms';
import { BulletinService } from 'src/app/shared/services/bulletin.service';
@Component({
  selector: 'app-ajouter-bulletin',
  templateUrl: './ajouter-bulletin.component.html',
  styleUrls: ['./ajouter-bulletin.component.css']
})
export class AjouterBulletinComponent implements OnInit {
  @ViewChild('bulletinForm') bulletinForm!: NgForm;
 showMsg: boolean = false
  MsgError: boolean = false
  annee_id!:number
  sessions:any
  groupes:any
  eleves:any
  groupe_id!:number
  bulletin=new Bulletin()
  constructor(private sessionService:SessionScolaireService,private gs: GroupeService,private bs:BulletinService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.bulletin.eleve_id=0
    this.listGroupe();
    this.listeSessions()
  }
  listeSessions(){
    this.sessionService.getSessions(this.annee_id).subscribe(res=>{
      console.log(res);
      this.sessions=res;
    })
  }
  listGroupe() {
    this.gs.getGroupe(this.annee_id).subscribe(res => {
      console.log(res);
      this.groupes = res;
    })
  }
  listEleveByGroupeId() {
    this.gs.listEleveByGroupeId( this.bulletin.groupe_id).subscribe(res => {
      this.eleves = res;
      console.log(this.eleves);

    })
  }
  
  onSelect() {

    console.log("groupe_id:", this.bulletin.groupe_id)
    this.bulletin.eleve_id=0
    this.listEleveByGroupeId();
    

  }
  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
  }
  AjouterBulletin() {
    if (!this.bulletinForm.form.valid || this.bulletin.eleve_id == 0 && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
    
      this.bs.ajouterBulletin(this.bulletin).subscribe(res => {
        console.warn(res);
        this.bulletinForm.resetForm();
        this.bulletin.eleve_id = 0
        this.MsgError = false
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
        }, 2000)

      })
    }

  }

}
