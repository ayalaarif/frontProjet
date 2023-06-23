import { Component, OnInit } from '@angular/core';
import { EnseignantService } from 'src/app/shared/services/enseignant.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImagesService } from 'src/app/shared/services/images.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-emploi-enseignant',
  templateUrl: './emploi-enseignant.component.html',
  styleUrls: ['./emploi-enseignant.component.css']
})
export class EmploiEnseignantComponent implements OnInit {
  
  id!: number;
  enseignant: any;
  imageToShow: any;
  isImageLoading:any;
  seances:any
  keys:any 
  annee_id!:number

  // date!:Time
  // this.date=9
 

  
  


  constructor(private enseignantService: EnseignantService,private authService: AuthService, private imageService: ImagesService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.id=this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.getEnseignantById();
    this.getImageFromService();
    this.getSeances()
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

  getSeances(){
    this.enseignantService.getSeances(this.id,this.annee_id).subscribe(res => {
      console.log(res);
      
     this.seances=res
     this.keys=Object.keys(this.seances)
      console.log(this.keys)
      
  
     

    })
      
    

  }

}
