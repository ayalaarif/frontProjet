import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessionScolaireService } from 'src/app/shared/services/session-scolaire.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-liste-sessions',
  templateUrl: './liste-sessions.component.html',
  styleUrls: ['./liste-sessions.component.css']
})
export class ListeSessionsComponent implements OnInit {
  sessions: any
  showMsg: boolean = false;
  annee_id!: number
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private sessionService: SessionScolaireService, public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.listeSessions()
  }
  listeSessions() {
    this.sessionService.getSessions(this.annee_id).subscribe(res => {
      console.log(res);
      this.sessions = res;
    })
  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idSession!: number;
  onClick(event: number) {
    this.idSession = event
    console.log("idSession:", this.idSession)
  }

  supprimerSession(id: number){
    this.sessionService.supprimerSession(id).subscribe(res=>{
      this.listeSessions();
      console.log(res);
      this.closeModal.nativeElement.click();
      this.showMsg= true;
      setTimeout( ()=>{
        this.showMsg=false;
      },2000)

    })
  }

}
