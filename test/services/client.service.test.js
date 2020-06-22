import "reflect-metadata";
import { expect } from "chai";
import * as sinon from "sinon";
import { ClientService } from "../../src/services/client.service";
import { ClientRepository } from "../../src/repository/client.repository";
import { PolicyRepository } from "../../src/repository/policy.repository";
import { stubClient, stubPolicies } from "../mockData.test";

describe("ClientService", function() {
  const clientService = new ClientService(
    new ClientRepository(),
    new PolicyRepository()
  );

  describe("getClientById", function() {
    it("should retrieve a client with specific id", async function() {
      const stub = sinon
        .stub(ClientService.prototype, "getClientById")
        .resolves(stubClient);

      const client = await clientService.getClientById(stubClient.id);

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
        .stub(ClientService.prototype, "getClientByUsernname")
        .resolves(stubClient);

      const client = await clientService.getClientByUsernname(stubClient.name);

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
        .stub(ClientService.prototype, "getPoliciesByClientId")
        .resolves(stubPolicies);

      const policies = await clientService.getPoliciesByClientId(stubClient.id);

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
        .stub(ClientService.prototype, "getPoliciesByUsername")
        .resolves(stubPolicies);

      const policies = await clientService.getPoliciesByUsername(
        stubClient.email
      );

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
