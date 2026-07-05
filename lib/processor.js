// File: lib/processor.js
/**
 * Processor Class
 * 
 * The main orchestrator class that coordinates telemetry tracking and data sanitization
 * following Clean Architecture principles with clear separation of concerns.
 */

const Telemetry = require('./telemetry');
const Sanitizer = require('./sanitizer');

/**
 * Processor orchestrates the data processing pipeline with telemetry and sanitization
 * 
 * @class Processor
 */
class Processor {
  /**
   * Creates a new Processor instance
   * 
   * Initializes telemetry and sanitizer modules for coordinated data processing
   */
  constructor() {
    this.telemetry = new Telemetry();
    this.sanitizer = new Sanitizer();
  }

  /**
   * Processes data through the sanitization pipeline with telemetry tracking
   * 
   * @param {string|number|boolean|object|Array} data - The data to process
   * @param {string} operationName - The name of the operation being tracked
   * @returns {object} An object containing sanitized data and metrics
   * @throws {Error} If telemetry tracking fails or sanitization fails
   */
  process(data, operationName) {
    // Start telemetry tracking
    this.telemetry.startOperation(operationName);

    try {
      // Sanitize the data
      const sanitizedData = this.sanitizer.sanitize(data);

      // End telemetry tracking
      this.telemetry.endOperation(operationName);

      return {
        data: sanitizedData,
        metrics: this.telemetry.getMetrics()
      };
    } catch (error) {
      // Ensure telemetry is stopped even on error
      this.telemetry.endOperation(operationName);
      throw error;
    }
  }

  /**
   * Retrieves all collected telemetry metrics
   * 
   * @returns {Array<object>} An array of metric objects with operationName, startTime, endTime, and durationMs
   */
  getMetrics() {
    return this.telemetry.getMetrics();
  }
}

module.exports = Processor;
