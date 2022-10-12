import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  retrieve(url: string, params?: any) {
    return this.httpClient.get(url, {params: params});
  }

  post(url: string, data: any) {
    return this.httpClient.post(url, data);
  }
}
