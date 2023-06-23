import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.model';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  ajouterEvent(data: Event){
    return this.http.post(environment.backendUrl + "/event", data)

  }

  getEvents(){
    return this.http.get(environment.backendUrl+"/event")

  }

  supprimerEvent(id: number){
    return this.http.delete(environment.backendUrl+"/event/"+id)

  }

  getEventById(id: number){
    return this.http.get(environment.backendUrl+"/event/"+id)

  }

  modifierEvent(id: number, data:Event){
    return this.http.put(environment.backendUrl+"/event/"+id,data)

  }

  listEvents(){
    return this.http.get(environment.backendUrl+"/getEvents")

  }
}
