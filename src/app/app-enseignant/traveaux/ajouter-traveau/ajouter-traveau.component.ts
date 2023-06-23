import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Traveau } from 'src/app/shared/models/traveau.model';
import { CoursService } from 'src/app/shared/services/cours.service';
import { TraveauService } from 'src/app/shared/services/traveau.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-ajouter-traveau',
  templateUrl: './ajouter-traveau.component.html',
  styleUrls: ['./ajouter-traveau.component.css']
})
export class AjouterTraveauComponent implements OnInit {
  showMsg: boolean=false
  MsgError: boolean=false
  Cours: any
  files: any
  id!: number
  filesCorrection: any
  File!: boolean
  @ViewChild('traveauForm') traveauForm!: NgForm;
  fileEmpty: boolean = true


  constructor(private traveauService: TraveauService, private coursService: CoursService, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    this.listCours()
  }
  uploadFile(event: any) {
    this.files = event.target.files[0]
    this.fileEmpty = false
    console.log(this.files)

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  uploadFile1(event: any) {
    this.filesCorrection = event.target.files[0]
    console.log(this.filesCorrection)
    this.File = true

  }
  traveau = new Traveau()
  listCours() {
    this.coursService.getCours(this.id).subscribe(res => {
      console.log(res);
      this.Cours = res;
    })
  }
  ajouterTraveau() {
    if (!this.traveauForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      
      
      const formData = new FormData();
      formData.append("file", this.files, this.files.name);

      if (this.File) {
        formData.append("file_correction", this.filesCorrection, this.filesCorrection.name);

      }
      formData.append("libelle", this.traveau.libelle);
      formData.append("type", this.traveau.type);
      formData.append("cours_id", this.traveau.cours_id.toString());
      //console.log(typeof this.traveau.cours_id.toString() );

      this.traveauService.ajouterTraveau(formData).subscribe(res => {
        console.warn(res);
        this.traveauForm.resetForm();
        this.MsgError=false
        this.showMsg = true;  setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
        // this.groupe.niveau_id = 0
      })

    }

  }

}
