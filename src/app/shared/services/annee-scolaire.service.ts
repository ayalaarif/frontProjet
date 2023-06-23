import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnneeScolaire } from '../models/annee-scolaire.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeScolaireService {
  // private anneeScolaire=new BehaviorSubject<number>(0)
  // currentAnneeScolaire=this.anneeScolaire.asObservable();

  
    

  constructor(private http: HttpClient) { }
  //  changeAnneeScolaire(annee_id:number){
  //    this.anneeScolaire.next(annee_id)
  //  }
  
  ajouterAnneeScolaire(data: AnneeScolaire) {
    return this.http.post(environment.backendUrl + "/annee", data)
  }
  getAnnees(){
    return this.http.get(environment.backendUrl+"/annee")
  }

  supprimerAnnee(id: number){
    return this.http.delete(environment.backendUrl+"/annee/"+id)
  }
  getAnneeById(id: number){
    return this.http.get(environment.backendUrl+"/annee/"+id)

  }
  getlastyear(){
    return this.http.get(environment.backendUrl+"/lastyear")
  }
  modifierAnnee(id: number, data:AnneeScolaire){
    return this.http.put(environment.backendUrl+"/annee/"+id,data)
    
  }
}
