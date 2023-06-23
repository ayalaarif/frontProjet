import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Salle } from 'src/app/shared/models/salle.model';
import { SalleService } from 'src/app/shared/services/salle.service';

@Component({
  selector: 'app-ajouter-salle',
  templateUrl: './ajouter-salle.component.html',
  styleUrls: ['./ajouter-salle.component.css'],
})
export class AjouterSalleComponent implements OnInit {
  @ViewChild('salleForm') salleform!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false

  constructor(private salleService: SalleService) { }

  ngOnInit(): void {
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  salle = new Salle()

  ajouterSalle() {
    if (!this.salleform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.salleService.ajouterSalle(this.salle).subscribe(res => {
        console.warn(res);
        this.salleform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }


  }

}
