import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cours } from 'src/app/shared/models/cours.model';
import { CoursService } from 'src/app/shared/services/cours.service';
import { AuthService } from 'src/app/shared/services/auth.service';
 

@Component({
  selector: 'app-ajouter-cours',
  templateUrl: './ajouter-cours.component.html',
  styleUrls: ['./ajouter-cours.component.css']
})
export class AjouterCoursComponent implements OnInit {
  files: any
  @ViewChild('coursform') coursform!: NgForm;
  showMsg: boolean=false
  MsgError: boolean=false
  id: any
  fileEmpty: boolean=true


  constructor(private coursService: CoursService, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()

  }
  cours = new Cours()

  uploadFile(event: any) {
    this.files = event.target.files[0]
    this.fileEmpty= false
    console.log(this.files)
    console.log(this.fileEmpty)

  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  // $timeout(function() {
  //   model.resetted = false;
  // }, X); // X in milliseconds




  ajouterCours() {

    if (!this.coursform.form.valid && this.myBtnIdClicked == true) {
      this.MsgError = true
    } else {
      const formData = new FormData();
      formData.append("file", this.files, this.files.name);
      formData.append("libelle", this.cours.libelle);
      formData.append("description", this.cours.description);
      formData.append("enseignant_id", this.id);
      console.log(typeof this.id);


      console.log(formData)
      this.coursService.uplooadData(formData).subscribe(res => {
        console.warn(res);
        this.coursform.resetForm();
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false
        },2000)
  


      });
    }

  }

}
