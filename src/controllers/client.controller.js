import { authorize } from "../setup/security.config";
import { ClientService } from "../services/client.service";

export class ClientController {
  constructor(clientService) {
    this.clientService = new ClientService();
  }

  async getClientInfoById(req, res, next) {
    
    authorize(req, res, next, ["admin", "client"]);

    res.send(await this.clientService
    .getClientById(req.query.id)
    .then(data => data || "Client was not found.")
    .catch(err => err));

    next();
  }

  async getClientInfoByUsername(req, res, next) {

    authorize(req, res, next, ["admin", "client"]);

    res.send(await this.clientService
      .getClientByUsernname(req.query.username)
      .then(data => data || "Client was not found.")
      .catch(err => err));
    next();
  }

  async getPoliciesByClientId(req, res, next) {

    authorize(req, res, next, ["admin"]);

    res.send(await this.clientService
      .getPoliciesByClientId(req.query.id)
      .then(data => data || "Policies was not found.")
      .catch(err => err));

    next();
  }

  async getPoliciesByUsername(req, res, next) {

    authorize(req, res, next, ["admin"]);

    res.send(await this.clientService
      .getPoliciesByUsername(req.query.username)
      .then(data => data || "Policies was not found.")
      .catch(err => err));

    next();
  }
}
