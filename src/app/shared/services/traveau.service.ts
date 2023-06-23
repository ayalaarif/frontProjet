import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Traveau } from '../models/traveau.model';

@Injectable({
  providedIn: 'root'
})
export class TraveauService {

  constructor(private http: HttpClient) { }
  getTraveaux(id:number){
    return this.http.get(environment.backendUrl+"/afficherTraveaux/"+id)
  }
  supprimerTraveau(id: number){
    return this.http.delete(environment.backendUrl+"/Traveaux/"+id)
  }
  ajouterTraveau(data: any){
    const headers=new HttpHeaders();
    return this.http.post(environment.backendUrl+"/Traveaux", data,{headers:headers})
    
  }
  getTraveauById(id: number){
    return this.http.get(environment.backendUrl+"/Traveaux/"+id)
  }
  modifierTraveau(id: number, data:any){
    return this.http.post(environment.backendUrl+"/Traveaux/"+id, data)
  }

  getTravauxEleve(id: number){
    return this.http.get(environment.backendUrl+"/travauxEleve/"+id)
  }
}
