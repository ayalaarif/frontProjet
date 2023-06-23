import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginVM } from '../models/viewModels/login-vm.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponseVm } from '../models/viewModels/login-response-vm.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User
  user1:any
  user2:any

  token : any
  tokenString: any
  id!:number
  id2!:number

  UserRole:any
  role:any
 A:any

  constructor(private http: HttpClient, private router: Router) { }

  login(loginVM: LoginVM): Observable<LoginResponseVm> {
    return this.http.post<LoginResponseVm>(environment.backendUrl + "/login", loginVM);

  }

  isLoggedIn() {
    return sessionStorage.getItem('token') ? true : false;
  }

  logout() {
    let a=sessionStorage.getItem('annee');
    if (a) {
      this.A= JSON.parse(a)
      
    }
    sessionStorage.clear();
    sessionStorage.setItem('annee', JSON.stringify(this.A));
    this.router.navigate(['/']);
  }

  getToken() {
    this.tokenString = sessionStorage.getItem('token');
    this.token = JSON.parse(this.tokenString);
    return this.token;
  }

  getEnseignantId(){
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.user1 = JSON.parse(userString)
      console.log("user1",this.user1)
      this.id= this.user1.enseignant.id
    }
    return this.id   
  }

  getEleveId(){
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.user2 = JSON.parse(userString)
      console.log("user2",this.user2)
      this.id2= this.user2.eleve.id
    }
    console.log("EleveId:",this.id2)
    return this.id2
  }

  getEleveGroupeId(){
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.user2 = JSON.parse(userString)
      console.log("user2",this.user2)
      this.id2= this.user2.eleve.groupes[0].id
    }
    console.log("EleveId:",this.id2)
    return this.id2
  }

  getRole(){
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.UserRole = JSON.parse(userString)
      console.log(this.UserRole)
      this.role= this.UserRole.role
    }
    return this.role
  }

  getParentId(){
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.user2 = JSON.parse(userString)
      console.log("user2",this.user2)
      this.id2= this.user2.parentt.id
    }
    console.log("ParentId:",this.id2)
    return this.id2
  }



  

}
