// File: tests/test-suite.js
/**
 * Test Suite for Core Stream Processor
 * 
 * Comprehensive tests validating all functionality including instantiation,
 * data processing, telemetry, sanitization, and error handling.
 */

const assert = require('assert');
const Processor = require('../index');

/**
 * Executes all test cases and reports results
 */
function runTests() {
  console.log('Starting Core Stream Processor Test Suite...\n');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Processor Instantiation
  try {
    const processor = new Processor();
    assert.strictEqual(typeof processor, 'object', 'Processor should be an object');
    assert.strictEqual(typeof processor.process, 'function', 'Processor should have process method');
    assert.strictEqual(typeof processor.getMetrics, 'function', 'Processor should have getMetrics method');
    console.log('✓ Test 1: Processor instantiation successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 1: Processor instantiation failed -', error.message);
    failedTests++;
  }

  // Test 2: Data Processing Workflow
  try {
    const processor = new Processor();
    const result = processor.process('  test data  ', 'testOperation');
    assert.strictEqual(typeof result, 'object', 'Result should be an object');
    assert.strictEqual(result.data, 'test data', 'Sanitized data should be trimmed');
    assert.strictEqual(Array.isArray(result.metrics), true, 'Metrics should be an array');
    console.log('✓ Test 2: Data processing workflow successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 2: Data processing workflow failed -', error.message);
    failedTests++;
  }

  // Test 3: Telemetry Metric Collection
  try {
    const processor = new Processor();
    processor.process('data1', 'operation1');
    processor.process('data2', 'operation2');
    const metrics = processor.getMetrics();
    assert.strictEqual(metrics.length, 2, 'Should have 2 metrics');
    assert.strictEqual(metrics[0].operationName, 'operation1', 'First metric should be operation1');
    assert.strictEqual(typeof metrics[0].durationMs, 'number', 'Duration should be a number');
    assert.strictEqual(typeof metrics[0].startTime, 'number', 'Start time should be a number');
    assert.strictEqual(typeof metrics[0].endTime, 'number', 'End time should be a number');
    console.log('✓ Test 3: Telemetry metric collection successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 3: Telemetry metric collection failed -', error.message);
    failedTests++;
  }

  // Test 4: Data Sanitization Logic - String Trimming
  try {
    const processor = new Processor();
    const result = processor.process('  whitespace test  ', 'trimTest');
    assert.strictEqual(result.data, 'whitespace test', 'String should be trimmed');
    console.log('✓ Test 4: String sanitization (trimming) successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 4: String sanitization (trimming) failed -', error.message);
    failedTests++;
  }

  // Test 5: Data Sanitization Logic - Null Handling
  try {
    const processor = new Processor();
    const result = processor.process(null, 'nullTest');
    assert.strictEqual(result.data, '', 'Null should be converted to empty string');
    console.log('✓ Test 5: Null handling successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 5: Null handling failed -', error.message);
    failedTests++;
  }

  // Test 6: Data Sanitization Logic - Number Handling
  try {
    const processor = new Processor();
    const result = processor.process(42, 'numberTest');
    assert.strictEqual(result.data, 42, 'Number should be preserved');
    console.log('✓ Test 6: Number handling successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 6: Number handling failed -', error.message);
    failedTests++;
  }

  // Test 7: Data Sanitization Logic - Boolean Handling
  try {
    const processor = new Processor();
    const result = processor.process(true, 'boolTest');
    assert.strictEqual(result.data, true, 'Boolean should be preserved');
    console.log('✓ Test 7: Boolean handling successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 7: Boolean handling failed -', error.message);
    failedTests++;
  }

  // Test 8: Error Handling - Malicious Pattern Detection
  try {
    const processor = new Processor();
    let errorThrown = false;
    try {
      processor.process('<script>alert("xss")</script>', 'xssTest');
    } catch (error) {
      errorThrown = true;
      assert.strictEqual(error.message, 'Malicious pattern detected in input data', 'Should detect XSS pattern');
    }
    assert.strictEqual(errorThrown, true, 'Should throw error for malicious pattern');
    console.log('✓ Test 8: Malicious pattern detection successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 8: Malicious pattern detection failed -', error.message);
    failedTests++;
  }

  // Test 9: Error Handling - String Length Limit
  try {
    const processor = new Processor();
    let errorThrown = false;
    const longString = 'a'.repeat(10001);
    try {
      processor.process(longString, 'lengthTest');
    } catch (error) {
      errorThrown = true;
      assert.ok(error.message.includes('exceeds maximum allowed length'), 'Should detect length violation');
    }
    assert.strictEqual(errorThrown, true, 'Should throw error for excessive length');
    console.log('✓ Test 9: String length limit enforcement successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 9: String length limit enforcement failed -', error.message);
    failedTests++;
  }

  // Test 10: Error Handling - Unsupported Type
  try {
    const processor = new Processor();
    let errorThrown = false;
    try {
      processor.process(Symbol('test'), 'symbolTest');
    } catch (error) {
      errorThrown = true;
      assert.ok(error.message.includes('Unsupported data type'), 'Should detect unsupported type');
    }
    assert.strictEqual(errorThrown, true, 'Should throw error for unsupported type');
    console.log('✓ Test 10: Unsupported type detection successful');
    passedTests++;
  } catch (error) {
    console.log('✗ Test 10: Unsupported type detection failed -', error.message);
    failedTests++;
  }

  // Report Results
  console.log('\n' + '='.repeat(50));
  console.log(`Test Results: ${passedTests} passed, ${failedTests} failed`);
  console.log('='.repeat(50));

  if (failedTests > 0) {
    process.exit(1);
  }
}

// Execute tests
runTests();
