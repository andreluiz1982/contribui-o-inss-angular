import { FaixaAliquota } from './../../model/faixa-aliquota.model';
import { Component, OnInit } from '@angular/core';
import { Aliquota } from 'src/app/model/aliquota.model';
import { AliquotaService } from 'src/app/service/aliquota.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-aliquota',
  templateUrl: './aliquota.component.html',
  styleUrls: ['./aliquota.component.css']
})
export class AliquotaComponent implements OnInit {

  constructor(private aliquotaService : AliquotaService
    , private msgService : ErrorService) { }

  aliquota : Aliquota = {
    id: '',
    anoMes: '',
    faixasAliquotas: [
      {
        id: '',
        aliquota: '',
        valorMinimo: '',
        valorMaximo: ''
      }
    ]
  }

  faixa : FaixaAliquota = new FaixaAliquotaImpl();
  aliquotas! : Aliquota[];
  atualizar : boolean = false;


  ngOnInit(): void {
    this.getAllAliquotas();
  }

  private getAllAliquotas() {
    this.aliquotaService.getAllAliquota().subscribe(r => {
      this.aliquotas = r.body;
    });
  }

  addFaixas(){
    this.aliquota.faixasAliquotas.push(new FaixaAliquotaImpl());

  }
  enviar(){
    this.cleanFaixasAliquotas();

    this.aliquotaService.insertAliquota(this.aliquota).subscribe(r => {
      if(r){

        this.msgService.showSucess(`Alíquota do ano-mês ${this.aliquota.anoMes} inserida com sucesso!`)
      }
      this.getAllAliquotas();

    })
  }

  private cleanFaixasAliquotas() {
    this.aliquota.faixasAliquotas = this.aliquota.faixasAliquotas.filter(f => {
      if (f.aliquota != '' && f.valorMaximo != '' && f.valorMinimo != '') {
        f.aliquota = f.aliquota.replace(/,/g, '.');
        f.valorMaximo = f.valorMaximo.replace(/,/g, '.');
        f.valorMinimo = f.valorMinimo.replace(/,/g, '.');
        return f;
      } else {
        return null;
      }
    });
  }

  edit(al : Aliquota){
    this.atualizar = !this.atualizar;
    if(this.atualizar){
      this.aliquota = al;



    } else {
      this.aliquota = {
        id: '',
        anoMes: '',
        faixasAliquotas: []
      };
    }
  }
  update(){
    this.cleanFaixasAliquotas();

    if(confirm(`Confirmar atualizar Aliquota ${this.aliquota.anoMes}?`)){

      this.aliquotaService.updateAliquota(this.aliquota).subscribe(r => {
        this.msgService.showSucess(`Aliquota ${this.aliquota.anoMes} atualizada com sucesso!`);
        this.atualizar = false;
        this.getAllAliquotas();
      })
    }
  }
  delete(al: Aliquota){
    if(confirm(`Confirma excluir alíquota do mês ${al.anoMes}?`)){

      this.aliquotaService.deleteAliquota(al.id).subscribe(r => {
        this.msgService.showSucess(`Alíquota do mês ${al.anoMes} deletada com sucesso`)
        this.getAllAliquotas();
      })
    }
  }
}

class FaixaAliquotaImpl implements FaixaAliquota{
  id: string = '';
  valorMinimo: string = '';
  valorMaximo: string = '';
  aliquota: string = '';

}
