import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Ecig, Power, Resistor } from "../../model/ecig";
import { EcigMockInterface } from "../interface/ecig-mock";

@Injectable()
export class EcigMockService extends EcigMockInterface {
  private ecig: Ecig = {
    power: {
      min: 0,
      max: 100,
      value: 35,
    },
    resistor: {
      min: 0.1,
      max: 3,
      value: 0.3,
    },
    turnOn: false,
  };
  getEcigConfig(): Observable<Ecig> {
    return of(this.ecig);
  }
}
