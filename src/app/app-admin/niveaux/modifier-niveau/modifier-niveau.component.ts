import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Niveau } from 'src/app/shared/models/niveau.model';
import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-modifier-niveau',
  templateUrl: './modifier-niveau.component.html',
  styleUrls: ['./modifier-niveau.component.css']
})
export class ModifierNiveauComponent implements OnInit {

  id!: number
  data: any
  niveau = new Niveau()
  @ViewChild('niveauform') niveauform!: NgForm
  showMsg: boolean=false
  MsgError: boolean=false


  constructor(private route: ActivatedRoute, private niveauService: NiveauService) { }


  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getNiveau();


  }

  getNiveau() {
    this.niveauService.getNiveauById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.niveau = this.data;
    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  modifierNiveau() {
    if (!this.niveauform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.niveauService.modifierNiveau(this.id, this.niveau).subscribe(res => {
        // this.niveauform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  }

}
