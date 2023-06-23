import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Examen } from '../models/examen.model';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http: HttpClient) { }

 

  supprimerExamen(id: number){
    return this.http.delete(environment.backendUrl+"/examen/"+id)
  }

  ajouterExamen(data: any){
    const headers=new HttpHeaders();
    return this.http.post(environment.backendUrl+"/examen", data,{headers:headers})
  }

  getExamenById(id: number){
    return this.http.get(environment.backendUrl+"/examen/"+id)
  }

  modifierExamen(id: number, data:any){
    return this.http.post(environment.backendUrl+"/examen/"+id, data)
  }

  //Remplir le table pivot examen_groupes 
  addGroupeExamen(data: any){
    return this.http.post(environment.backendUrl+"/addGroupeExamen", data)
  }


  //Retourne la liste des groupes affectés à un examen spécifique
  listExamenGroupes(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/ListGroupesExamen/"+id,{params:{annee_id:annee_id}})
  }
  //Retourne un examen spécifique avec ses groupes 
  ExamenGroupes(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/ExamenGroupes/"+id,{params:{annee_id:annee_id}})
  }

  
    //Retourne la liste des examens d'un enseignant spécifique 
  listExamenEnseignant(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/ExamenEnseignant/"+id,{params:{annee_id:annee_id}})
  }
  supprimerGroupe(data: any) {
    return this.http.post(environment.backendUrl + "/deleteGroupeExamen", data)

  }

  //Retourne les examens d'un groupe avec leurs fichiers d'énoncés et de corrections
  examensEleve(id:number){
    return this.http.get(environment.backendUrl+"/listExamensEleve/"+id)
  }

}
