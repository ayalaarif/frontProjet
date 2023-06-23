import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Enseignant } from '../models/enseignant.model';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) { }
  getEnseignant(){
    return this.http.get(environment.backendUrl+"/enseignant")
  }

  supprimerEnseignant(id: number){
    return this.http.delete(environment.backendUrl+"/enseignant/"+id)
  }

  ajouterEnseignant(data: any){
    return this.http.post(environment.backendUrl+"/enseignant",data)
  }

  getEnseignantById(id: number){
    return this.http.get(environment.backendUrl+"/showEnseignant/"+id)
  }

  modifierEnseignant(id: number, data:any){
    return this.http.post<any>(environment.backendUrl+"/updateEnseignant/"+id, data)
  }

  getSeances(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/EmploiEnseignant/"+id,{params:{annee_id:annee_id}})
  }


}
