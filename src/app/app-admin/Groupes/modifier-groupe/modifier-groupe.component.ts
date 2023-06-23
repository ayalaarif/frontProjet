import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Groupe } from 'src/app/shared/models/groupe.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-modifier-groupe',
  templateUrl: './modifier-groupe.component.html',
  styleUrls: ['./modifier-groupe.component.css']
})
export class ModifierGroupeComponent implements OnInit {
  id!: number;
  data!: any;
  niveaux: any;
  groupe = new Groupe();
  showMsg: boolean=false
  MsgError: boolean=false
  @ViewChild('groupeform') groupeform!: NgForm;


  constructor(private route: ActivatedRoute, private niveauService: NiveauService, private groupeService: GroupeService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getGroupeByID();
    this.listNiveau();
    // this.groupe.niveau_id = 0

  }

  getGroupeByID() {
    this.groupeService.getGroupeById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.groupe = this.data;
    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  modifierGroupe() {
    if (!this.groupeform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
      this.groupeService.modifierGroupe(this.id, this.groupe).subscribe(res => {
        this.groupeform.resetForm();
        // this.groupe.niveau_id = 0
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }

  }

  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res);
      this.niveaux = res;
    })
  }



}
