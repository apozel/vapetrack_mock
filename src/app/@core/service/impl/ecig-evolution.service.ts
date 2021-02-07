import { Injectable } from "@angular/core";
import { Observable, of as observableOf } from "rxjs";
import { EcigActive, EcigActiveChart, EcigSendActive } from "@core/model/ecig";
import { EcigEvolutionInterface } from "../interface/ecig-evolutions";

@Injectable()
export class EcigEvolutionService extends EcigEvolutionInterface {
  private listData: EcigActive[] = [];

  private chartData: {
    power: EcigActiveChart[];
    resistor: EcigActiveChart[];
    duration: EcigActiveChart[];
  };

  constructor() {
    super();
    this.chartData = { power: [], resistor: [], duration: [] };
  }
  getEcigEvolutionData(period: string): Observable<EcigActive[]> {
    throw new Error("Method not implemented.");
  }
  pushEcigEvolutionData(activity: EcigActive[]) {
    activity.forEach((active) => {
      this.listData.push(active);
      this.pushActiveToChartsPoints(active);
    });
  }

  private pushActiveToChartsPoints(active: EcigActive) {
    this.chartData.duration.push({
      label: active.duration.toString(),
      value: active.duration,
    });
    this.chartData.resistor.push({
      label: active.resistor.toString(),
      value: active.resistor,
    });
    this.chartData.power.push({
      label: active.duration.toString(),
      value: active.duration,
    });
  }

  getListData(): Observable<EcigActive[]> {
    return observableOf(this.listData);
  }

  getChartData(mesure: string): Observable<EcigActiveChart[]> {
    return observableOf(this.chartData[mesure]);
  }
}
