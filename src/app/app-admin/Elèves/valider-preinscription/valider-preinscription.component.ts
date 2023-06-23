import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/shared/models/eleve.model';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { ImagesService } from 'src/app/shared/services/images.service';
import { PreinscriptionService } from 'src/app/shared/services/preinscription.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-valider-preinscription',
  templateUrl: './valider-preinscription.component.html',
  styleUrls: ['./valider-preinscription.component.css']
})
export class ValiderPreinscriptionComponent implements OnInit {
  id!: number;
  data!: any;
  niveau: any;
  @ViewChild('validerEleveForm') validerEleveForm!: NgForm;
  eleve = new Eleve();
  showMsg: boolean = false
  MsgError: boolean = false

  images: any;
  image: boolean = false
 annee_id!:number



  constructor(private route: ActivatedRoute, private preinscritService: PreinscriptionService, private eleveService: EleveService, private imageService: ImagesService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.getPreinscritById();
  }

  getPreinscritById() {
    this.preinscritService.getPreinscriptionById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.eleve = this.data;
      this.getImageFromService();
      this.preinscritService.getNiveauGroupe(this.data.niveau_id,this.annee_id).subscribe(res => {
        console.log(res);
        this.niveau = res;
      })
    })
  }

  
  //obtenir une image à partir de l'api.
  getImageFromService() {
    this.imageService.getImagePreinscrit(this.id).subscribe(dataBlob => {
      let file = this.blobToFile(dataBlob, this.data.img);
      this.eleve.img = file;
    });
  }


  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }


  validerPreinscrit() {
    if (!this.validerEleveForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      const fd = new FormData();
      fd.append('img', this.eleve.img)
      fd.append('nom', this.eleve.nom)
      fd.append('prenom', this.eleve.prenom)
      fd.append('sexe', this.eleve.sexe)
      fd.append('dateNais', this.eleve.dateNais.toString() || '')
      fd.append('lieuNais', this.eleve.lieuNais)
      fd.append('nationalite', this.eleve.nationalite)
      fd.append('adresse', this.eleve.adresse)
      fd.append('matricule', this.eleve.matricule)
      fd.append('groupe_id', this.eleve.groupe_id.toString())
      fd.append('usernameel', this.eleve.usernameel)
      fd.append('emailel', this.eleve.emailel)
      fd.append('passwordel', this.eleve.passwordel)
      fd.append('nomComplet_pere', this.eleve.nomComplet_pere)
      fd.append('nomComplet_mere', this.eleve.nomComplet_mere)
      fd.append('cin_pere', this.eleve.cin_pere)
      fd.append('cin_mere', this.eleve.cin_mere)
      fd.append('tel_pere', this.eleve.tel_pere)
      fd.append('tel_mere', this.eleve.tel_mere)
      fd.append('fct_pere', this.eleve.fct_pere)
      fd.append('fct_mere', this.eleve.fct_mere)
      fd.append('email_pere', this.eleve.email_pere)
      fd.append('email_mere', this.eleve.email_mere)
      fd.append('usernamep', this.eleve.usernamep)
      fd.append('emailp', this.eleve.emailp)
      fd.append('passwordp', this.eleve.passwordp)


      this.eleveService.ajouterEleve(fd).subscribe(res => {
        console.warn(res);
        this.validerEleveForm.resetForm();
        // this.eleve.sexe = '0'
        this.MsgError = false
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
        }, 2000)

      })

      this.preinscritService.supprimerPreinscription(this.id).subscribe(res => {
        console.log(res);
      })
    }

  }


  // deletePreinscription(id: number) {
  //   if (this.validerEleveForm.form.valid && this.myBtnIdClicked == true) {
  //     this.preinscritService.supprimerPreinscription(id).subscribe(res => {
  //       console.log(res);

  //     })
  //   }

  // }


}
