import { Observable } from "rxjs";
import { Ecig } from "@core/model/ecig";

export abstract class EcigMockInterface {
  abstract getEcigConfig(): Observable<Ecig>;
}
