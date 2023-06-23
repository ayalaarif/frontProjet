import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Niveau } from '../models/niveau.model';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor( private http: HttpClient) { }

  ajouterNiveau(data: Niveau) {
    return this.http.post(environment.backendUrl + "/niveau", data)
  }

  getNiveau(){
    return this.http.get(environment.backendUrl+"/listNiveaux")
  }

  supprimerNiveau(id: number){
    return this.http.delete(environment.backendUrl+"/niveau/"+id)
  }

  getNiveauById(id: number){
    return this.http.get(environment.backendUrl+"/niveau/"+id)

  }

  modifierNiveau(id: number, data:Niveau){
    return this.http.put(environment.backendUrl+"/niveau/"+id,data)
    
  }
  supprimerMatiere(data:any){
    return this.http.post(environment.backendUrl + "/deleteMatiereNiveau", data)
  
  
  }
}
