
import { settings } from "./setup/evnironment";
import { ClientController } from "./controllers/client.controller";
import { API } from "./setup/api.config";

const api = new API();
const clientController = new ClientController();

const routes = [
   {
     path: '/client/info-by-id',
     method: 'get',
     controller: clientController.getClientInfoById.bind(clientController)
   },
   {
     path: '/client/info-by-username',
     method: 'get',
     controller: clientController.getClientInfoByUsername.bind(clientController)
   },
   {
     path: '/client/policies-by-client-id',
     method: 'get',
     controller: clientController.getPoliciesByClientId.bind(clientController)
   },
   {
     path: '/client/policies-by-client-username',
     method: 'get',
     controller: clientController.getPoliciesByUsername.bind(clientController)
   },
 ];

api.run(settings.port, routes);


