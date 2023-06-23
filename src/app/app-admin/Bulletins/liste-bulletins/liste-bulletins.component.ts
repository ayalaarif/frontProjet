import { Component, OnInit ,ElementRef ,ViewChild } from '@angular/core';
import { BulletinService } from 'src/app/shared/services/bulletin.service';

@Component({
  selector: 'app-liste-bulletins',
  templateUrl: './liste-bulletins.component.html',
  styleUrls: ['./liste-bulletins.component.css']
})
export class ListeBulletinsComponent implements OnInit {
  bulletins:any
  showMsg: boolean = false;
  annee_id!:number
  @ViewChild('closeModal') closeModal!: ElementRef;
  constructor(private bulletinService:BulletinService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listeBulletins()
  }
  listeBulletins() {
    this.bulletinService.getBulletins(this.annee_id).subscribe(res=>{
      console.log(res);
      this.bulletins = res;
    
    })
  }
  cancel() {
    this.closeModal.nativeElement.click();
  }
  idBulletin!: number;
  onClick(event: number) {
    this.idBulletin = event
    console.log("idBulletin:", this.idBulletin)
  }
  deleteBulletin(id: number) {
    this.bulletinService.supprimerBulletin(id).subscribe(res => {
      this.listeBulletins();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 2000)
    })
  }


}
