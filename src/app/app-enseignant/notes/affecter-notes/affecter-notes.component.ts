import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Note } from 'src/app/shared/models/note.model';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { Notes } from 'src/app/shared/models/notes.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-affecter-notes',
  templateUrl: './affecter-notes.component.html',
  styleUrls: ['./affecter-notes.component.css']
})
export class AffecterNotesComponent implements OnInit {
  user: any;
  id!: number;
  examens: any
  listGroupes: any
  listEleves: any
  showMsg: boolean=false
  MsgError: boolean=false
  exist!:number
  EleveLength!:number
  found:any
 select:boolean=false
 annee_id!:number
  @ViewChild('noteForm') noteForm!: NgForm;
  @ViewChild('note') note!: NgModel
  @ViewChild('rq') remarque!: NgModel
  // @ViewChild('successMsg') successMsg!: NgModel



  listNotes: Notes<Note> = {
    examen_id: 0,
    notes: []
  }

  data: any
  groupe_id = 0


  constructor(private ns: NoteService, private es: ExamenService, private authService: AuthService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.ExamenEnseignant();   
    
      
  }

  //Retourne la liste des examens d'un enseignant spécifique 
  ExamenEnseignant() {
    this.es.listExamenEnseignant(this.id,this.annee_id).subscribe(res => {
      console.log('examen')
      console.log(res);
      this.examens = res

    })
  }

  

  //à chaque fois un examen est séléctionné, cette fct permet de retourne la liste des groupes affectée à ce examen

  onSelect() {
    console.log('examenId' + this.listNotes.examen_id)
    this.es.listExamenGroupes(this.listNotes.examen_id,this.annee_id).subscribe(res => {
      console.log('groupe');
      console.log(res);
      this.groupe_id = 0
      this.listGroupes = res;
    })
  }
  //Retourne les notes affectée à ce examen
  // this.ns.listeNotes(this.listNotes.examen_id).subscribe(res => {
  //   console.log("ExamenId"+this.listNotes.examen_id);
  //   console.log("listeNotes"+JSON.stringify(res))
  //   this.data= res;
  // })
  // })



  //Recherche si l'eleveId existe dans la liste des notes d'un examen spécifique
  // exist(eleveId: number){
  //   console.log(this.data)
  //   return this.data.some((le: any)=> (le.eleve_id === eleveId))
  // }




  onSelect2() {
    // this.groupe_id = groupe.target.value
    console.log('groupeId' + this.groupe_id)
    this.ElevesGroupe()

  }


  //Retourne la liste des élèves affectés à un groupe spécifique avec la note de chaque élève dans un examen précis.
  ElevesGroupe() {
    this.ns.listElevesGroupe(this.groupe_id, this.listNotes.examen_id).subscribe(res => {
      console.log('eleves');
      console.log(res);
      this.listEleves = res;
      console.log('eleveLength'+this.listEleves.length)
     this.EleveLength=this.listEleves.length
      this.found = this.listEleves.filter((element:any) => element.note.length ==0);
      console.log(this.found.length)
      this.exist=this.found.length
      this.select=true
      
      for (var i = 0; i < this.exist; i++) {
        this.listNotes.notes.push(new Note());
        this.listNotes.notes[i].eleve_id = this.found[i].id
      }
      console.log('lengthnotes' + this.listNotes.notes.length)

    })
  }

  myBtnIdClicked: boolean = false
  myBtnClicked() {
    this.myBtnIdClicked = true
    // console.log(this.myBtnIdClicked)
  }

  affecterNotes() {
    // if (this.note.invalid || this.remarque.invalid && this.myBtnIdClicked == true) {
    //   this.MsgError = true

    // } else {
     
      console.log(this.listNotes)
      this.ns.ajouterNote(this.listNotes).subscribe(res => {
        console.warn(res);
        this.noteForm.resetForm();
        this.groupe_id = 0
        this.MsgError=false
        this.showMsg = true;
        setTimeout( ()=>{
          this.showMsg=false;
        },2000)
  
      })

    // }
  }
  

}
