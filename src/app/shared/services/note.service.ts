import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNote() {
    return this.http.get(environment.backendUrl + "/note")

  }

  supprimerNote(id: number) {
    return this.http.delete(environment.backendUrl + "/note/" + id)

  }

  ajouterNote(data: any) {
    return this.http.post(environment.backendUrl + "/note", data)

  }

  getNoteById(id: number) {
    return this.http.get(environment.backendUrl + "/note/" + id)
  }

  modifierNote(id: number, data: any) {
    return this.http.put(environment.backendUrl + "/note/" + id, data)

  }

  //Retourne la liste des élèves affectés à un groupe spécifique avec la note de chaque élève dans un examen précis.
  listElevesGroupe(id: number, id1: number) {
    return this.http.get(environment.backendUrl + "/ElevesGroupe/" + id + "/" + id1)
  }

  //Retourne les notes affectées d'un examen spécifique
  // listeNotes(id: number){
  //   return this.http.get(environment.backendUrl+"/listNotesExamen/"+id)

  // }

  //Retourne les notes d'un élève associées à leurs examens et matières
  NotesEleveById(id: number,annee_id:number) {
    return this.http.get(environment.backendUrl + "/NotesEleve/" + id,{params:{annee_id:annee_id}})
  }



}
