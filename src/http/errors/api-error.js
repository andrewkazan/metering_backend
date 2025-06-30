export class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest({ message, errors = [] }) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized() {
    return new ApiError(401, 'Not authorized');
  }

  static NotFound(message = 'Not found') {
    return new ApiError(404, message);
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }
}
