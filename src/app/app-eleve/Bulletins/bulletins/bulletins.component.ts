import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BulletinService } from 'src/app/shared/services/bulletin.service';

@Component({
  selector: 'app-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.css']
})
export class BulletinsComponent implements OnInit {
annee_id!:number
eleveId!:number
bulletins:any
  constructor(private authService: AuthService,private bulletinService:BulletinService ) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
     this.annee_id= JSON.parse(a).id
    }
    this.eleveId= this.authService.getEleveId()
    this.listeBulletinsEleve()
  }
  listeBulletinsEleve() {
    this.bulletinService.listeBulletinsEleve(this.eleveId,this.annee_id).subscribe(res => {
      console.log(this.eleveId)
      console.log(res);
      this.bulletins = res;

    })
  }

}
