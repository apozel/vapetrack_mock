import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Ecig, EcigActive } from "../../model/ecig";
import { EcigActivityInterface } from "../interface/ecig-activity";
import { EcigEvolutionService } from "./ecig-evolution.service";
import { EcigHttpService } from "./ecig-http.service";
import { EcigMockService } from "./ecig-mock.service";
import { PeriodsService } from "./periods.service";

@Injectable()
export class EcigActivityService extends EcigActivityInterface {
  private data: EcigActive[] = [];
  private ecig: Ecig;

  constructor(
    private periods: PeriodsService,
    private ecigMockService: EcigMockService,
    private ecigEvolutionService: EcigEvolutionService,
    private ecigHttp: EcigHttpService
  ) {
    super();
    this.ecigMockService
      .getEcigConfig()
      .subscribe((config) => (this.ecig = config));
  }

  getEcigActivityData(): Observable<EcigActive[]> {
    return of(this.data);
  }
  pushEcigActivityData(activity: EcigActive) {
    this.data.push(activity);
  }

  getRandomDataMoment(date: Date) {
    this.data.push(this.generateUserActivityRandomData(date.valueOf()));
  }

  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private generateUserActivityRandomData(date: number): EcigActive {
    return {
      date: date,
      power: this.ecig.power.value,
      resistor: this.ecig.resistor.value,
      duration: this.getRandom(20),
    };
  }

  sendData() {
    this.ecigEvolutionService.pushEcigEvolutionData(this.data);
    this.ecigHttp.send({ ...this.data });
    this.data.splice(0, this.data.length);
  }
}
