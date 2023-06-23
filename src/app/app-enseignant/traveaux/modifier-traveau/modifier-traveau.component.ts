import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Traveau } from 'src/app/shared/models/traveau.model';
import { TraveauService } from 'src/app/shared/services/traveau.service';
import { CoursService } from 'src/app/shared/services/cours.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modifier-traveau',
  templateUrl: './modifier-traveau.component.html',
  styleUrls: ['./modifier-traveau.component.css']
})
export class ModifierTraveauComponent implements OnInit {
  @ViewChild('traveauForm') traveauForm!: NgForm
  id!: number
  EnseignantId!:number
  Cours:any
  traveau=new Traveau()
  data: any
  showMsg: boolean= false
  files: any
  filesCorrection: any
  File: boolean = false
  FileCorrecrtion: boolean = false
  constructor(private route: ActivatedRoute,private traveauService:TraveauService,private coursService: CoursService,private authService: AuthService ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id=this.route.snapshot.params['id'];
    this.EnseignantId=this.authService.getEnseignantId()
    this. getTraveau()
    this.listCours()
   
  }
  getTraveau() {
    this.traveauService.getTraveauById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.traveau = this.data;
    })
  }
  listCours(){
    this.coursService.getCours(this.EnseignantId).subscribe(res=>{
      console.log(res);
      this.Cours=res;
    })
  }
  onFileSelected1(event: any) {

    this.files = event.target.files[0]
    console.log(this.files)
    this.File=true


  }

  onFileSelected2(event: any) {
    this.filesCorrection = event.target.files[0]
    console.log(this.filesCorrection)
    this.FileCorrecrtion=true

  }
  modifierTraveau() {

    const formData = new FormData();
    if(this.File){
      formData.append("file", this.files, this.files.name);

    }
    if(this.FileCorrecrtion){
    formData.append("file_correction", this.filesCorrection, this.filesCorrection.name);
    }

    formData.append("libelle", this.traveau.libelle);

    formData.append("type", this.traveau.type);
    formData.append("cours_id", this.traveau.cours_id.toString());
    formData.append("_method", 'PUT');

    this.traveauService.modifierTraveau(this.id, formData).subscribe(res => {
      this.traveauForm.resetForm();
      this.showMsg = true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)
    })
  }

}
