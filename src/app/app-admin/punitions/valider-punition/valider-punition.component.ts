import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValiderPunition } from 'src/app/shared/models/valider-punition.model';
import { PunitionService } from 'src/app/shared/services/punition.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-valider-punition',
  templateUrl: './valider-punition.component.html',
  styleUrls: ['./valider-punition.component.css']
})
export class ValiderPunitionComponent implements OnInit {
  data!: any
  id!: number
  annee_id!:number


  constructor(private ps: PunitionService, private route: ActivatedRoute, private router: Router,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getPunitionById()

  }

  getPunitionById(){
    this.ps.getPunitionById(this.id,this.annee_id).subscribe(res=>{
      console.log(res);
      this.data= res
      this.validerData.type= this.data.type
      
    })
  }
validerData = new ValiderPunition()
  validerPunition(){
    this.ps.validerPunition(this.id, this.validerData).subscribe(res => {
    this.router.navigate(['/admin/afficherPunition/'+this.id])
    })
  }





}
