import { Injectable } from "@angular/core";
import { EcigActive, EcigActiveChart } from "../../model/ecig";
import { Observable, of as observableOf } from "rxjs";
import { EcigEvolutionInterface } from "../interface/ecig-evolutions";

interface ChartData {
  power: EcigActiveChart[];
  resistor: EcigActiveChart[];
  duration: EcigActiveChart[];
}
@Injectable()
export class EcigEvolutionService extends EcigEvolutionInterface {
  private listData: EcigActive[] = [];

  private chartData: ChartData = {
    power: [],
    resistor: [],
    duration: [],
  };

  constructor() {
    super();
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
