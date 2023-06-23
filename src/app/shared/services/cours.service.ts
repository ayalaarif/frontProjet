import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor( private http: HttpClient) { }
  //Retourne la liste des cours d'enseignant spécifique
  getCours(id:number){
    return this.http.get(environment.backendUrl+"/afficherCours/"+id)
  }
  //supprimer cours
  supprimerCours(id: number){
    return this.http.delete(environment.backendUrl+"/cours/"+id)
  }
  // ajouter cours
  uplooadData(data:any){
     const headers=new HttpHeaders();
    return this.http.post(environment.backendUrl+"/cours",data,{headers:headers});
  }

  //Remplir le table pivot cours_groupes
  addCoursGroupes(data: any){
    return this.http.post(environment.backendUrl+"/addCoursGroupes", data)
  }

  //Retourne un cours specifique avec ses  groupes 
  listCoursGroupes(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/CoursGroupes/"+id,{params:{annee_id:annee_id}})
  }
  supprimerGroupe(data: any) {
    return this.http.post(environment.backendUrl + "/deleteGroupeCours", data)

  }

  //Retourne les cours d'un groupe avec leurs fichiers
  coursEleve(id:number){
    return this.http.get(environment.backendUrl+"/listCoursEleve/"+id)
  }




}
