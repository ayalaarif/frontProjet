import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Eleve } from 'src/app/shared/models/eleve.model';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-ajouter-eleves',
  templateUrl: './ajouter-eleves.component.html',
  styleUrls: ['./ajouter-eleves.component.css']
})
export class AjouterElevesComponent implements OnInit {
  id!: number;
  data!: any;
  showMsg: boolean=false
  MsgError: boolean=false
  groupes: any;
  @ViewChild('eleveForm') eleveForm!: NgForm;
  eleve = new Eleve();
  images: any
  image:boolean= false
  annee_id!:number

  constructor(private eleveService: EleveService, private groupeService: GroupeService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listGroupes();
  }

  listGroupes() {
    this.groupeService.getGroupe(this.annee_id).subscribe(res => {
      console.log(res);
      this.groupes = res;
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


  ajouterEleve() {
    if (!this.eleveForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      const fd = new FormData();
      if (this.image) {
        fd.append('img', this.images, this.images.name)
      }
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
        this.eleveForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
      })
    }
  }




}
