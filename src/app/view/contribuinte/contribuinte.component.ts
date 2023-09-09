import { Contribuinte } from './../../model/contribuinte.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SalarioContribuicao } from 'src/app/model/salarioContribuicao.model';
import { ContribuinteService } from 'src/app/service/contribuinte.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-contribuinte',
  templateUrl: './contribuinte.component.html',
  styleUrls: ['./contribuinte.component.css']
})
export class ContribuinteComponent implements OnInit {

  constructor(private service : ContribuinteService, private msgService : ErrorService) { }
  listaContribuintes : Contribuinte[] = [];

  contribuinte : Contribuinte = {
    id: '',
    cpf: '',
    nomeCompleto: '',
    salariosContribuicao: []
  };
  colunas = ['id', 'nomeCompleto', 'cpf'];

  atualizar : boolean = false;

  fc = new FormGroup<any>({

   cpf : new FormControl<string>('',[
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          Validators.pattern(/^\d{3}\.*\d{3}\.*\d{3}\-*\d{2}$/)
          ]),
   nomeCompleto: new FormControl<string>('',[
    Validators.required,
          Validators.minLength(2),

          Validators.pattern(/[A-Za-z]/gm)
   ]),

  });

  makeContribuinte(){
    this.contribuinte = {
      id: '',
      nomeCompleto: this.fc.get('nomeCompleto')?.value,
      cpf: this.fc.get('cpf')?.value,
      salariosContribuicao: []
    }
  }

  ngOnInit(): void {
    this.getAllContribuintes();
  }

  private getAllContribuintes() {
    this.service.getAllContribuinte().subscribe(r => {
      this.listaContribuintes = r.body;
      //console.log(this.listaContribuintes);
    });
  }

  insertContribuinte(){
    this.service.insertContribuinte(this.contribuinte).subscribe(r => {
      if(r){
        this.msgService.showSucess(`Contribuinte ${this.contribuinte.nomeCompleto} adicionado com sucesso`);
        location.reload();
      }
    })
  }

    edit(contrib : Contribuinte){
      this.atualizar = !this.atualizar;
      if(this.atualizar){

        this.contribuinte = contrib;
      } else {
        this.contribuinte = {
          id: '',
          cpf: '',
          nomeCompleto: '',
          salariosContribuicao: []
        };
      }
    }
    update(){
      if(confirm(`Confirmar atualizar Contribuinte ${this.contribuinte.nomeCompleto}?`)){

        this.service.updateContribuinte(this.contribuinte, this.contribuinte.id).subscribe(r => {
          this.msgService.showSucess(`Contribuinte ${this.contribuinte.nomeCompleto} atualizado com sucesso!`);
          this.atualizar = false;
          location.reload();
        })
      }
    }

    delete(c : Contribuinte){
      if(confirm(`Confirmar excluir o Contribuinte ${c.nomeCompleto}?`)){
      this.service.deleteContribuinte(c.id).subscribe(r => {


          this.msgService.showSucess(`Contribuinte ${c.nomeCompleto} deletado com sucesso!`);
          this.getAllContribuintes();
        })
      }

    }

}
