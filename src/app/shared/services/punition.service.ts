import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Punition } from '../models/punition.model';
import { ValiderPunition } from '../models/valider-punition.model';

@Injectable({
  providedIn: 'root'
})
export class PunitionService {

  constructor(private http: HttpClient) { }

  donnerPunition(data: Punition) {
    return this.http.post(environment.backendUrl + "/punition", data)
  }

  getPunition(id:number){
    return this.http.get(environment.backendUrl+"/punition",{params:{annee_id:id}})
  }

  supprimerPunition(id: number) {
    return this.http.delete(environment.backendUrl + "/punition/" + id)
  }

  getPunitionById(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/punition/"+id,{params:{annee_id:annee_id}})

  }

  modifierPunition(id: number, data: Punition) {
    return this.http.put(environment.backendUrl + "/punition/" + id, data)

  }

  

  validerPunition(id: number, data: ValiderPunition) {
    return this.http.put(environment.backendUrl + "/validerPunition/" + id, data)

  }

  getPunitionsByEnseignantId(enseignant_id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/getPunitions/"+enseignant_id,{params:{annee_id:annee_id}})}
    
  getPunitionsByEleveId(EleveId: number,annee_id:number) {
    return this.http.get(environment.backendUrl + "/getPunitionsByEleveId/" + EleveId,{params:{annee_id:annee_id}})
  }


  //pour l'esapce parent
  showPunitionById(id: number,annee_id:number) {
    return this.http.get(environment.backendUrl + "/showPunition/" + id,{params:{annee_id:annee_id}})

  }


}
