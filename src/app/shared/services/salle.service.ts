import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Salle } from '../models/salle.model';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient) { }

  ajouterSalle(data: Salle){
    return this.http.post(environment.backendUrl + "/salle", data)

  }

  getSalles(){
    return this.http.get(environment.backendUrl+"/salle")

  }

  supprimerSalle(id: number){
    return this.http.delete(environment.backendUrl+"/salle/"+id)

  }

  getSalleById(id: number){
    return this.http.get(environment.backendUrl+"/salle/"+id)

  }

  modifierSalle(id: number, data:Salle){
    return this.http.put(environment.backendUrl+"/salle/"+id,data)

  }







}
