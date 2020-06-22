import "reflect-metadata";
import { expect } from "chai";
import * as sinon from "sinon";
import { PolicyRepository } from "../../src/repository/policy.repository";
import { stubPolicies, stubClient } from "../mockData.test";

describe("PolicyRepository", function() {
  const policyRepository = new PolicyRepository();

  describe("getByClientId", function() {
    it("should retrieve the policies with specific client id", async function() {
      const stub = sinon
        .stub(PolicyRepository.prototype, "getByClientId")
        .resolves(stubPolicies);

      const policies = await policyRepository.getByClientId(stubClient.id);

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
