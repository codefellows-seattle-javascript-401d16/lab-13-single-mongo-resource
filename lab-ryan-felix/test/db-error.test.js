const expect = require('expect');

const DBError = require('../lib/db-error.js');

describe('DBError', () => {

  const errorText = {
    VALIDATION: 'blah blah validation failed',
    UNIQUENESS: 'blah blah duplicate key',
    NO_SUCH_ID: 'blah blah objectid failed',
    UNKNOWN: 'blah blah this text matches no errors',
  };

  it('should return a validation error', () => {
    const testErr = new DBError(new Error(errorText.VALIDATION));
    expect(testErr.type).toEqual(testErr.types.VALIDATION);
  });

  it('should return a uniqueness error', () => {
    const testErr = new DBError(new Error(errorText.UNIQUENESS));
    expect(testErr.type).toEqual(testErr.types.UNIQUENESS);
  });

  it('should return a no-such-id error', () => {
    const testErr = new DBError(new Error(errorText.NO_SUCH_ID));
    expect(testErr.type).toEqual(testErr.types.NO_SUCH_ID);
  });

  it('should return an unknown error', () => {
    const testErr = new DBError(new Error(errorText.UNKNOWN));
    expect(testErr.type).toEqual(testErr.types.UNKNOWN);
  });

});
