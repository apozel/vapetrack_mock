import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PeriodsService } from "./periods.service";
import { Ecig, EcigActive } from "../../model/ecig";
import { EcigActivityInterface } from "../interface/ecig-activity";
import { EcigMockService } from "./ecig-mock.service";
import { EcigEvolutionService } from "./ecig-evolution.service";
import { EcigHttpService } from "./ecig-http.service";

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

  getRandomDataMoment() {
    var date = Date.now();
    this.data.push(this.generateUserActivityRandomData(date));
  }

  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private generateUserActivityRandomData(date): EcigActive {
    return {
      date,
      power: this.ecig.power.value,
      resistor: this.ecig.resistor.value,
      duration: this.getRandom(20),
    };
  }

  sendData() {
    this.ecigEvolutionService.pushEcigEvolutionData(this.data);
    this.ecigHttp.send({ ...this.data });
    this.data = [];
  }

  private getDataWeek(): EcigActive[] {
    return this.periods.getWeeks().map((week) => {
      return this.generateUserActivityRandomData(week);
    });
  }

  private getDataMonth(): EcigActive[] {
    const currentDate = new Date();
    const days = currentDate.getDate();
    const month = this.periods.getMonths()[currentDate.getMonth()];

    return Array.from(Array(days)).map((_, index) => {
      const date = `${index + 1} ${month}`;

      return this.generateUserActivityRandomData(date);
    });
  }

  private getDataYear(): EcigActive[] {
    return this.periods.getYears().map((year) => {
      return this.generateUserActivityRandomData(year);
    });
  }
}
