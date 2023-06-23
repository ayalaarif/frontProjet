import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Preinscription } from '../models/preinscription.model';

@Injectable({
  providedIn: 'root'
})
export class PreinscriptionService {

  constructor(private http: HttpClient) { }

  getPreinscription(id:number){
    return this.http.get(environment.backendUrl+"/preinscription",{params:{annee_id:id}})
  }

  supprimerPreinscription(id: number)
  {
    return this.http.delete(environment.backendUrl+"/preinscription/"+id)

  }

  ajouterPreinscription(data: any)
  {
    return this.http.post(environment.backendUrl+"/preinscription", data)

  }

  getPreinscriptionById(id: number)
  {
    return this.http.get(environment.backendUrl+"/preinscription/"+id)

  }

  getNiveauGroupe(id:number,annee_id:number){
    return this.http.get(environment.backendUrl+"/showNiveauGroupe/"+id,{params:{annee_id:annee_id}})
  }



}


