import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/models/note.model';
import { Notes } from 'src/app/shared/models/notes.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExamenService } from 'src/app/shared/services/examen.service';
import { NoteService } from 'src/app/shared/services/note.service';
import * as XLSX from 'xlsx';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-afficher-notes',
  templateUrl: './afficher-notes.component.html',
  styleUrls: ['./afficher-notes.component.css']
})
export class AfficherNotesComponent implements OnInit {

  id!: number;
  examens: any
  listGroupes: any
  listEleves: any
  @ViewChild('listnoteForm') listnoteForm!: NgForm;
  updateMsg: boolean = false;
  DeleteMsg: boolean = false;
  found: any
  examen_id!: number
  groupe_id = 0
  exist!: number
  select: boolean = false
  Note = new Note()
  update: boolean = false
  index!: number
  annee_id!: number

  fileName = 'ExcelSheet.xlsx';

  @ViewChild('closeModal') closeModal!: ElementRef;


  constructor(private authService: AuthService, private es: ExamenService, private ns: NoteService, public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.id = this.authService.getEnseignantId()
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a = sessionStorage.getItem('annee');
    if (a) {

      this.annee_id = JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.ExamenEnseignant();
    // this.listNotesExamen();

  }

  //Retourne la liste des examens d'un enseignant spécifique
  ExamenEnseignant() {
    this.es.listExamenEnseignant(this.id, this.annee_id).subscribe(res => {
      console.log(res);
      this.examens = res

    })

  }

  //à chaque fois un examen est séléctionné, cette fct permet de retourne la liste des groupes affectée à ce examen
  onSelect() {
    console.log(this.examen_id)
    this.es.listExamenGroupes(this.examen_id, this.annee_id).subscribe(res => {
      console.log(res);
      this.groupe_id = 0
      this.listGroupes = res;

    })


  }


  onSelect2() {
    // this.groupe_id = groupe.target.value
    console.log(this.groupe_id)
    this.ElevesGroupe()



  }


  //Retourne la liste des élèves affectés à un groupe spécifique avec la note de chaque élève dans un examen précis.
  ElevesGroupe() {
    this.ns.listElevesGroupe(this.groupe_id, this.examen_id).subscribe(res => {
      console.log(res);
      this.listEleves = res;
      //retourne seulement les élèves qui ont une note
      this.found = this.listEleves.filter((element: any) => element.note.length > 0);
      console.log(this.found.length)
      this.exist = this.found.length
      this.select = true
    })
  }
  annuler() {
    this.index = this.exist + 1
    this.update = false

  }
  modifier(note: Note, i: number) {
    this.Note.id = note.id
    this.Note.note = note.note
    this.Note.remarque = note.remarque
    this.index = i
    this.update = true


  }
  //Modifier une note d'un élève.
  modifierNote() {
    this.ns.modifierNote(this.Note.id, this.Note).subscribe(res => {
      this.ElevesGroupe()
      this.updateMsg = true;
      this.index = this.exist + 1
      setTimeout(() => {
        this.updateMsg = false;
      }, 2000)
      this.update = false
    })

  }

  cancel() {
    this.closeModal.nativeElement.click();
  }

  idNote!: number;
  onClick(event: number) {
    this.idNote = event
    console.log("idNote:", this.idNote)
  }

  //supprimer une note d'un élève.
  supprimerNote(id: number) {
    this.ns.supprimerNote(id).subscribe(res => {
      console.log(res)
      this.closeModal.nativeElement.click();
      this.ElevesGroupe()
      this.DeleteMsg = true
      setTimeout(() => {
        this.DeleteMsg = false;
      }, 2000)


    })
  }

  hideActionTD: boolean = false
  // OnhideTD() {
  //   this.hideActionTD = true

  // }

  exportexcel(): void {
    if (this.hideActionTD == false) {
      this.hideActionTD= true

    }else{

   
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    /* save to file */
    XLSX.writeFile(wb, this.fileName);

    this.hideActionTD= false
  } 
}


}