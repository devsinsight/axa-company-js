import "reflect-metadata";
import { expect } from "chai";
import * as sinon from "sinon";
import { ClientRepository } from "../../src/repository/client.repository";
import { stubClient } from "../mockData.test";

describe("ClientRepository", function() {
  const clientRepository = new ClientRepository();

  describe("getClientById", function() {
    it("should retrieve a client with specific id", async function() {
      const stub = sinon
        .stub(ClientRepository.prototype, "getById")
        .resolves(stubClient);

      const client = await clientRepository.getById(stubClient.id);

      expect(stub.calledOnce).to.be.true;
      expect(client.id).to.equal(stubClient.id);
      expect(client.name).to.equal(stubClient.name);
      expect(client.email).to.equal(stubClient.email);
      expect(client.role).to.equal(stubClient.role);
    });
  });

  describe("getClientByUsername", function() {
    it("should retrieve a client with specific username", async function() {
      const stub = sinon
        .stub(ClientRepository.prototype, "getByUsername")
        .resolves(stubClient);

      const client = await clientRepository.getByUsername(stubClient.name);

      expect(stub.calledOnce).to.be.true;
      expect(client.id).to.equal(stubClient.id);
      expect(client.name).to.equal(stubClient.name);
      expect(client.email).to.equal(stubClient.email);
      expect(client.role).to.equal(stubClient.role);
    });
  });
});
