import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parent } from '../models/parent.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }

  getParent(annee_id:number){
    return this.http.get(environment.backendUrl+"/parentt",{params:{annee_id:annee_id}})
  }

  getParentById(id: number,annee_id:number){
    return this.http.get(environment.backendUrl+"/showParent/"+id,{params:{annee_id:annee_id}})
  }

  modifierParent(id: number, data:Parent){
    return this.http.put(environment.backendUrl+"/updateParent/"+id,data)
    
  }



  


}
