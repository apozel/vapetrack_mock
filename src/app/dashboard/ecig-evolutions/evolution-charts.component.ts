import { Component, OnDestroy } from "@angular/core";
import { EcigActive, EcigActiveChart } from "@core/model/ecig";
import { EcigEvolutionService } from "@core/service/impl/ecig-evolution.service";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-evolutions",
  styleUrls: ["./evolution-charts.component.scss"],
  templateUrl: "./evolution-charts.component.html",
})
export class EvolutionsComponent implements OnDestroy {
  private alive = true;

  listData: EcigActive[];
  chartData: EcigActiveChart[];

  type = "power";
  types = ["power", "resistor", "duration"];

  currentTheme: string;
  themeSubscription: any;

  constructor(
    private ecigEvolutionService: EcigEvolutionService,
    private themeService: NbThemeService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });

    this.ecigEvolutionService
      .getListData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((listData: EcigActive[]) => {
        this.listData = listData;
      });

    this.getDatachart(this.type);
  }

  getDatachart(type: string) {
    this.ecigEvolutionService
      .getChartData(type)
      .pipe(takeWhile(() => this.alive))
      .subscribe((chartData: EcigActiveChart[]) => {
        this.chartData = chartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
