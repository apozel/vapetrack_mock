import { NbAuthJWTToken, NbPasswordAuthStrategyOptions } from "@nebular/auth";
import { environment } from "./environments/environment";

export const passwordStrategyOption: NbPasswordAuthStrategyOptions = {
  name: "email",
  baseEndpoint: environment.serverApi,
  token: {
    class: NbAuthJWTToken,
    key: "bearer", // this parameter tells where to look for the token
  },
  login: {
    endpoint: "/auth/sign-in",
    method: "post",
    redirect: {
      success: "/home",
      failure: null, // stay on the same page
    },
  },
  register: {
    endpoint: "/auth/sign-up",
    method: "post",
    redirect: {
      success: "/auth/sign-in/",
      failure: null, // stay on the same page
    },
  },
  logout: {
    endpoint: "/auth/sign-out",
    method: "post",
    redirect: {
      success: "/auth/sign-in",
      failure: null, // stay on the same page
    },
  },
  requestPass: {
    endpoint: "/auth/request-pass",
    method: "post",
  },
  resetPass: {
    endpoint: "/auth/reset-pass",
    method: "post",
  },
};
