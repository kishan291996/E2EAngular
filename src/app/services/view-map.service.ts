import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewMapService {
  
  constructor(private httpclient: HttpClient) { }

  login(payload) {
    return this.httpclient.post("http://localhost:7122/web/viewMap/loginVarify", payload);
  }
}
