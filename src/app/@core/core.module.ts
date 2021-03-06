import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { NbAuthModule } from "@nebular/auth";
import { NbRoleProvider, NbSecurityModule } from "@nebular/security";
import { of as observableOf } from "rxjs";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import { EcigActivityService } from "./service/impl/ecig-activity.service";
import { EcigEvolutionService } from "./service/impl/ecig-evolution.service";
import { EcigHttpService } from "./service/impl/ecig-http.service";
import { EcigMockService } from "./service/impl/ecig-mock.service";
import { UserService } from "./service/impl/users.service";
import { UserData } from "./service/interface/users";
import { MockDataModule } from "./service/service.module";

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: EcigEvolutionService, useClass: EcigEvolutionService },
  { provide: EcigMockService, useClass: EcigMockService },
  { provide: EcigActivityService, useClass: EcigActivityService },
  { provide: EcigHttpService, useClass: EcigHttpService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf("guest");
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: "*",
      },
      user: {
        parent: "guest",
        create: "*",
        edit: "*",
        remove: "*",
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
