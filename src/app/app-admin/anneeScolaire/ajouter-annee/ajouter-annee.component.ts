import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnneeScolaire } from 'src/app/shared/models/annee-scolaire.model';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-ajouter-annee',
  templateUrl: './ajouter-annee.component.html',
  styleUrls: ['./ajouter-annee.component.css']
})
export class AjouterAnneeComponent implements OnInit {
  @ViewChild('anneeform') anneeform!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false

  constructor(private anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
  }
  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }
  annee = new AnneeScolaire()
  ajouterAnneeScolaire() {
    if (!this.anneeform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {

      this.anneeService.ajouterAnneeScolaire(this.annee).subscribe(res => {
        console.warn(res);
        this.anneeform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)

      })
    }
  }

}
