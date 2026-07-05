// File: lib/telemetry.js
/**
 * Telemetry Module
 * 
 * Performance metrics tracking component that monitors operation timing and duration
 * using standard Node.js APIs without external dependencies.
 */

/**
 * Telemetry tracks performance metrics for operations
 * 
 * @class Telemetry
 */
class Telemetry {
  /**
   * Creates a new Telemetry instance
   * 
   * Initializes internal storage for operation metrics
   */
  constructor() {
    this.metrics = [];
    this.activeOperations = new Map();
  }

  /**
   * Starts tracking an operation by recording its start time
   * 
   * @param {string} operationName - The name identifier for the operation being tracked
   * @throws {Error} If operationName is not a non-empty string
   */
  startOperation(operationName) {
    if (typeof operationName !== 'string' || operationName.trim() === '') {
      throw new Error('Operation name must be a non-empty string');
    }

    const startTime = Date.now();
    this.activeOperations.set(operationName, { startTime });
  }

  /**
   * Ends tracking an operation, calculates duration, and stores the metric
   * 
   * @param {string} operationName - The name identifier for the operation being tracked
   * @throws {Error} If operationName was not previously started or if operationName is invalid
   */
  endOperation(operationName) {
    if (typeof operationName !== 'string' || operationName.trim() === '') {
      throw new Error('Operation name must be a non-empty string');
    }

    const operation = this.activeOperations.get(operationName);
    
    if (!operation) {
      throw new Error(`Operation "${operationName}" was not started or has incomplete tracking`);
    }

    const endTime = Date.now();
    const durationMs = endTime - operation.startTime;

    this.metrics.push({
      operationName,
      startTime: operation.startTime,
      endTime,
      durationMs
    });

    this.activeOperations.delete(operationName);
  }

  /**
   * Retrieves all collected performance metrics
   * 
   * @returns {Array<object>} An array of metric objects where each object contains operationName (string), startTime (number), endTime (number), and durationMs (number with millisecond precision)
   */
  getMetrics() {
    return [...this.metrics];
  }
}

module.exports = Telemetry;
