"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = exports.UnauthorizedError = exports.FieldValidationError = exports.ValidationError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(code, message, error) {
        super(message);
        this.code = code;
        this.error = error;
    }
    toModel() {
        return {
            code: this.code,
            message: this.message,
        };
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message) {
        super(20000, message);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends AppError {
    constructor(message, error) {
        super(30000, message, error);
    }
}
exports.ValidationError = ValidationError;
class FieldValidationError extends AppError {
    constructor(message, fields, error) {
        super(30001, message, error);
        this.fields = fields;
    }
    toModel() {
        return {
            code: this.code,
            message: this.message,
            fields: this.fields,
        };
    }
}
exports.FieldValidationError = FieldValidationError;
class UnauthorizedError extends AppError {
    constructor(error) {
        super(30002, "Unauthorized user", error);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class PermissionError extends AppError {
    constructor(error) {
        super(30003, "Permission denied", error);
    }
}
exports.PermissionError = PermissionError;
//# sourceMappingURL=errors.js.map