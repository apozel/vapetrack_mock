import { Observable } from "rxjs";
import { EcigActive, EcigActiveChart } from "../../model/ecig";

export abstract class EcigEvolutionInterface {
  abstract getListData(): Observable<EcigActive[]>;
  abstract getChartData(mesure: string): Observable<EcigActiveChart[]>;
  abstract pushEcigEvolutionData(activity: EcigActive[]);
}
