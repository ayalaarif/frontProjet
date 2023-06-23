import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PunitionService } from 'src/app/shared/services/punition.service';

@Component({
  selector: 'app-afficher-punition',
  templateUrl: './afficher-punition.component.html',
  styleUrls: ['./afficher-punition.component.css']
})
export class AfficherPunitionComponent implements OnInit {
  data!: any;
  id!: number
  annee_id!: number

  constructor(private route: ActivatedRoute, private ps: PunitionService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.showPunitionById()
  }

  showPunitionById(){
    this.ps.showPunitionById(this.id,this.annee_id).subscribe(res=>{
      console.log(res);
      this.data= res;

    })
  }

}
