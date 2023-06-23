import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(parentId: number) {
    return this.http.get<Notification[]>(environment.backendUrl + "/getNotifications/" + parentId)
  }

  openNotification(id: number){
    return this.http.put<Notification>(environment.backendUrl+"/openNotification/"+id,null)
    
  }

  sendNotification(data: Notification) {
    return this.http.post(environment.backendUrl + "/notification", data)
  }

  supprimerNotif(id: number) {
    return this.http.delete(environment.backendUrl + "/notification/" + id)

  }

}
