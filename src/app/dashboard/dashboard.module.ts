import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbLayoutModule,
} from "@nebular/theme";
import { NgxEchartsModule } from "ngx-echarts";

import { ThemeModule } from "../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";

import { ECommerceUserActivityComponent } from "./activity-mock/ecig-activity.component";
import { TemperatureComponent } from "./ecig-mock/ecig.component";
import { TemperatureDraggerComponent } from "./ecig-mock/ecig-dragger/ecig-dragger.component";
import { ElectricityComponent } from "./ecig-evolutions/evolution-charts.component";
import { ElectricityChartComponent } from "./ecig-evolutions/evolution-charts/evolution-chart.component";

import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    NbLayoutModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    TemperatureDraggerComponent,
    TemperatureComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    ECommerceUserActivityComponent,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
