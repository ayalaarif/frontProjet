import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionScolaire } from '../models/session-scolaire.model';

@Injectable({
  providedIn: 'root'
})
export class SessionScolaireService {

  constructor(private http: HttpClient) { }
  ajouterSessionScolaire(data: SessionScolaire) {
    return this.http.post(environment.backendUrl + "/session", data)
  }
  getSessions(id:number) {
    return this.http.get(environment.backendUrl + "/session",{params:{annee_id:id}})
  }

  supprimerSession(id: number) {
    return this.http.delete(environment.backendUrl + "/session/" + id)

  }
  modifierSession(id: number, data:SessionScolaire){
    return this.http.put(environment.backendUrl+"/session/"+id,data)
    
  }
  getSessionById(id: number){
    return this.http.get(environment.backendUrl+"/session/"+id)

  }
}
