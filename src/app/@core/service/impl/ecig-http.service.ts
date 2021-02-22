import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EcigActive } from "src/app/@core/model/ecig";
import { NbToastrService } from "@nebular/theme";
import { ecigHttp } from "../interface/ecig-http";
import { NbGlobalPhysicalPosition } from "@nebular/theme";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class EcigHttpService extends ecigHttp {
  endPoint: string = environment.serverApi;
  constructor(
    private httpclient: HttpClient,
    private toastrService: NbToastrService
  ) {
    super();
  }
  send(payload: EcigActive[]): void {
    console.log("send ...");
    this.httpclient.post(this.endPoint, { payload: payload }).subscribe(
      (result) =>
        this.toastrService.show("Success", `successful request`, {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          status: "success",
        }),
      () =>
        this.toastrService.show("Error", `error in request`, {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          status: "danger",
        })
    );
  }
}
