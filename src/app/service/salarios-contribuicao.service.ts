import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalarioContribuicao } from '../model/salarioContribuicao.model';
import { Environments } from '../config/environments';

@Injectable({
  providedIn: 'root'
})
export class SalariosContribuicaoService {

  constructor(private httpClient : HttpClient) { }
  insert(salario : SalarioContribuicao):Observable<any>{
    return  this.httpClient.post(Environments.BASE_URL+'/salario-base', salario,
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  update(salario : SalarioContribuicao, id : string):Observable<any>{
    return this.httpClient.put(Environments.BASE_URL+'/salario-base/'+id, salario,
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  delete(id : string):Observable<any>{
    return this.httpClient.delete(Environments.BASE_URL+`/salario-base/${id}`,
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  get(id : number):Observable<any>{
    return  this.httpClient.get(Environments.BASE_URL+'/salario-base/'+id,
    {
      observe: 'response',
      responseType: 'json'
    })


  }

  getAll():Observable<any>{
    return this.httpClient.get(Environments.BASE_URL+'/salario-base/all',
    {
      observe: 'response',
      responseType: 'json'
    })
  }

  getContribuicoes(idContribuinte : number):Observable<any>{
    return  this.httpClient.get(Environments.BASE_URL+'/salario-base/all/calculo/'+idContribuinte,
    {
      observe: 'response',
      responseType: 'json'
    })


  }
}
