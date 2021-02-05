import { Observable } from "rxjs";
import { Ecig } from "../../model/ecig";

export abstract class EcigMockInterface {
  abstract getEcigConfig(): Observable<Ecig>;
}
