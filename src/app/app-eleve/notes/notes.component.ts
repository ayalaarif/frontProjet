import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  eleveId!: number
  notes: any
  annee_id!:number

  searchedList: any = [];
  inputSearchedValue!: string;
  totalListNotes: any;


  constructor(private noteService: NoteService, private authService: AuthService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
     this.annee_id= JSON.parse(a).id
    }
    this.eleveId= this.authService.getEleveId()
    this.getNotesEleve()
  }

  getNotesEleve() {
    this.noteService.NotesEleveById(this.eleveId,this.annee_id).subscribe(res => {
      console.log(this.eleveId)
      console.log(res);
      this.notes = res;
      this.totalListNotes= res;

    })
  }

  onInputSearch(event: any) {
    this.inputSearchedValue = event.target.value;
    console.log("inputSearchedValue: ", this.inputSearchedValue)
    if (this.inputSearchedValue && this.inputSearchedValue != "") {
      let list: any = [];
      list = this.totalListNotes;
      this.searchedList = list.filter((x: any) => x.examen.enseignants[0].matiere.libelle.toUpperCase().includes(this.inputSearchedValue.toUpperCase()));
      this.notes = this.searchedList;

    } else {
      this.notes = this.totalListNotes;
    }
  }


}
