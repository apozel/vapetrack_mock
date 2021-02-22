import { Observable } from "rxjs";
import { Ecig } from "src/app/@core/model/ecig";

export abstract class EcigMockInterface {
  abstract getEcigConfig(): Observable<Ecig>;
}
