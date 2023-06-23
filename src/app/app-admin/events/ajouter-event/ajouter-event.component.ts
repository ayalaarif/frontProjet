import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/shared/models/event.model';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-ajouter-event',
  templateUrl: './ajouter-event.component.html',
  styleUrls: ['./ajouter-event.component.css']
})
export class AjouterEventComponent implements OnInit {

  @ViewChild('eventForm') eventForm!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false
  
  constructor(private es:EventService) { }

  ngOnInit(): void {

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
  }

  event = new Event()

  ajouterEvent() {
    if (!this.eventForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.es.ajouterEvent(this.event).subscribe(res => {
        console.warn(res);
        this.eventForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }


  }

}
