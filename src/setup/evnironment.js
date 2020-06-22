const env = process.env.NODE_ENV || "development";

export const settings = {
  name: "development environment",
  version: "1.0.0",
  port: 3000,
  env: "dev",
  baseUrl: "http://localhost",
  clientUrl: "http://www.mocky.io/v2/5808862710000087232b75ac",
  policyUrl: "http://www.mocky.io/v2/580891a4100000e8242b75c5",
  tokenUrl: "http://localhost:3000/token"
};

if (env === "production") {
  settings.env = "prod";
  settings.port = 80;
}
