import * as faker from "faker";
import { ClientModel } from "../src/models/client.model";
import { PolicyModel } from "../src/models/policy.model";

const roles = ["admin", "user"];
export const stubClient: ClientModel = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  name: faker.name.firstName(),
  role: roles[Math.random()],
  password: undefined
};

const generateStubPolicies: () => PolicyModel = () => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  amountInsurance: Number(faker.finance.amount()),
  clientId: stubClient.id,
  inceptionDate: faker.date.past(),
  installmentPayment: faker.random.boolean()
});
export const stubPolicies = [
  generateStubPolicies(),
  generateStubPolicies(),
  generateStubPolicies()
];
