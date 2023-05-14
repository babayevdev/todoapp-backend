function successResponse(data) {
  return {
    statusCode: 200,
    message: 'Success',
    data,
  };
}

function customErrorResponse(statusCode, message, data = {}) {
  return {
    statusCode,
    message,
    data,
  };
}

function badRequestResponse(message, data = {}) {
  return {
    statusCode: 400,
    message: message || 'Bad request',
    data,
  };
}

function unauthorizationResponse(message) {
  return {
    statusCode: 401,
    message: message || 'You are not authorized.',
  };
}

function forbiddenResponse(message) {
  return {
    statusCode: 403,
    message: message || 'You are not permitted to this operation.',
  };
}

function serverErrorResponse(message) {
  return {
    statusCode: 500,
    message: message || 'Server Error',
  };
};

const notFoundResponse = {
  statusCode: 404,
  message: 'Not Found.',
};

module.exports = {
  successResponse,
  customErrorResponse,
  badRequestResponse,
  unauthorizationResponse,
  forbiddenResponse,
  serverErrorResponse,
  notFoundResponse,
};