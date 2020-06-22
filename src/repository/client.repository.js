import rp from "request-promise";
import { settings } from "../setup/evnironment";

export class ClientRepository {
  getAll() {
    return rp(settings.clientUrl).then(data => JSON.parse(data)).catch(err => err);
  }

  getById(id) {
    return this.getAll().then(data => data.clients.find(c => c.id == id)).catch(err => err);
  }

  getByUsername(username) {
    return this.getAll().then(data =>
      data.clients.find(c => c.email == username)
    );
  }
}
