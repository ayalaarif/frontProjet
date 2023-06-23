import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(private http:HttpClient ) { }
  

  
  public downloadFile(id: number){
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(environment.backendUrl+"/downloadFile/"+id,httpOptions)
  }
//   public downloadFile(id: number):Observable<Blob> {   
// //const options = { responseType: 'blob' }; there is no use of this
   
//     // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
//     return this.http.get(environment.backendUrl+"/downloadFile/"+id, { responseType: 'blob' });
// }
public downloadFileCorrection(id: number){
  const httpOptions = {
    responseType: 'blob' as 'json'
  };
  return this.http.get(environment.backendUrl+"/downloadFileCorrection/"+id,httpOptions)
}
}
