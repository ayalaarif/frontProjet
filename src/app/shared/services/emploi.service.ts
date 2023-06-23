import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Emploi } from '../models/emploi.model';
import { Seance } from '../models/seance.model';

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  constructor(private http: HttpClient) { }

  afficherMatiereEnseignant(id: number) {
    return this.http.get(environment.backendUrl + "/MatiereEnseignantByGroupe/" + id)
  }

  ajouterEmploi(data: any){
    return this.http.post(environment.backendUrl+"/emplois", data)

  }
  getEmploi(id:number){
    return this.http.get(environment.backendUrl+"/emplois",{params:{annee_id:id}})
  }
  supprimerEmploi(id: number){
    return this.http.delete(environment.backendUrl+"/emplois/"+id)
  }
  getEmploiById(id: number){
    return this.http.get(environment.backendUrl+"/emplois/"+id)

  } 
  modifierEmploi(id: number, data:Emploi<Seance>){
    return this.http.put(environment.backendUrl+"/emplois/"+id,data)
    
  }

  getEmploiByGroupeId(GroupeId: number){
    return this.http.get(environment.backendUrl+"/getEmploiByGroupeId/"+GroupeId)

  } 
  //retourne tous les seances d'une annee
getSeances(anneeId:number){
  return this.http.get(environment.backendUrl+"/seances/"+anneeId)
}
  
 


}
