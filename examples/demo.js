// File: examples/demo.js
/**
 * Demo Application for Core Stream Processor
 * 
 * Demonstrates usage examples for integrating the Core Stream Processor module
 * including instantiation, data processing, and metrics retrieval.
 */

const Processor = require('../index');

console.log('Core Stream Processor - Demo Application\n');
console.log('='.repeat(50));

// Step 1: Instantiate the Processor
// Creates a new Processor instance with initialized telemetry and sanitizer modules
console.log('\nStep 1: Instantiating Processor...');
const processor = new Processor();
console.log('✓ Processor instantiated successfully');

// Step 2: Process string data
// Processes a string input through sanitization (trimming whitespace) with telemetry tracking
console.log('\nStep 2: Processing string data...');
const stringResult = processor.process('  Hello, World!  ', 'stringProcessing');
console.log('Input: "  Hello, World!  "');
console.log('Sanitized Output:', stringResult.data);

// Step 3: Process numeric data
// Processes a numeric input which is preserved without modification
console.log('\nStep 3: Processing numeric data...');
const numberResult = processor.process(42, 'numberProcessing');
console.log('Input:', 42);
console.log('Sanitized Output:', numberResult.data);

// Step 4: Process boolean data
// Processes a boolean input which is preserved without modification
console.log('\nStep 4: Processing boolean data...');
const booleanResult = processor.process(true, 'booleanProcessing');
console.log('Input:', true);
console.log('Sanitized Output:', booleanResult.data);

// Step 5: Process null data
// Processes null input which is converted to an empty string
console.log('\nStep 5: Processing null data...');
const nullResult = processor.process(null, 'nullProcessing');
console.log('Input:', null);
console.log('Sanitized Output:', `"${nullResult.data}"`);

// Step 6: Process object data
// Processes an object with nested string values that are sanitized
console.log('\nStep 6: Processing object data...');
const objectResult = processor.process({ name: '  John Doe  ', age: 30 }, 'objectProcessing');
console.log('Input:', { name: '  John Doe  ', age: 30 });
console.log('Sanitized Output:', objectResult.data);

// Step 7: Process array data
// Processes an array with multiple elements that are individually sanitized
console.log('\nStep 7: Processing array data...');
const arrayResult = processor.process(['  item1  ', 42, null], 'arrayProcessing');
console.log('Input:', ['  item1  ', 42, null]);
console.log('Sanitized Output:', arrayResult.data);

// Step 8: Retrieve performance metrics
// Retrieves all collected telemetry metrics showing operation names, timestamps, and durations
console.log('\nStep 8: Retrieving performance metrics...');
const metrics = processor.getMetrics();
console.log(`\nCollected ${metrics.length} metrics:`);
metrics.forEach((metric, index) => {
  console.log(`\nMetric ${index + 1}:`);
  console.log(`  Operation: ${metric.operationName}`);
  console.log(`  Duration: ${metric.durationMs}ms`);
  console.log(`  Start Time: ${metric.startTime}`);
  console.log(`  End Time: ${metric.endTime}`);
});

// Step 9: Demonstrate error handling
// Attempts to process malicious input to demonstrate security validation
console.log('\nStep 9: Demonstrating error handling...');
try {
  processor.process('<script>alert("xss")</script>', 'maliciousInput');
  console.log('✗ Error: Malicious input was not detected');
} catch (error) {
  console.log('✓ Malicious pattern detected and blocked:', error.message);
}

console.log('\n' + '='.repeat(50));
console.log('Demo completed successfully!');
