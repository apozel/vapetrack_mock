import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbMediaBreakpointsService, NbThemeService } from "@nebular/theme";
import { map, takeWhile } from "rxjs/operators";
import { EcigActive } from "src/app/@core/model/ecig";
import { EcigActivityService } from "src/app/@core/service/impl/ecig-activity.service";
import { EcigActivityInterface } from "src/app/@core/service/interface/ecig-activity";

@Component({
  selector: "ngx-ecig-activity",
  styleUrls: ["./ecig-activity.component.scss"],
  templateUrl: "./ecig-activity.component.html",
})
export class EcigActivityComponent implements OnDestroy, OnInit {
  private alive = true;

  date = new Date();

  type = 0.2;
  types = [0.2, 0.5, 1, 2, 3];
  currentTheme: string;
  actionSize = "medium";

  ecigActive: EcigActive[] = [];

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private ecigActivityService: EcigActivityService
  ) {}

  ngOnInit() {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });

    this.getEcigActivity();

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? "medium" : "small";
      });
  }

  getEcigActivity() {
    this.ecigActivityService
      .getEcigActivityData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((ecigActivityData) => (this.ecigActive = ecigActivityData));
  }

  onClickRandom() {
    this.ecigActivityService.getRandomDataMoment(this.date);
    this.date = this.addMinutes(this.date, this.type);
  }
  onClickSend() {
    this.ecigActivityService.sendData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
}
