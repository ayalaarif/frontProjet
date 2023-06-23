import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EleveService } from 'src/app/shared/services/eleve.service';
import { ImagesService } from 'src/app/shared/services/images.service';
import{ jsPDF } from "jspdf";
import { EmploiService } from 'src/app/shared/services/emploi.service';
@Component({
  selector: 'app-emploi-eleve',
  templateUrl: './emploi-eleve.component.html',
  styleUrls: ['./emploi-eleve.component.css']
})
export class EmploiEleveComponent implements OnInit {
  @ViewChild('emploi',{static:false}) el!:ElementRef
  id!: number;
  eleve: any;
  imageToShow: any;
  isImageLoading:any
  annee_id!:number
  seance:any
  // keys:any
  Emploi:any
  GroupeId!:number
  semaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  demiJour1: string[] = ['08:00:00', '09:00:00', '10:00:00', '11:00:00']
  demiJour2: string[] = ['14:00:00', '15:00:00', '16:00:00', '17:00:00']

  constructor(private eleveService: EleveService ,private authService: AuthService, private imageService: ImagesService,private e:EmploiService) { }


  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log('annee'+this.annee_id)
    }
    this.GroupeId = this.authService.getEleveGroupeId()
    console.log('groupe'+this.GroupeId)
    this.id=this.authService.getEleveId()
    this.getEleveById();
    this.getImageFromService();
    this.getEmlpoiEleve();
  }
  getEleveById(){
    this.eleveService.getEleveById(this.id,this.annee_id).subscribe(res=> {
      console.log(res);
      console.log('eleve')
      this.eleve= res;
    })
  }
  getEmlpoiEleve(){
    console.log('groupeId',this.GroupeId)
    this.e.getEmploiByGroupeId(this.GroupeId).subscribe(res => {
      console.log(res);
      
     this.Emploi=res
    //  console.log('seances')
    //  console.log(this.seances)
    //  this.keys=Object.keys(this.seances)
    //   console.log('keys'+this.keys)
      
  
     

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
  exist(j: string,h:string) {
    this.seance=this.Emploi.seances.find((e:any) => ((e.jour.toUpperCase() === j.toUpperCase())&&e.heure==h))
    return this.seance
  }
  makePDF(){
    let pdf=new jsPDF('p','pt','a2');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        // pdf.text("emploi",10,10);
        // Width:100%,
        pdf.save(this.Emploi.groupe.niveau.libelle+this.Emploi.groupe.num+this.Emploi.annee_scolaire);

      }
    });
    
  }

}
