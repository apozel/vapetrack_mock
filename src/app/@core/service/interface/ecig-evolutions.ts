import { Observable } from "rxjs";
import { EcigActive } from "../../model/ecig";

export abstract class EcigEvolutionInterface {
  abstract getEcigEvolutionData(period: string): Observable<EcigActive[]>;
  abstract pushEcigEvolutionData(activity: EcigActive[]);
}
