import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Preinscription } from 'src/app/shared/models/preinscription.model';
import { NiveauService } from 'src/app/shared/services/niveau.service';
import { PreinscriptionService } from 'src/app/shared/services/preinscription.service';

@Component({
  selector: 'app-pre-inscription',
  templateUrl: './pre-inscription.component.html',
  styleUrls: ['./pre-inscription.component.css']
})
export class PreInscriptionComponent implements OnInit {

  showMsg: boolean = false
  MsgError: boolean = false
  niveaux: any;
  @ViewChild('preInscritForm') preInscritForm!: NgForm;
  // selectedFile!: File;
  // files!: File
  images: any
  image: boolean = false
  preInscrit = new Preinscription();

  constructor(private preInscritService: PreinscriptionService, private niveauService: NiveauService) { }

  ngOnInit(): void {
    this.listNiveau();
    let a=sessionStorage.getItem('annee');
    if (a) {
      this.preInscrit.annee_id= JSON.parse(a).id
      
    }
   
    this.preInscrit.niveau_id = 0
    this.preInscrit.sexe = "0"
  }

  

  listNiveau() {
    this.niveauService.getNiveau().subscribe(res => {
      console.log(res);
      this.niveaux = res;
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

  demandePreinscrit() {
    if (this.myBtnIdClicked == true && (!this.preInscritForm.form.valid || this.preInscrit.sexe == '0' || this.preInscrit.niveau_id == 0)) {
      this.MsgError = true
    } else {
      this.MsgError = false
      const fd = new FormData();
      if (this.image) {
        fd.append('img', this.images, this.images.name);

      }

      fd.append('nom', this.preInscrit.nom)
      fd.append('prenom', this.preInscrit.prenom)
      fd.append('sexe', this.preInscrit.sexe)
      fd.append('nationalite', this.preInscrit.nationalite)
      fd.append('dateNais', this.preInscrit.dateNais.toString() || '')
      fd.append('lieuNais', this.preInscrit.lieuNais)
      fd.append('adresse', this.preInscrit.adresse)
      fd.append('niveau_id', this.preInscrit.niveau_id.toString())
      fd.append('annee_id', this.preInscrit.annee_id.toString())
      fd.append('nomComplet_pere', this.preInscrit.nomComplet_pere)
      fd.append('nomComplet_mere', this.preInscrit.nomComplet_mere)
      fd.append('cin_pere', this.preInscrit.cin_pere)
      fd.append('cin_mere', this.preInscrit.cin_mere)
      fd.append('tel_pere', this.preInscrit.tel_pere)
      fd.append('tel_mere', this.preInscrit.tel_mere)
      fd.append('fct_pere', this.preInscrit.fct_pere)
      fd.append('fct_mere', this.preInscrit.fct_mere)
      fd.append('email_pere', this.preInscrit.email_pere)
      fd.append('email_mere', this.preInscrit.email_mere)

      this.preInscritService.ajouterPreinscription(fd).subscribe(res => {
        console.warn(res);
        this.preInscritForm.resetForm();
        this.preInscrit.niveau_id = 0
        this.preInscrit.sexe = "0"
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
        }, 2000)
      })
    }
  }

}
