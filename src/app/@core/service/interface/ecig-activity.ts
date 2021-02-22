import { Observable } from "rxjs";
import { EcigActive } from "../../model/ecig";

export abstract class EcigActivityInterface {
  abstract getEcigActivityData(): Observable<EcigActive[]>;
  abstract pushEcigActivityData(activity: EcigActive);
  abstract getRandomDataMoment(date: Date): void;
}
