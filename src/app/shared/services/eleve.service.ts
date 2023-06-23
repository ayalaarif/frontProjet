import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  constructor(private http: HttpClient) { }

  getEleve(id:number){
    return this.http.get(environment.backendUrl+"/eleve",{params:{annee_id:id}})
  }

  supprimerEleve(id: number){
    return this.http.delete(environment.backendUrl+"/eleve/"+id)
  }

  ajouterEleve(data: any){
    return this.http.post(environment.backendUrl+"/eleve",data)

  }
  inscrireEleve(data: any){
    return this.http.post(environment.backendUrl+"/inscrireEleve",data)

  }

  getEleveById(id: number,annee:number){
    return this.http.get(environment.backendUrl+"/showEleve/"+id,{params:{annee_id:annee}})

  }

  modifierEleve(id:number, data:any){
    return this.http.post<any>(environment.backendUrl+"/updateEleve/"+id, data)
  }

  modifierProfileEleve(id:number, data:any){
    return this.http.post<any>(environment.backendUrl+"/modifierProfileEleve/"+id, data)
  }
  getEmlpoiEleve(id: number){
    return this.http.get(environment.backendUrl+"/EmploiEleve/"+id)
  }




}
