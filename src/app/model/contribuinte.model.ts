import { SalarioContribuicao } from "./salarioContribuicao.model";

export interface Contribuinte {
  id: string;
  nomeCompleto: string;
  cpf: string;
  salariosContribuicao: SalarioContribuicao[];
}
