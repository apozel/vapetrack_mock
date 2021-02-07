import { EcigActive } from "@core/model/ecig";

export abstract class ecigHttp {
  abstract send(payload: EcigActive[]): void;
}
