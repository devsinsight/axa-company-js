
import * as rac from "./restify.config";
import * as restify from "restify";
export class API {
  constructor() {
    this.server = rac.RestifyApiConfig();
  }

  run(port, routes) {

    routes.map(({method, path, controller}) => {
      switch (method) {
        case 'get':
          this.server.get(path, controller);
          break;
        case 'post':
          this.server.post(path, controller);
          break;
      }
    });

    this.server.listen(port);
  }
}