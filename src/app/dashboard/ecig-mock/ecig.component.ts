import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { forkJoin } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { Ecig } from "src/app/@core/service/interface/ecig-mock";
import {
  Temperature,
  TemperatureHumidityData,
} from "../../@core/data/temperature-humidity";

@Component({
  selector: "ngx-ecig",
  styleUrls: ["./ecig.component.scss"],
  templateUrl: "./ecig.component.html",
})
export class TemperatureComponent implements OnDestroy {
  private alive = true;

  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = "cool";

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = "heat";

  ecigData: Ecig;
  power: number;
  resistor: number;
  ecigOff = false;

  theme: any;
  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private temperatureHumidityService: TemperatureHumidityData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {
        this.theme = config.variables.temperature;
      });

    forkJoin(
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData()
    ).subscribe(
      ([temperatureData, humidityData]: [Temperature, Temperature]) => {
        this.temperatureData = temperatureData;
        this.temperature = this.temperatureData.value;

        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
