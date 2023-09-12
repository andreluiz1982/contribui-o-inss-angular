import { ComponenteIncidencia } from 'src/app/model/componenteIncidencia.model';
import { SalarioContribuicao } from './../../model/salarioContribuicao.model';
import { Component, OnInit } from '@angular/core';
import { Contribuinte } from 'src/app/model/contribuinte.model';
import { ContribuinteService } from 'src/app/service/contribuinte.service';
import { SalariosContribuicaoService } from 'src/app/service/salarios-contribuicao.service';
import { Contribuicao } from 'src/app/model/contribuicao.model';
import { ContribuicaoTotal } from 'src/app/model/contribuicaoTotal.model';
import { ErrorService } from 'src/app/service/error.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-salarios',
  templateUrl: './salarios.component.html',
  styleUrls: ['./salarios.component.css'],
})
export class SalariosComponent implements OnInit {
  constructor(
    private salarioService: SalariosContribuicaoService,
    private contrService: ContribuinteService,
    private msgService: ErrorService,
    private formBuilder: FormBuilder
  ) {}

  contribuintes: Contribuinte[] = [];

  contribuinteSelected: Contribuinte = new ContribuinteImpl('');

  atualizar: boolean = false;

  salario = new SalarioContribuicaoImpl();

  contribuicaoTotal: ContribuicaoTotal = new ContribuicaoTotalImpl();

  salarioForm = this.formBuilder.group(
    {
      anoMes: ['', [Validators.required, Validators.pattern(/[0-9-]{7}/gm)]],

    componentesIncidencia: this.formBuilder.array<FormGroup>([
    ]
    )}
  );
  ngOnInit(): void {
    this.makeForm();

    this.contrService.getAllContribuinte().subscribe((r) => {
      this.contribuintes = r.body;
    });

  }


    makeForm(){
      this.salarioForm = this.formBuilder.group(
        {
          anoMes: ['', [Validators.required, Validators.pattern(/[0-9-]{7}/gm)]],

        componentesIncidencia: this.formBuilder.array<FormGroup>([

        ]
        )}
      );
      this.addComponente();
    }

  getComponentesIncidencia() {
    return this.salarioForm.controls.componentesIncidencia;
  }
  addComponente() {
    this.salarioForm.controls.componentesIncidencia.push(
      this.formBuilder.group({
        valorComponente: [
          '',
          [Validators.required, Validators.pattern(/[0-9.,]+/gm)],
        ],
        descricao: [''],
      })
    );
  }

  calculaContribuicoesINSS(idContribuinte: string) {
    this.salarioService.getContribuicoes(+idContribuinte).subscribe((r) => {
      console.log(r.body)
      this.contribuicaoTotal = r.body;
      this.contribuinteSelected = this.contribuicaoTotal.contribuinte;
      // console.log(this.contribuicaoTotal)
    });
  }

  loadSalarios(cont: Contribuinte) {
    this.contribuinteSelected = cont;

    this.calculaContribuicoesINSS(cont.id);
    this.makeForm();
    // console.log(this.salarios)
  }

  enviar() {

    this.cleanComponentes();
    this.salarioService.insert(this.salario).subscribe((r) => {
      if (r) {
        this.msgService.showSucess(
          `Salário do ${this.salario.anoMes} do contribuinte ${this.salario.contribuinte.nomeCompleto} incluído com sucesso!`
        );
        this.loadSalarios(this.salario.contribuinte);
      }
      this.salarioForm.reset();
    });
  }
  private atualizaSelectedContribuinte() {
    this.contrService
      .getContribuinte(+this.contribuinteSelected.id)
      .subscribe((c) => {
        this.contribuinteSelected = c.body;
        this.calculaContribuicoesINSS(this.contribuinteSelected.id);
      });
  }

  edit(sal: SalarioContribuicao) {
    this.atualizar = !this.atualizar;
    this.salario = sal;
    if (this.atualizar) {
      this.salarioForm.reset();

      this.salarioForm.controls.anoMes.setValue(sal.anoMes);
      this.salarioForm.controls.componentesIncidencia.controls =
      this.salarioForm.controls.componentesIncidencia.controls.slice(1);

      sal.componentesIncidencia.forEach(c => {

        this.salarioForm.controls.componentesIncidencia.push(
          this.formBuilder.group({
          valorComponente: [
            c.valorComponente,
            [Validators.required, Validators.pattern(/[0-9.,]+/gm)],
          ],
          descricao: [c.descricao],
        }))
      })

    } else {
      this.salario = new SalarioContribuicaoImpl();
    }
  }
  update() {
    this.salario.contribuinte = new ContribuinteImpl(
      this.contribuinteSelected.id
    );
    this.cleanComponentes();

    // console.log(this.salario)
    if (confirm(`Confirmar atualizar Salário ${this.salario.anoMes}?`)) {
      this.salarioService
        .update(this.salario, this.salario.id)
        .subscribe((r) => {
          this.msgService.showSucess(
            `Salário ${this.salario.anoMes} atualizado com sucesso!`
          );
          this.salario = new SalarioContribuicaoImpl();
          this.atualizar = false;
          this.loadSalarios(this.salario.contribuinte);
        });
    }
  }
  delete(sal: SalarioContribuicao) {
    // console.log(sal)
    if (confirm(`Confirma excluir salário contribuição do mês ${sal.anoMes}`)) {
      this.salarioService.delete(sal.id).subscribe((r) => {
        if (r) {
          this.loadSalarios(sal.contribuinte);
        }
      });
    }
  }

  private cleanComponentes() {
    let valores: any = [];
    console.log(this.salario);

    this.salario.contribuinte.id = this.contribuinteSelected.id;
    if (this.salarioForm.valid) {
      this.salario.anoMes = this.salarioForm.get('anoMes')?.value + '';
      this.salarioForm.controls.componentesIncidencia.controls.forEach((c) => {
        let valor = c.get('valorComponente')?.value;
        let desc = c.get('descricao')?.value;
        valores.push({
          valorComponente: valor,
          descricao : desc
        });
      });

      this.salario.componentesIncidencia = valores;
      console.log(this.salario);
    } else {
      this.msgService.showError('Erro!');
    }

      this.salario.componentesIncidencia.forEach((c) => {

        c.valorComponente = c.valorComponente.replace(',', '.');
        // if (c.descricao != '' && c.valorComponente!= '') {
        //   return c;
        // } else {
        //   return null;
        // }
      });
  }
}

class ContribuinteImpl implements Contribuinte {
  id: string = '';
  nomeCompleto = '';
  cpf: string = '';
  salariosContribuicao: SalarioContribuicao[] = [];
  constructor(ident: string) {
    this.id = ident;
  }
}
class SalarioContribuicaoImpl implements SalarioContribuicao {
  id = '';
  anoMes: string = '';
  componentesIncidencia: ComponenteIncidencia[] = [
    {
      id: '',
      descricao: '',
      valorComponente: '',
    },
  ];
  contribuinte: Contribuinte = new ContribuinteImpl('');
}
class ContribuicaoTotalImpl implements ContribuicaoTotal {
  contribuicaoMensal: Contribuicao[] = [];
  contribuinte: Contribuinte = new ContribuinteImpl('');
  totalDevido: string = '';
}
