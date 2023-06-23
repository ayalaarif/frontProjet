import { Component, OnInit } from '@angular/core';
import { EnseignantService } from 'src/app/shared/services/enseignant.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImagesService } from 'src/app/shared/services/images.service';

@Component({
  selector: 'app-profile-enseignant',
  templateUrl: './profile-enseignant.component.html',
  styleUrls: ['./profile-enseignant.component.css']
})
export class ProfileEnseignantComponent implements OnInit {

  id!: number;
  enseignant: any;
  imageToShow: any;
  isImageLoading:any

  constructor(private enseignantService: EnseignantService,private authService: AuthService, private imageService: ImagesService) { }

  ngOnInit(): void {
    this.id=this.authService.getEnseignantId()
    this.getEnseignantById();
    this.getImageFromService();

  }
  
  getEnseignantById() {
    this.enseignantService.getEnseignantById(this.id).subscribe(res => {
      console.log(res);
      this.enseignant = res;
    })
  }

   //cette fonction renvoie une image codée en base64 qui est utiliser après dans l'attribut src de img pour afficher l'image
   createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    
  }

  //obtenir une image à partir de l'api.
  getImageFromService() {
    this.isImageLoading = true;
    this.imageService.getImageEnseignant(this.id).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }


  // getMatiereById() {
  //   this.matiereService.getMatiereById(this.id).subscribe(res => {
  //     console.log(res);
  //     this.matiere = res;
  //   })
  // }

}
