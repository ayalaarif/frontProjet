import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enseignant } from 'src/app/shared/models/enseignant.model';
import { EnseignantService } from 'src/app/shared/services/enseignant.service';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.css']
})
export class ModifierProfileComponent implements OnInit {

  id!: number;
  data!: any;
  enseignant = new Enseignant();
  images: any
  image: boolean = false
  showMsg: boolean= false;
  MsgError: boolean=false

  @ViewChild('modifierProfile') modifierProfile!: NgForm;

  constructor(private route: ActivatedRoute, private enseignantService: EnseignantService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getEnseignantById();

  }

  getEnseignantById() {
    this.enseignantService.getEnseignantById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.enseignant = this.data
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

  modifierEnseignant() {
    if (!this.modifierProfile.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
    const fd = new FormData();
    if (this.image) {
      fd.append('img', this.images, this.images.name)
    }
    fd.append('nom', this.enseignant.nom)
    fd.append('prenom', this.enseignant.prenom)
    fd.append('sexe', this.enseignant.sexe)
    fd.append('dateNais', this.enseignant.dateNais.toString() || '')
    fd.append('lieuNais', this.enseignant.lieuNais)
    fd.append('nationalite', this.enseignant.nationalite)
    fd.append('adresse', this.enseignant.adresse)
    fd.append('cin', this.enseignant.cin)
    fd.append('tel', this.enseignant.tel)
    fd.append('dateRecrutement', this.enseignant.dateRecrutement.toString() || '')
    fd.append('salaire', this.enseignant.salaire.toString())
    fd.append('situation_familiale', this.enseignant.situation_familiale)
    fd.append('nbrEnfants', this.enseignant.nbrEnfants.toString())
    fd.append('matiere_id', this.enseignant.matiere_id.toString())
    fd.append("_method", 'PUT');
    this.enseignantService.modifierEnseignant(this.id, fd).subscribe(res => {
      // this.modifierProfile.resetForm();
      this.MsgError=false
      this.showMsg= true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)
    })
  }
  }

}
