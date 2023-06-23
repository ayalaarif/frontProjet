import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Examen } from 'src/app/shared/models/examen.model';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-ajouter-examen',
  templateUrl: './ajouter-examen.component.html',
  styleUrls: ['./ajouter-examen.component.css']
})
export class AjouterExamenComponent implements OnInit {

  showMsg: boolean=false
  MsgError: boolean=false
  File: boolean = false;
  @ViewChild('examenForm') examenForm!: NgForm;
  files: any
  filesCorrection: any
  fileEmpty: boolean = true
  annee_id!:number
 sessions:any
  id: any


  constructor(private examenService: ExamenService, private authService: AuthService,private sessionService:SessionScolaireService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    this.listeSessions()
  }

  listeSessions(){
    this.sessionService.getSessions(this.annee_id).subscribe(res=>{
      console.log(res);
      this.sessions=res;
    })
  }
  onFileSelected1(event: any) {

    this.files = event.target.files[0]
    this.fileEmpty = false
    console.log(this.files)

  }

  onFileSelected2(event: any) {
    this.filesCorrection = event.target.files[0]
    console.log(this.filesCorrection)
    this.File = true

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  examen = new Examen();


  ajouterExamen() {
    if (!this.examenForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {

      const formData = new FormData();
      if(this.fileEmpty==false){
        formData.append("file_examen", this.files, this.files.name);
      }
      
      if (this.File) {
        formData.append("file_correction", this.filesCorrection, this.filesCorrection.name);

      }
      formData.append("type", this.examen.type);
      formData.append("date", this.examen.date.toString() || '');
      formData.append("session_id", this.examen.session_id.toString());
      formData.append("libelle", this.examen.libelle);
      formData.append("enseignant_id", this.id);


      this.examenService.ajouterExamen(formData).subscribe(res => {
        console.warn(res);
        this.MsgError=false
        this.showMsg = true;
        this.examenForm.resetForm();
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })

    }


  }
}
