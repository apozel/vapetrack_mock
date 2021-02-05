import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PeriodsService } from "./periods.service";
import { EcigActive } from "../../model/ecig";
import { EcigActivityInterface } from "../interface/ecig-activity";

@Injectable()
export class EcigActivityService extends EcigActivityInterface {
  private data: EcigActive[] = [];

  getEcigActivityData(): Observable<EcigActive[]> {
    return of(this.data);
  }
  pushEcigActivityData(activity: EcigActive) {
    throw new Error("Method not implemented.");
  }

  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private generateUserActivityRandomData(date) {
    return {
      date,
      power: this.getRandom(100),
      resistor: 0.25,
      duration: this.getRandom(100),
    };
  }

  constructor(private periods: PeriodsService) {
    super();
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
