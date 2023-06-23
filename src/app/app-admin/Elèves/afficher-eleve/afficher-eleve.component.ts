import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { ImagesService } from 'src/app/shared/services/images.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-afficher-eleve',
  templateUrl: './afficher-eleve.component.html',
  styleUrls: ['./afficher-eleve.component.css']
})
export class AfficherEleveComponent implements OnInit {
  id!: number;
  data!: any;
  imageToShow: any;
  annee_id!:number


  // isImageLoading!: boolean


  constructor(private route: ActivatedRoute, private eleveService: EleveService, private imageService: ImagesService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getEleveById();
    this.getImageFromService();

  }

  getEleveById(){
    this.eleveService.getEleveById(this.id,this.annee_id).subscribe(res=>{
      console.log(res);
      this.data= res;

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
    this.imageService.getImageEleve(this.id).subscribe(data => {
      this.createImageFromBlob(data);
    //   this.isImageLoading = false;
    // }, error => {
    //   this.isImageLoading = false;
    //   console.log(error);
    });
  }

}
