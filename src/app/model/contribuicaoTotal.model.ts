import { Contribuicao } from "./contribuicao.model";
import { Contribuinte } from "./contribuinte.model";

export interface ContribuicaoTotal {
  contribuicaoMensal : Contribuicao[];
  contribuinte : Contribuinte;
  totalDevido: string;
}
