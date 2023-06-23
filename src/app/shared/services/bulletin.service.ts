import { Injectable } from '@angular/core';
import { Bulletin } from '../models/bulletin.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  constructor(private http: HttpClient) { }
  ajouterBulletin(data: Bulletin) {
    return this.http.post(environment.backendUrl + "/bulletin", data)

  }
  getBulletins(id:number) {
    return this.http.get(environment.backendUrl + "/bulletin",{params:{annee_id:id}})
  }
  supprimerBulletin(id: number) {
    return this.http.delete(environment.backendUrl + "/bulletin/" + id)

  }
  getBulletinById(id: number){
    return this.http.get(environment.backendUrl+"/bulletin/"+id)

  }
  AfficherBulletin(id: number){
    return this.http.get(environment.backendUrl+"/AfficherBulletin/"+id)

  }
  getSessionsBulletinsAdmin(data:any){
    return this.http.get(environment.backendUrl+"/SessionBulletinAdmin/",{params:data})

  }
  getSessionsBulletins(data:any){
    return this.http.get(environment.backendUrl+"/SessionBulletin/",{params:data})

  }
  listeBulletinsEleve(id:number,annee_id:any){
    return this.http.get(environment.backendUrl+"/BulletinEleve/"+id,{params:{annee_id:annee_id}})

  }
}
