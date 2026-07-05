// File: lib/sanitizer.js
/**
 * Sanitizer Module
 * 
 * Data sanitization and validation component that cleans input data and handles
 * malicious patterns using standard JavaScript APIs without external dependencies.
 */

/**
 * Sanitizer validates and cleans input data
 * 
 * @class Sanitizer
 */
class Sanitizer {
  /**
   * Creates a new Sanitizer instance
   * 
   * Initializes malicious pattern detection for XSS and SQL injection
   */
  constructor() {
    this.MAX_STRING_LENGTH = 10000;
    this.maliciousPatterns = [
      /<script[\s\S]*?>[\s\S]*?<\/script>/gi,  // XSS: script tags
      /javascript:/gi,                          // XSS: javascript protocol
      /on\w+\s*=/gi,                           // XSS: event handlers
      /('|"|;|\s)(OR|AND)\s+.*?=/gi,           // SQL injection patterns
      /UNION\s+SELECT/gi,                      // SQL injection: UNION
      /DROP\s+TABLE/gi                         // SQL injection: DROP
    ];
  }

  /**
   * Sanitizes input data by validating type, cleaning content, and handling malicious patterns
   * 
   * @param {string|number|boolean|object|Array|null|undefined} data - The data to sanitize
   * @returns {string|number|boolean|object|Array} The sanitized data where null and undefined are converted to empty string, strings are trimmed and checked for malicious patterns, and other types are preserved
   * @throws {Error} If data type is not string, number, boolean, object, Array, null, or undefined
   * @throws {Error} If string length exceeds 10000 characters
   * @throws {Error} If malicious patterns are detected in string data
   */
  sanitize(data) {
    // Handle null and undefined
    if (data === null || data === undefined) {
      return '';
    }

    const dataType = typeof data;

    // Validate accepted types
    if (dataType !== 'string' && dataType !== 'number' && dataType !== 'boolean' && 
        dataType !== 'object') {
      throw new Error(`Unsupported data type: ${dataType}. Only string, number, boolean, object, Array, null, and undefined are accepted.`);
    }

    // Handle string sanitization
    if (dataType === 'string') {
      // Check string length
      if (data.length > this.MAX_STRING_LENGTH) {
        throw new Error(`String length ${data.length} exceeds maximum allowed length of ${this.MAX_STRING_LENGTH} characters`);
      }

      // Trim whitespace
      const trimmedData = data.trim();

      // Check for malicious patterns
      for (const pattern of this.maliciousPatterns) {
        if (pattern.test(trimmedData)) {
          throw new Error('Malicious pattern detected in input data');
        }
      }

      return trimmedData;
    }

    // Handle number sanitization
    if (dataType === 'number') {
      return data;
    }

    // Handle boolean sanitization
    if (dataType === 'boolean') {
      return data;
    }

    // Handle object and array sanitization
    if (Array.isArray(data)) {
      return data.map(item => this.sanitize(item));
    }

    // Handle plain objects
    const sanitizedObject = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        sanitizedObject[key] = this.sanitize(data[key]);
      }
    }
    return sanitizedObject;
  }
}

module.exports = Sanitizer;
