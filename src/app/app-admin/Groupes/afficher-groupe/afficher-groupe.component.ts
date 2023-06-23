import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-afficher-groupe',
  templateUrl: './afficher-groupe.component.html',
  styleUrls: ['./afficher-groupe.component.css']
})
export class AfficherGroupeComponent implements OnInit {
  id!:number
  data:any
  groupe:any

  constructor(private route: ActivatedRoute,private groupeService: GroupeService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id=this.route.snapshot.params['id'];
    this.getEleves()
  }

 getEleves(){
   this.groupeService.afficherEleves(this.id).subscribe(res=>{
      console.log(res);
      this.data=res;
      this.groupe= this.data;
    })
  }
}
