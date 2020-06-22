"use strict";

var restify = require("restify");
var errors = require("restify-errors");

module.exports = function makeOAuthError(
  errorClass,
  errorType,
  errorDescription
) {
  var body = { error: errorType, error_description: errorDescription };
  console.log(errorClass);
  return new errors[errorClass + "Error"]({
    message: errorDescription,
    body: body
  });
};
