import { ComponenteIncidencia } from "./componenteIncidencia.model";
import { Contribuinte } from "./contribuinte.model";

export interface SalarioContribuicao {
  id: string;
  anoMes: string;
  contribuinte: Contribuinte;
  componentesIncidencia : ComponenteIncidencia[];

}
