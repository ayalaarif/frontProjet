import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/shared/models/eleve.model';
import { EleveService } from 'src/app/shared/services/eleve.service';


@Component({
  selector: 'app-modifier-profile-eleve',
  templateUrl: './modifier-profile-eleve.component.html',
  styleUrls: ['./modifier-profile-eleve.component.css']
})
export class ModifierProfileEleveComponent implements OnInit {
  id!: number;
  data!: any;
  eleve = new Eleve();
  images: any
  image: boolean = false
  showMsg: boolean = false;
  MsgError: boolean = false
  annee_id!:number

  @ViewChild('modifierProfileForm') modifierProfileForm!: NgForm;

  constructor(private route: ActivatedRoute, private eleveService: EleveService){}
  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getEleveById()
  }

  getEleveById() {
    this.eleveService.getEleveById(this.id,this.annee_id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.eleve = this.data
     
    })

  }

  onFileSelected(event: any) {
    this.images = event.target.files[0]
    console.log(this.images)
    this.image = true;
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  modifierProfileEleve() {
    if (!this.modifierProfileForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      const fd = new FormData();
      if (this.image) {
        fd.append('img', this.images, this.images.name)
      }
      fd.append('nom', this.eleve.nom)
      fd.append('prenom', this.eleve.prenom)
      fd.append('dateNais', this.eleve.dateNais.toString() || '')
      fd.append('adresse', this.eleve.adresse)
      fd.append("_method", 'PUT')

      this.eleveService.modifierProfileEleve(this.id, fd).subscribe(res => {
        // this.modifierProfileForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
        }, 2000)
      })
    }
  }


}
