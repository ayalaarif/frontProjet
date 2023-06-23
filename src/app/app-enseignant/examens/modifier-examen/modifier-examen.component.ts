import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Examen } from 'src/app/shared/models/examen.model';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-modifier-examen',
  templateUrl: './modifier-examen.component.html',
  styleUrls: ['./modifier-examen.component.css']
})
export class ModifierExamenComponent implements OnInit {

  @ViewChild('examenForm') examenForm!: NgForm
  id!: number
  data: any
  showMsg: boolean=false
  MsgError: boolean=false
  examen = new Examen()
  files: any
  filesCorrection: any
  File: boolean = false
  FileCorrecrtion: boolean = false
  annee_id!:number
  sessions:any
  constructor(private route: ActivatedRoute, private examenService: ExamenService,private sessionService:SessionScolaireService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listeSessions()
    this.getExamen();
  }
  listeSessions(){
    this.sessionService.getSessions(this.annee_id).subscribe(res=>{
      console.log(res);
      this.sessions=res;
    })
  }
  getExamen() {
    this.examenService.getExamenById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.examen = this.data;
    })
  }

  onFileSelected1(event: any) {

    this.files = event.target.files[0]
    console.log(this.files)
    this.File = true


  }

  onFileSelected2(event: any) {
    this.filesCorrection = event.target.files[0]
    console.log(this.filesCorrection)
    this.FileCorrecrtion = true

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  modifierExamen() {
    if (!this.examenForm.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true

    } else {
     
      const formData = new FormData();
      if (this.File) {
        formData.append("file_examen", this.files, this.files.name);

      }
      if (this.FileCorrecrtion) {
        formData.append("file_correction", this.filesCorrection, this.filesCorrection.name);
      }
      formData.append("type", this.examen.type);
      formData.append("date", this.examen.date.toString() || '');
      formData.append("session_id", this.examen.session_id.toString());
      formData.append("libelle", this.examen.libelle);
      formData.append("_method", 'PUT');

      this.examenService.modifierExamen(this.id, formData).subscribe(res => {
        this.examenForm.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })

    }

  }


}
