const errorTypes = Object.freeze({
  VALIDATION: Symbol('validation error'),
  UNIQUENESS: Symbol('uniqueness error'),
  NO_SUCH_ID: Symbol('no such id'),
  UNKNOWN: Symbol('unknown error'),
});

class DBError extends Error {

  constructor(rawError) {
    super(rawError);
    this.types = errorTypes;
    if(rawError.message.toLowerCase().includes('validation failed')) {
      this.type = this.types.VALIDATION;
    } else if(rawError.message.toLowerCase().includes('duplicate key')) {
      this.type = this.types.UNIQUENESS;
    } else if(rawError.message.toLowerCase().includes('objectid failed')) {
      this.type = this.types.NO_SUCH_ID;
    } else {
      this.type = this.types.UNKNOWN;
    }
  }


}

module.exports = DBError;
