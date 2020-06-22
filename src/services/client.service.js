
import { ClientRepository } from "../repository/client.repository";
import { PolicyRepository } from "../repository/policy.repository";


export class ClientService {

  constructor() {
    this.clientRepository = new ClientRepository();
    this.policyRepository = new PolicyRepository();
  }

  async getClientById(id) {
    return await this.clientRepository.getById(id)
    .then(data => data)
    .catch(err => err);
  }

  async getClientByUsernname(username) {
    return await this.clientRepository
      .getByUsername(username)
      .then(data => data);
  }

  async getPoliciesByClientId(id) {
    return await this.policyRepository.getByClientId(id).then(data => data);
  }

  async getPoliciesByUsername(username) {
    return await this.getClientByUsernname(username).then(async client => {
      return await this.policyRepository
        .getByClientId(client.id)
        .then(data => data);
    });
  }
}
