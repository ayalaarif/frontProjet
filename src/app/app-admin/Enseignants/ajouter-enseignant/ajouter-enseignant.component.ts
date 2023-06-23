import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Enseignant } from 'src/app/shared/models/enseignant.model';
import { EnseignantService } from 'src/app/shared/services/enseignant.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
  selector: 'app-ajouter-enseignant',
  templateUrl: './ajouter-enseignant.component.html',
  styleUrls: ['./ajouter-enseignant.component.css']
})
export class AjouterEnseignantComponent implements OnInit {

  showMsg: boolean=false
  MsgError: boolean=false
  matieres: any;
  @ViewChild('enseignantForm') enseignantForm!: NgForm;
  images: any
  image!: boolean


  constructor(private enseignantService: EnseignantService, private matiereService: MatiereService) { }

  ngOnInit(): void {
    this.listMatiere();

  }


  listMatiere() {
    this.matiereService.getMatiere().subscribe(res => {
      console.log(res);
      this.matieres = res;
    })
  }


  onFileSelected(event: any) {
    this.images = event.target.files[0]
    console.log(this.images)
    this.image = true

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  enseignant = new Enseignant();

  ajouterEnseignant() {
    if (!this.enseignantForm.form.valid && this.myBtnIdClicked == true) {
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
      fd.append('username', this.enseignant.username)
      fd.append('email', this.enseignant.email)
      fd.append('password', this.enseignant.password)

      this.enseignantService.ajouterEnseignant(fd).subscribe(res => {
        console.warn(res);
        this.enseignantForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)

      })
    }
  }

}
