import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EcigActive } from "@core/model/ecig";
import { environment } from "@environment/environment";
import { ecigHttp } from "../interface/ecig-http";

@Injectable()
export class EcigHttpService extends ecigHttp {
  endPoint: string = environment.serverApi;
  constructor(private httpclient: HttpClient) {
    super();
  }
  send(payload: EcigActive[]): void {
    console.log("send ...");
    this.httpclient
      .post(this.endPoint, { message: payload })
      .subscribe(() => console.log("finish"));
  }
}
