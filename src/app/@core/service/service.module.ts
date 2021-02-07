import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserService } from "./impl/users.service";
import { PeriodsService } from "./impl/periods.service";
import { LayoutService } from "./impl/layout.service";

const SERVICES = [UserService, PeriodsService, LayoutService];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [...SERVICES],
    };
  }
}
