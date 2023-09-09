import { FaixaAliquota } from "./faixa-aliquota.model";

export interface Aliquota {

  id: string;
  anoMes: string;
  faixasAliquotas : FaixaAliquota[];
}
