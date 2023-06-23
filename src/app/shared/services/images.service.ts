import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getImageEnseignant(id: number):Observable<Blob> {
    return this.http.get(environment.backendUrl+"/getImageEnseignant/"+id, {responseType: 'blob'})
    //BLOB stands for Binary Large Object  
    //Il est défini comme un bloc de données binaires stocké comme une entité unique dans un système de base de données.

  }

  getImageEleve(id: number):Observable<Blob> {
    return this.http.get(environment.backendUrl+"/getImageEleve/"+id, {responseType: 'blob'})

  }

  getImagePreinscrit(id: number):Observable<Blob> {
    return this.http.get(environment.backendUrl+"/preinscritImage/"+id, {responseType: 'blob'})

  }



}
