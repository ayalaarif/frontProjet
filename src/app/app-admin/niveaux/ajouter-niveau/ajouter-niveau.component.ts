import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Niveau } from 'src/app/shared/models/niveau.model';
import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-ajouter-niveau',
  templateUrl: './ajouter-niveau.component.html',
  styleUrls: ['./ajouter-niveau.component.css']
})
export class AjouterNiveauComponent implements OnInit {
  @ViewChild('niveauform') niveauform!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false


  constructor(private niveauService: NiveauService) { }

  ngOnInit(): void {
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }



  niveau = new Niveau()
  ajouterNiveauForm() {
    if (!this.niveauform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {

      this.niveauService.ajouterNiveau(this.niveau).subscribe(res => {
        console.warn(res);
        this.niveauform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)

      })
    }
  }






}
