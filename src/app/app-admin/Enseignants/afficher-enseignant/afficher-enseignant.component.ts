import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnseignantService } from 'src/app/shared/services/enseignant.service';
import { ImagesService } from 'src/app/shared/services/images.service';

@Component({
  selector: 'app-afficher-enseignant',
  templateUrl: './afficher-enseignant.component.html',
  styleUrls: ['./afficher-enseignant.component.css']
})
export class AfficherEnseignantComponent implements OnInit {

  id!: number;
  data!: any;
  matiere: any;
  imageToShow: any;
  // isImageLoading:any


  constructor(private route: ActivatedRoute, private enseignantService: EnseignantService, private imageService: ImagesService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getEnseignantById();
    this.getImageFromService();
  }

  getEnseignantById() {
    this.enseignantService.getEnseignantById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      
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
    // this.isImageLoading = true;
    this.imageService.getImageEnseignant(this.id).subscribe(data => {
      this.createImageFromBlob(data);
    //   this.isImageLoading = false;
    // }, error => {
    //   this.isImageLoading = false;
    //   console.log(error);
    });
  }


}
