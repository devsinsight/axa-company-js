import "reflect-metadata";
import { expect } from "chai";
import * as sinon from "sinon";
import { ClientService } from "../../src/services/client.service";
import { ClientRepository } from "../../src/repository/client.repository";
import { PolicyRepository } from "../../src/repository/policy.repository";
import { stubClient, stubPolicies } from "../mockData.test";
import { ClientController } from "../../src/controllers/client.controller";
import * as mocks from "node-mocks-http";

describe("ClientController", function() {
  const clientController = new ClientController(
    new ClientService(new ClientRepository(), new PolicyRepository())
  );

  describe("getClientInfoById", function() {
    it("should retrieve a client with specific id", async function() {
      const stub = sinon
        .stub(ClientController.prototype, "getClientInfoById")
        .resolves(stubClient);

      const req = mocks.createRequest({ query: { id: stubClient.id } });
      const client = await clientController.getClientInfoById(req);

      expect(stub.calledOnce).to.be.true;
      expect(client.id).to.equal(stubClient.id);
      expect(client.name).to.equal(stubClient.name);
      expect(client.email).to.equal(stubClient.email);
      expect(client.role).to.equal(stubClient.role);
    });
  });

  describe("getClientInfoByUsername", function() {
    it("should retrieve a client with specific username", async function() {
      const stub = sinon
        .stub(ClientController.prototype, "getClientInfoByUsername")
        .resolves(stubClient);
      const req = mocks.createRequest({ query: { id: stubClient.name } });
      const client = await clientController.getClientInfoByUsername(req);

      expect(stub.calledOnce).to.be.true;
      expect(client.id).to.equal(stubClient.id);
      expect(client.name).to.equal(stubClient.name);
      expect(client.email).to.equal(stubClient.email);
      expect(client.role).to.equal(stubClient.role);
    });
  });

  describe("getPoliciesByClientId", function() {
    it("should retrieve the policies with specific client id", async function() {
      const stub = sinon
        .stub(ClientController.prototype, "getPoliciesByClientId")
        .resolves(stubPolicies);
      const req = mocks.createRequest({ query: { id: stubClient.id } });
      const policies = await clientController.getPoliciesByClientId(req);

      expect(stub.calledOnce).to.be.true;
      expect(policies.length).to.equal(3);

      expect(policies[0].id).to.equal(stubPolicies[0].id);
      expect(policies[0].email).to.equal(stubPolicies[0].email);
      expect(policies[0].clientId).to.equal(stubPolicies[0].clientId);
      expect(policies[0].amountInsurance).to.equal(
        stubPolicies[0].amountInsurance
      );
      expect(policies[0].installmentPayment).to.equal(
        stubPolicies[0].installmentPayment
      );
    });
  });
  describe("getPoliciesByUsername", function() {
    it("should retrieve the policies with specific client username", async function() {
      const stub = sinon
        .stub(ClientController.prototype, "getPoliciesByUsername")
        .resolves(stubPolicies);
      const req = mocks.createRequest({ query: { id: stubClient.name } });
      const policies = await clientController.getPoliciesByUsername(req);

      expect(stub.calledOnce).to.be.true;
      expect(policies.length).to.equal(3);

      expect(policies[0].id).to.equal(stubPolicies[0].id);
      expect(policies[0].email).to.equal(stubPolicies[0].email);
      expect(policies[0].clientId).to.equal(stubPolicies[0].clientId);
      expect(policies[0].amountInsurance).to.equal(
        stubPolicies[0].amountInsurance
      );
      expect(policies[0].installmentPayment).to.equal(
        stubPolicies[0].installmentPayment
      );
    });
  });
});
