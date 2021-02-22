import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { Ecig, Power, Resistor } from "src/app/@core/model/ecig";
import { EcigMockService } from "src/app/@core/service/impl/ecig-mock.service";

@Component({
  selector: "ngx-ecig",
  styleUrls: ["./ecig.component.scss"],
  templateUrl: "./ecig.component.html",
})
export class EcigMockComponent implements OnDestroy {
  private alive = true;

  ecigData: Ecig;
  power: Power;
  resistor: Resistor;
  ecigOff = false;

  theme: any;
  themeSubscription: any;

  temperatureMode = "cool";
  humidityMode = "cool";

  constructor(
    private themeService: NbThemeService,
    private ecigMockService: EcigMockService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {
        this.theme = config.variables.temperature;
      });

    this.ecigMockService.getEcigConfig().subscribe((ecigData) => {
      this.ecigData = ecigData;
      this.power = ecigData.power;
      this.resistor = ecigData.resistor;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
