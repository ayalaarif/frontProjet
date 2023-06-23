import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Salle } from 'src/app/shared/models/salle.model';
import { SalleService } from 'src/app/shared/services/salle.service';

@Component({
  selector: 'app-modifier-salle',
  templateUrl: './modifier-salle.component.html',
  styleUrls: ['./modifier-salle.component.css']
})
export class ModifierSalleComponent implements OnInit {
  id!: number
  data: any
  salles: any;
  salle = new Salle()
  @ViewChild('salleform') salleform!: NgForm
  showMsg: boolean=false
  MsgError: boolean=false
  constructor(private route: ActivatedRoute, private salleService: SalleService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getSalle()


  }


  getSalle() {
    this.salleService.getSalleById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.salle = this.data;
    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  modifierSalle() {
    if (!this.salleform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.salleService.modifierSalle(this.id, this.salle).subscribe(res => {
        // this.salleform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  }

 



}
