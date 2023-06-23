import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { ParentService } from 'src/app/shared/services/parent.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: any
  eleveId = 0
  l!: number
  id!: number;
  parent!: any
  clicked: boolean = false
annee_id!:number
  constructor(private authService: AuthService, private ps: ParentService, private ns: NoteService) { }

  ngOnInit(): void {
    this.id = this.authService.getParentId()
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.getParentById()
  }

  getNotesByEleveId(id: number) {
    this.ns.NotesEleveById(id,this.annee_id).subscribe(res => {
      console.log(res);
      this.notes = res;
    })
  }

  onSelect() {
    this.getNotesByEleveId(this.eleveId)
    this.clicked = true
  }


  getParentById() {
    this.ps.getParentById(this.id,this.annee_id).subscribe(res => {
      console.log(res);
      this.parent = res;
      this.parent.eleves = this.parent.eleves.filter((element:any) => element.groupes.length>0);
      this.l = this.parent.eleves.length
      if (this.l == 1) {
        this.getNotesByEleveId(this.parent.eleves[0].id)
      }

    })
  }

}
