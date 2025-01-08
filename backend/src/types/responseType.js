class BaseType {
  static success(data, message = "Success", metadata = {}) {
    return {
      success: true,
      message,
      data,
      ...metadata
    };
  }

  static error(message, code = 500, errors = null) {
    return {
      success: false,
      message,
      code,
      errors
    };
  }

  static paginate(data, page, limit, total) {
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = BaseType;