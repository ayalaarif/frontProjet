import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Discipline } from '../models/discipline.model';
import { DisciplineEleves } from '../models/discipline-eleves.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) { }
  ListAbsencesEleves(data:any){
    return this.http.get(environment.backendUrl+"/ListAbsencesEleves",{params:data})

  }
  
  ListDates(SeanceId: number){
    return this.http.get(environment.backendUrl+"/ListsDates/"+SeanceId)

  }
  ListSeancesByGroupeId(groupeId: number,enseignantId:number){
    return this.http.get(environment.backendUrl+"/ListSeancesByGroupeId/"+groupeId+"/"+enseignantId)

  }
  ajouterAbsence(data: Discipline<DisciplineEleves>) {
    return this.http.post(environment.backendUrl + "/Discipline", data)
  }
  supprimerAbsence(id: number){
    return this.http.delete(environment.backendUrl+"/Discipline/"+id)
  }
  modifierAbsence(id: number, data:DisciplineEleves){
    return this.http.put(environment.backendUrl+"/Discipline/"+id,data)
    
  }

  AbsencesByEleveId(EleveId: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/AbsencesByEleveId/"+EleveId,{params:{annee_id:annee_id}})
  }
  
  //Retourne les élèves d'un groupe spécifique
  // listEleveAbsenceByGroupeId(groupe_id: number,seance_id:number,date:any){
  //   return this.http.get(environment.backendUrl+"/listEleveByGroupeId/"+ groupe_id,{})

  // }


}
