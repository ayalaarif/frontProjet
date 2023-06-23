import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/shared/models/eleve.model';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { ParentService } from 'src/app/shared/services/parent.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-modifier-eleve',
  templateUrl: './modifier-eleve.component.html',
  styleUrls: ['./modifier-eleve.component.css']
})
export class ModifierEleveComponent implements OnInit {
  id!: number;
  data: any;
  groupes: any;
  eleve = new Eleve();
  showMsg: boolean=false
  MsgError: boolean=false
  @ViewChild('eleveForm') eleveForm!: NgForm;
  images: any
  image: boolean = false
  annee_id!:number

  constructor(private route: ActivatedRoute, private eleveService: EleveService, private groupeService: GroupeService, private parentService: ParentService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.getEleveById();
    this.listGroupe();
  }

  getEleveById() {
    this.eleveService.getEleveById(this.id,this.annee_id).subscribe(res => {
      // console.log(res);
      this.data = res;
      this.eleve = this.data;
      if(this.data.groupes.length>0){
        this.eleve.groupe_id=this.data.groupes[0].id
        this.eleve.ancienGroupe_id=this.data.groupes[0].id

      }
     
      console.log(this.eleve)
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

  modifierEleve() {
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
      fd.append('ancienGroupe_id', this.eleve.ancienGroupe_id.toString())
      fd.append('nomComplet_pere', this.eleve.parentt.nomComplet_pere)
      fd.append('nomComplet_mere', this.eleve.parentt.nomComplet_mere)
      fd.append('cin_pere', this.eleve.parentt.cin_pere)
      fd.append('cin_mere', this.eleve.parentt.cin_mere)
      fd.append('tel_pere', this.eleve.parentt.tel_pere)
      fd.append('tel_mere', this.eleve.parentt.tel_mere)
      fd.append('fct_pere', this.eleve.parentt.fct_pere)
      fd.append('fct_mere', this.eleve.parentt.fct_mere)
      fd.append('email_pere', this.eleve.parentt.email_pere)
      fd.append('email_mere', this.eleve.parentt.email_mere)
      fd.append("_method", 'PUT')

      this.eleveService.modifierEleve(this.id, fd).subscribe(res => {
        // this.eleveForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  

      })
    }
  }

  listGroupe() {
    this.groupeService.getGroupe(this.annee_id).subscribe(res => {
      console.log(res);
      this.groupes = res;
    })
  }

}
