import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Groupe } from '../models/groupe.model';
import { GroupeEnseignants } from '../models/groupe-enseignants.model';
@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http: HttpClient) { }

  getGroupe(id:number) {
    return this.http.get(environment.backendUrl + "/groupe",{params:{annee_id:id}})
  }

  supprimerGroupe(id: number) {
    return this.http.delete(environment.backendUrl + "/groupe/" + id)

  }

  ajouterGroupe(data: Groupe) {
    return this.http.post(environment.backendUrl + "/groupe", data)

  }

  getGroupeById(id: number) {
    return this.http.get(environment.backendUrl + "/groupe/" + id)
  }

  modifierGroupe(id: number, data: Groupe) {
    return this.http.put(environment.backendUrl + "/groupe/" + id, data)

  }
  afficherMatiereEnseignant(id: number) {
    return this.http.get(environment.backendUrl + "/afficherMatiereEnseignant/" + id)

  }
  affecterEnseignants(data: GroupeEnseignants) {
    return this.http.post(environment.backendUrl + "/addGroupeEnseignant", data)


  }
  //Retourne un groupe specifique et son niveau avec les eleves affectes a ce groupe
  afficherEleves(id: number) {
    return this.http.get(environment.backendUrl + "/afficherEleves/" + id)

  }
  afficherEnseignants(id: number) {
    return this.http.get(environment.backendUrl + "/afficherEnseignants/" + id)

  }

  supprimerEnseignant(data: any) {
    return this.http.post(environment.backendUrl + "/deleteEnseignantGroupe", data)

  }

  //Retourne les groupes et les niveaux assigner à chaque groupe d'un enseignant specifique
  listGroupe(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/listGroupes/"+ id,{params:{annee_id:annee_id}})
  }

  //Retourne les élèves d'un groupe spécifique
   listEleveByGroupeId(groupe_id: number){
    return this.http.get(environment.backendUrl+"/listEleveByGroupeId/"+ groupe_id)

  }

















}
