import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteServicesService {

  private baseUrl = 'http://localhost:8100' //URL de la API

  constructor(private http: HttpClient) { }

  login(username: string, password:string): Observable<any> {
    const body = {username, password};
    return this.http.post(`${this.baseUrl}/login`, body);
  }

}
