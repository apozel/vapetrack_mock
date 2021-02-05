import { CommonModule } from "@angular/common";
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { NbAuthModule, NbPasswordAuthStrategy } from "@nebular/auth";
import { NbRoleProvider, NbSecurityModule } from "@nebular/security";
import { of as observableOf } from "rxjs";
import { passwordStrategyOption } from "src/password.auth";
import { UserData } from "./service/interface/users";
import { UserService } from "./service/impl/users.service";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import { EcigActivityService } from "./service/impl/ecig-activity.service";
import { EcigEvolutionService } from "./service/impl/ecig-evolution.service";
import { EcigMockService } from "./service/impl/ecig-mock.service";
import { EcigActivityInterface } from "./service/interface/ecig-activity";
import { EcigEvolutionInterface } from "./service/interface/ecig-evolutions";
import { EcigMockInterface } from "./service/interface/ecig-mock";
import { MockDataModule } from "./service/service.module";

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: EcigEvolutionInterface, useClass: EcigEvolutionService },
  { provide: EcigMockService, useClass: EcigMockInterface },
  { provide: EcigActivityInterface, useClass: EcigActivityService },
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
  ...NbAuthModule.forRoot({
    strategies: [NbPasswordAuthStrategy.setup(passwordStrategyOption)],
  }).providers,

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
  imports: [CommonModule],
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
