import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    , private msgService : ErrorService, private fb : FormBuilder) { }

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
  formAliquota = new AliquotaImpl();

  form = this.fb.group({
    anoMes : ['',
      [Validators.required,
      Validators.pattern(/[0-9-]{7}/gm)]],
    faixasAliquotas : this.fb.array([
      this.fb.group({ minimo : ['', Validators.required],
      maximo : ['', Validators.required],
      aliquota : ['', Validators.required]
      })
    ])});


    getFaixasAliquotas(){
      return this.form.controls.faixasAliquotas.controls;
    }

formTest(){
  console.log(this.form.get('anoMes')?.value)
  console.log(this.form.get('faixasAliquotas')?.value)
}

  faixa : FaixaAliquota = new FaixaAliquotaImpl('','','');
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
    this.form.controls.faixasAliquotas.push(
      this.fb.group({ minimo : ['', Validators.required],
      maximo : ['', Validators.required],
      aliquota : ['', Validators.required]
      })
    );

  }
  enviar(){
    this.cleanFaixasAliquotas();

    this.aliquotaService.insertAliquota(this.aliquota).subscribe(r => {
      if(r){
        console.log(r)
        this.msgService.showSucess(`Alíquota do ano-mês ${this.aliquota.anoMes} inserida com sucesso!`)
      }
      this.getAllAliquotas();
      this.form.reset();

    })
  }

  private cleanFaixasAliquotas() {
    if(this.form.valid){
      this.aliquota.anoMes = this.form.get('anoMes')?.value+'';
      let fx : FaixaAliquota[] = [];
     this.form.controls.faixasAliquotas.controls.forEach(element => {
        if(element instanceof FormGroup){
          let min = element.get('minimo')?.value+'';
          let max =element.get('maximo')?.value+'';
          let aliq = element.get('aliquota')?.value+'';

          fx.push( new FaixaAliquotaImpl(max, min, aliq));
        }
      })
      this.aliquota.faixasAliquotas = fx;
    }
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
    this.form.reset();
    this.atualizar = !this.atualizar;
    this.form.controls.faixasAliquotas.controls = this.form.controls.faixasAliquotas.controls.slice(1);
    if(this.atualizar){
      this.form.controls.anoMes.setValue(al.anoMes);
      al.faixasAliquotas.forEach(e => {
        this.form.controls.faixasAliquotas.push(
          this.fb.group({ minimo : [e.valorMinimo, Validators.required],
          maximo : [e.valorMaximo, Validators.required],
          aliquota : [e.aliquota, Validators.required]
          })
        )
      })

      this.aliquota.id = al.id;


    } else {
      this.form.reset();
    }
  }
  update(){
    this.cleanFaixasAliquotas();
    if(confirm(`Confirmar atualizar Aliquota ${this.aliquota.anoMes}?`)){
      this.aliquotaService.updateAliquota(this.aliquota).subscribe(r => {
        console.log(r)
        this.msgService.showSucess(`Aliquota ${this.aliquota.anoMes} atualizada com sucesso!`);
        this.atualizar = false;
        this.getAllAliquotas();
        this.form.reset();

      })
    }
  }
  delete(al: Aliquota){
    if(confirm(`Confirma excluir alíquota do mês ${al.anoMes}?`)){

      this.aliquotaService.deleteAliquota(al.id).subscribe(r => {
        this.msgService.showSucess(`Alíquota do mês ${al.anoMes} deletada com sucesso`)
        this.getAllAliquotas();
        this.form.reset();

      })
    }
  }
}

class FaixaAliquotaImpl implements FaixaAliquota{
  id: string = '';
  valorMinimo: string = '';
  valorMaximo: string = '';
  aliquota: string = '';
  // constructor(){}
  constructor(max : string, min : string, aliq : string){
    this.id = '';
    this.aliquota = aliq;
    this.valorMaximo = max;
    this.valorMinimo = min;
  }
}

class AliquotaImpl implements Aliquota {
  id: string = '';
  anoMes: string = '';
  faixasAliquotas: FaixaAliquota[] =  [new FaixaAliquotaImpl('', '', '')];

}
