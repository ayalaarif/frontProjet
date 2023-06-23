import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NiveauService } from 'src/app/shared/services/niveau.service';

@Component({
  selector: 'app-afficher-niveau',
  templateUrl: './afficher-niveau.component.html',
  styleUrls: ['./afficher-niveau.component.css']
})
export class AfficherNiveauComponent implements OnInit {
  id!: number;
  showMsg: boolean= false;
  data: any;
  niveau:any;
  data1:any

  constructor(private route: ActivatedRoute, private niveauService: NiveauService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id=this.route.snapshot.params['id'];
    this.getNiveau();
    this.data1={
      niveau_id:this.id,
      matiere_id:0
  
    }
  }
  getNiveau(){
    this.niveauService.getNiveauById(this.id).subscribe(res=>{
      console.log(res);
      this.data=res;
      this.niveau= this.data;
    })
  }
  deleteMatiere(matiere_id:number){
  this.data1.matiere_id=matiere_id
  this.niveauService.supprimerMatiere(this.data1).subscribe(res=>{
   this.getNiveau();
   console.log(res);
   this.showMsg= true;
   setTimeout( ()=>{
    this.showMsg=false;
  },2000)

 })



}

}
