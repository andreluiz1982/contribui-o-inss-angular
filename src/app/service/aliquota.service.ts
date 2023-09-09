import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aliquota } from '../model/aliquota.model';
import { Observable } from 'rxjs';
import { Environments } from '../config/environments';

@Injectable({
  providedIn: 'root'
})
export class AliquotaService {

  constructor(private httpClient : HttpClient) { }

  insertAliquota(aliquota : Aliquota): Observable<any>{
    return this.httpClient.post(Environments.BASE_URL+'/aliquota', aliquota, {
      observe: 'response',
      responseType: 'json'
    })
  }
  updateAliquota(aliquota : Aliquota): Observable<any>{
    return this.httpClient.put(Environments.BASE_URL+'/aliquota/'+aliquota.id, aliquota, {
      observe: 'response',
      responseType: 'json'
    })
  }
  deleteAliquota(id : string): Observable<any>{
    return this.httpClient.delete(Environments.BASE_URL+'/aliquota/'+id, {
      observe: 'response',
      responseType: 'json'
    })
  }
  getAliquota(id : string): Observable<any>{
    return this.httpClient.get(Environments.BASE_URL+'/aliquota/'+id, {
      observe: 'response',
      responseType: 'json'
    })
  }
  getAllAliquota(): Observable<any>{
    return this.httpClient.get(Environments.BASE_URL+'/aliquota/all', {
      observe: 'response',
      responseType: 'json'
    })
  }
}
