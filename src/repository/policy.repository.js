import rp from "request-promise";
import { settings } from "../setup/evnironment";

export class PolicyRepository {
  getAll() {
    return rp(settings.policyUrl).then(data => JSON.parse(data));
  }
  getByClientId(clientId) {
    return this.getAll().then(data =>
      data.policies.filter(p => p.clientId == clientId)
    );
  }
}
