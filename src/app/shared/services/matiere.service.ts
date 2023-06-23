import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }

  getMatiere(){
    return this.http.get(environment.backendUrl+"/matiere")
  }

  getMatiereById(id: number){
    return this.http.get(environment.backendUrl+"/matiere/"+id)

  }
  supprimerMatiere(id: number){
    return this.http.delete(environment.backendUrl+"/matiere/"+id)
  }
  ajouterMatiere(data: any) {
    return this.http.post(environment.backendUrl + "/matiere", data)
  }
  
}
