const expect = require('expect');
const errorMiddleware = require('../lib/error-middleware.js');
const DBError = require('../lib/db-error.js');

const mockMongooseErrorText = {
  VALIDATION: new Error('blah blah validation failed'),
  UNIQUENESS: new Error('blah blah duplicate key'),
  NO_SUCH_ID: new Error('blah blah objectid failed'),
  UNKNOWN: new Error('text matches no other cases' ),
};

describe('error middleware', () => {

  const mockRouter = middleware => (err, req) => {
    const mockResponse = {
      statusCode: undefined,
      sent: false,
      status: function(code) { this.statusCode = code; },
      send: function() { this.sent = true; },
    };
    mockResponse.send.bind(mockResponse);
    mockResponse.status.bind(mockResponse);
    middleware(err, req, mockResponse);
    return mockResponse;
  };

  it('should respond 404 when passed a NO_SUCH_ID DBError', () => {
    const res = mockRouter(errorMiddleware)(new DBError(mockMongooseErrorText.NO_SUCH_ID), null);
    expect(res.statusCode).toEqual(404);
    expect(res.sent).toBe(true);
  });

  it('should respond 409 when passed a UNIQUENESS DBError', () => {
    const res = mockRouter(errorMiddleware)(new DBError(mockMongooseErrorText.UNIQUENESS), null);
    expect(res.statusCode).toEqual(409);
    expect(res.sent).toBe(true);
  });

  it('should respond 400 when passed a VALIDATION DBError', () => {
    const res = mockRouter(errorMiddleware)(new DBError(mockMongooseErrorText.VALIDATION), null);
    expect(res.statusCode).toEqual(400);
    expect(res.sent).toBe(true);
  });

  it('should respond 500 when passed an UNKNOWN DBError', () => {
    const res = mockRouter(errorMiddleware)(new DBError(mockMongooseErrorText.UNKNOWN), null);
    expect(res.statusCode).toEqual(500);
    expect(res.sent).toBe(true);
  });

});
