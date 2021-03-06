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
  NbDatepickerModule,
} from "@nebular/theme";
import { NgxEchartsModule } from "ngx-echarts";

import { ThemeModule } from "../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";

import { EcigActivityComponent } from "./ecig-activity/ecig-activity.component";
import { EcigDraggerComponent } from "./ecig-mock/ecig-dragger/ecig-dragger.component";
import { EvolutionChartComponent } from "./ecig-evolutions/evolution-charts/evolution-chart.component";
import { EcigMockComponent } from "./ecig-mock/ecig.component";
import { EvolutionsComponent } from "./ecig-evolutions/evolution-charts.component";

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
    NbDatepickerModule,
  ],
  declarations: [
    DashboardComponent,
    EcigDraggerComponent,
    EvolutionChartComponent,
    EcigActivityComponent,
    EcigMockComponent,
    EvolutionsComponent,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
