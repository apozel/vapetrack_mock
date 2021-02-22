import { EcigActive } from "src/app/@core/model/ecig";

export abstract class ecigHttp {
  abstract send(payload: EcigActive[]): void;
}
