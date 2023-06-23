import { Component, OnInit ,ViewChild} from '@angular/core';
import { SessionScolaire } from 'src/app/shared/models/session-scolaire.model';
import { NgForm } from '@angular/forms';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-ajouter-session',
  templateUrl: './ajouter-session.component.html',
  styleUrls: ['./ajouter-session.component.css']
})
export class AjouterSessionComponent implements OnInit {
  @ViewChild('sessionform') sessionform!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false


  constructor(private sessionService: SessionScolaireService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.session.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.session.annee_id= JSON.parse(a).id
      console.log(this.session.annee_id)
    }
  }
  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }
  session = new SessionScolaire()
  ajouterSessionScolaire() {
    if (!this.sessionform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {

      this.sessionService.ajouterSessionScolaire(this.session).subscribe(res => {
        console.warn(res);
        this.sessionform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)

      })
    }
  }

}
