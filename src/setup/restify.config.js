import * as restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import * as restifyOAuth2 from "restify-oauth2";
import * as hooks from "./security.config";
import * as restifySwaggerJsdoc from "restify-swagger-jsdoc";
import { settings } from "./evnironment";

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["*", "*"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"]
});

export function RestifyApiConfig() {

  let server = restify.createServer();
  //CORS
  server.pre(cors.preflight);
  server.pre(restify.pre.sanitizePath());
  server.use(cors.actual);

  //PLUGINS
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.bodyParser({ mapParams: false }));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.authorizationParser());
  server.use(restify.plugins.fullResponse());

  //SWAGGER
  restifySwaggerJsdoc.createSwaggerPage({
    title: "AXA Client API Documentation",
    version: "1.0.0",
    server: server,
    path: "/docs/swagger",
    apis: ["./dist/setup/swagger.yaml"],
    securityDefinitions: {
      axa_auth: {
        type: "oauth2",
        flow: "password",
        tokenUrl: settings.tokenUrl,
        scopes: {}
      }
    }
  });

  //OAUTH2
  restifyOAuth2.ropc(server, { tokenEndpoint: "/token", hooks });

  return server;
}
