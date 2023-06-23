import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { ImagesService } from 'src/app/shared/services/images.service';



@Component({
  selector: 'app-afficher-profile',
  templateUrl: './afficher-profile.component.html',
  styleUrls: ['./afficher-profile.component.css']
})
export class AfficherProfileComponent implements OnInit {
  id!: number;
  eleve: any;
  imageToShow: any;
  isImageLoading:any
  annee_id!:number


  constructor(private eleveService: EleveService ,private authService: AuthService, private imageService: ImagesService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }

    this.id=this.authService.getEleveId()
    this.getEleveById();
    this.getImageFromService();
  }

  getEleveById(){
    this.eleveService.getEleveById(this.id,this.annee_id).subscribe(res=> {
      console.log(res);
      this.eleve= res;
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
    this.imageService.getImageEleve(this.id).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

}
