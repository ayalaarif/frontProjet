import { Component, OnInit, ViewChild} from '@angular/core';
import { SessionScolaire } from 'src/app/shared/models/session-scolaire.model';
import { NgForm } from '@angular/forms';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-session',
  templateUrl: './modifier-session.component.html',
  styleUrls: ['./modifier-session.component.css']
})
export class ModifierSessionComponent implements OnInit {
  id!: number
  data:any
  session=new SessionScolaire()
  @ViewChild('sessionform') sessionform!: NgForm
  showMsg: boolean=false
  MsgError: boolean=false
  constructor(private route: ActivatedRoute,private sessionService:SessionScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getSessionById();
  }
  getSessionById() {
    this.sessionService.getSessionById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.session = this.data;
    })
  }
  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  modifierSession() {
    if (!this.sessionform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.sessionService.modifierSession(this.id, this.session).subscribe(res => {
        // this.sessionform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  }

}
