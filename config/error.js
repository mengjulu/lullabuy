class errorResponse extends Error {
    constructor(statusCode, message, data) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  }
  
  module.exports = errorResponse;