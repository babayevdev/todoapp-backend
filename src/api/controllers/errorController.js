const { JsonWebTokenError } = require('jsonwebtoken');
const {
  notFoundResponse,
  serverErrorResponse,
  unauthorizationResponse,
} = require('../../utils/responseHandler');

async function errorHandler(error, req, res, next) {
  console.log('error =>', error, error.statusCode)

  let response = error;

  // 1. Check if the error is an instance of JsonWebTokenError 
  // 2. Check if the error is an instance of Express error
  if (error instanceof JsonWebTokenError) {
    response = unauthorizationResponse('Invalid token.');
  } else if (error instanceof Error) {
    response = serverErrorResponse(error.message);
  }

  res.status(response.statusCode).json(response);
}

async function notFoundHandler(req, res) {
  res.json(notFoundResponse);
}

module.exports = {
  errorHandler,
  notFoundHandler,
};