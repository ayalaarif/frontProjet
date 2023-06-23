import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EleveGuard implements CanActivate {
  UserObject: any;
  user: any;

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = sessionStorage.getItem("user")
      this.UserObject= JSON.parse(this.user)
      
      console.log("this is "+this.UserObject.role)
      {
        if (this.UserObject.role == 'eleve') {
  
          return true;
        }
  
        else {
          alert("You don't have permission")
          this.router.navigate(['/']);
          return false;
        }
      }
  }
  
}
