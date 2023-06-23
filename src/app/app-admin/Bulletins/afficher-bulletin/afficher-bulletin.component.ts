import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulletinService } from 'src/app/shared/services/bulletin.service';
import{ jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-afficher-bulletin',
  templateUrl: './afficher-bulletin.component.html',
  styleUrls: ['./afficher-bulletin.component.css']
})
export class AfficherBulletinComponent implements OnInit {
 id!:number
 bulletin:any
 note:any
 annee_id!:number
 sessions:any
 indexSession!:number
 data={
   eleve_id:0,
   annee_id:0
 }
 @ViewChild('pdf',{static:false}) el!:ElementRef
  constructor(private route: ActivatedRoute,private bulletinService:BulletinService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.data.annee_id=this.annee_id
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getBulletinById()
   
  }
  getBulletinById() {
    this.bulletinService.getBulletinById(this.id).subscribe(res => {
      console.log(res);
      this.bulletin = res;
      this.data.eleve_id=this.bulletin[0].eleve_id
      console.log(this.data)
      this.bulletinService.getSessionsBulletinsAdmin(this.data).subscribe(aa => {
        console.log(aa);
        this.sessions = aa;
       this.indexSession= this.sessions.findIndex((e:any) => (e.id===this.bulletin[0].session_id))
       console.log('session hey'+this.indexSession)
      })
    })
  }
 
  examen(type: string,matiere_id:number) {
    this.note=this.bulletin.notes[matiere_id].find((e:any) => (((e.examen.type.toUpperCase()) === (type.toUpperCase()))))
    // console.log(matiere_id,type)
    // console.log(this.note)
      return(this.note)
  }
  controle(matiere_id:number,num:number) {
    this.note=this.bulletin.notes[matiere_id].find((e:any) => (((e.examen.type.toUpperCase()) === ("Contrôle".toUpperCase()))&&(e.examen.libelle.includes(num))))
    // console.log(matiere_id,type)
    // console.log(this.note)
      return(this.note)
  }
  // makePDF(){
  //   let pdf=new jsPDF('p','pt','a1');
  //   // pdf.setFontSize(10);
  //   // pdf.setDisplayMode("fullwidth", "continuous","FullScreen");
  //   pdf.html(this.el.nativeElement,{
  //     // autoPaging: true,
  //     // width: 210,
  //     // margin: 15,
  //     // x: 0,
  //     // y: 0,

  //     callback:(pdf)=>{
  //       // pdf.text("emploi",10,10);
  //       // Width:100%,
  //       pdf.save(this.bulletin[0].eleve.matricule+this.bulletin[0].session_scolaire.annee_scolaire.annee+this.bulletin[0].session_scolaire.nom);

  //     }
  //   });
    
  // }
  public makePDF(): void {
 let DATA :any= document.getElementById('pdf');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save(this.bulletin[0].eleve.matricule+this.bulletin[0].session_scolaire.annee_scolaire.annee+this.bulletin[0].session_scolaire.nom);
  });
}
}
