import * as _ from "underscore";
import * as crypto from "crypto";
import * as errors from "restify-errors";
import { ClientRepository } from "../repository/client.repository";

const repo = new ClientRepository();
const password = "Pass@w0rd1";

var database = {
  clients: {
    axaClient: { secret: "secret" }
  },
  tokensToUsernames: {}
};

const generateToken = (data) => {
  var random = Math.floor(Math.random() * 100001);
  var timestamp = new Date().getTime();
  var sha256 = crypto.createHmac("sha256", random + "WOO" + timestamp);

  return sha256.update(data).digest("base64");
};

export const validateClient = (credentials, req, cb) => {
  // Call back with `true` to signal that the client is valid, and `false` otherwise.
  // Call back with an error if you encounter an internal server error situation while trying to validate.
  var isValid =
    _.has(database.clients, credentials.clientId) &&
    database.clients[credentials.clientId].secret === credentials.clientSecret;
  cb(null, isValid);
};

export const grantUserToken = async (credentials, req, cb) => {
  try {
    let user = await repo.getByUsername(credentials.username).then(data => data).catch(err => console.log(err));

    console.log("user: ", user)
  
    if (!!user && credentials.password === password) {
      // If the user authenticates, generate a token for them and store it so `exports.authenticateToken` below
      // can look it up later.
  
      var token = generateToken(
        credentials.username + ":" + credentials.password
      );
      database.tokensToUsernames[token] = {
        username: credentials.username,
        role: user.role
      };
  
      // Call back with the token so Restify-OAuth2 can pass it on to the client.
      return cb(null, token);
    }


    // Call back with `false` to signal the username/password combination did not authenticate.
    // Calling back with an error would be reserved for internal server error situations.
    cb(null, false);
  } catch(e) {
    console.log(e);
  }
  
};

export const authenticateToken = (token, req, next) => {
  if (_.has(database.tokensToUsernames, token)) {
    // If the token authenticates, set the corresponding property on the request, and call back with `true`.
    // The routes can now use these properties to check if the request is authorized and authenticated.
    req.params.user = database.tokensToUsernames[token];
    return next(null, true);
  }

  // If the token does not authenticate, call back with `false` to signal that.
  // Calling back with an error would be reserved for internal server error situations.
  return next(null, false);
};

export const authorize = (req, res, next, roles) => {
  if (req.params.user && roles.indexOf(req.params.user.role) > -1)
    return next();
  else 
    return res.send(new errors.UnauthorizedError("Not Authorized."));
};
