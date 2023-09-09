import { FaixaContribuicao } from "./faixaContribuicao.model";

export interface Contribuicao{

  anoMes : string;
  faixaContribuicao : FaixaContribuicao[];
  totalDevidoMes : string;
}
