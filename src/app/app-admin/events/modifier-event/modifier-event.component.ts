import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-modifier-event',
  templateUrl: './modifier-event.component.html',
  styleUrls: ['./modifier-event.component.css']
})
export class ModifierEventComponent implements OnInit {
  id!: number;
  event!: any;
  @ViewChild('eventForm') eventForm!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false


  constructor(private route: ActivatedRoute, private es:EventService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];

    this.getEventById()
  }

  getEventById(){
    this.es.getEventById(this.id).subscribe(res=>{
      console.log(res);
      this.event= res;

    })

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
  }

  modifierEvent(){
    if (!this.eventForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.es.modifierEvent(this.id, this.event).subscribe(res => {
        console.warn(res);
        // this.eventForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })

    }

  }

}
