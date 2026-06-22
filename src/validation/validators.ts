import type { Validator } from './types.js';

/**
 * Validates that a value is not empty.
 *
 * - `string`: fails if empty or whitespace-only.
 * - `number`: always passes (presence of a number is sufficient).
 * - `boolean`: always passes.
 * - `null` / `undefined`: fails.
 *
 * @param message Optional custom error message.
 */
export function required<T>(message?: string): Validator<T> {
  return (value: T): string | null => {
    if (value === null || value === undefined) {
      return message ?? 'Field is required';
    }
    if (typeof value === 'string' && value.trim() === '') {
      return message ?? 'Field is required';
    }
    if (typeof value === 'boolean' && value === false) {
      return message ?? 'Field is required';
    }
    return null;
  };
}

/**
 * Validates a minimum constraint.
 *
 * - For `string` values: minimum character length.
 * - For `number` values: minimum numeric value.
 *
 * @param limit  The minimum length (string) or value (number).
 * @param message Optional custom error message.
 */
export function min(limit: number, message?: string): Validator<string | number> {
  return (value: string | number): string | null => {
    if (typeof value === 'string') {
      return value.length >= limit ? null : (message ?? `Minimum length is ${limit}`);
    }
    return value >= limit ? null : (message ?? `Minimum value is ${limit}`);
  };
}

/**
 * Validates a maximum constraint.
 *
 * - For `string` values: maximum character length.
 * - For `number` values: maximum numeric value.
 *
 * @param limit  The maximum length (string) or value (number).
 * @param message Optional custom error message.
 */
export function max(limit: number, message?: string): Validator<string | number> {
  return (value: string | number): string | null => {
    if (typeof value === 'string') {
      return value.length <= limit ? null : (message ?? `Maximum length is ${limit}`);
    }
    return value <= limit ? null : (message ?? `Maximum value is ${limit}`);
  };
}

/**
 * Validates that a string value matches a regular expression.
 *
 * @param regex   The regular expression to test against.
 * @param message Optional custom error message.
 */
export function pattern(regex: RegExp, message?: string): Validator<string> {
  return (value: string): string | null => {
    return regex.test(value)
      ? null
      : (message ?? `Value does not match pattern ${regex.toString()}`);
  };
}

/**
 * Creates a custom validator from a user-supplied function.
 *
 * The function should return `null` (valid) or an error message string (invalid).
 */
export function custom<T>(fn: (value: T) => string | null): Validator<T> {
  return fn;
}

/**
 * Validates a standard email format.
 *
 * @param message Optional custom error message.
 */
export function email(message?: string): Validator<string> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: string): string | null => {
    return emailRegex.test(value) ? null : (message ?? 'Invalid email format');
  };
}

/**
 * Validates a simple phone number format.
 *
 * @param message Optional custom error message.
 */
export function phone(message?: string): Validator<string> {
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  return (value: string): string | null => {
    return phoneRegex.test(value) ? null : (message ?? 'Invalid phone number format');
  };
}
