import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contribuinte } from '../model/contribuinte.model';
import { Environments } from '../config/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContribuinteService {

  constructor(private httpClient: HttpClient) { }

  insertContribuinte(contribuinte : Contribuinte):Observable<any>{
    return  this.httpClient.post(Environments.BASE_URL+'/contribuinte', contribuinte,
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  updateContribuinte(contribuinte : Contribuinte, id : string):Observable<any>{
    return this.httpClient.put(Environments.BASE_URL+'/contribuinte/'+id, contribuinte,
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  deleteContribuinte(id : string):Observable<any>{
    return this.httpClient.delete(Environments.BASE_URL+'/contribuinte/'+(+id),
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  getContribuinte(id : number):Observable<any>{
    return  this.httpClient.get(Environments.BASE_URL+'/contribuinte/'+id,
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  getAllContribuinte():Observable<any>{
    return this.httpClient.get(Environments.BASE_URL+'/contribuinte/all',
    {
      observe: 'response',
      responseType: 'json'
    })
  }
}
