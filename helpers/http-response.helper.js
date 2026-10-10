const CLIENT_ERROR_NAMES = new Set([
  'CastError',
  'ValidationError',
  'SyntaxError',
  'BSONError',
  'BSONTypeError'
]);

const SERVER_ERROR_MESSAGE = 'An error occurred, please try again!';

const caughtErrorStatus = (error) => {
  if (error && typeof error.status === 'number') {
    return error.status;
  }
  if (error && error.name && CLIENT_ERROR_NAMES.has(error.name)) {
    return 400;
  }
  return 500;
};

const sendCaughtError = (
  res,
  error,
  clientMessage = 'Invalid data!',
  serverMessage = SERVER_ERROR_MESSAGE
) => {
  const status = caughtErrorStatus(error);
  const message = status === 400 ? clientMessage : serverMessage;
  return res.status(status).json({
    code: 'error',
    message
  });
};

module.exports = {
  caughtErrorStatus,
  sendCaughtError
};
