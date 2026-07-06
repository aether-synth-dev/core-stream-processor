# Contributing to Kiro PROC

Thank you for your interest in contributing to Kiro PROC. We welcome contributions from the community and appreciate your efforts to improve this project.

## Reporting Bugs

When reporting bugs, please provide the following information to help us reproduce and resolve the issue efficiently:

- **Node.js Version**: Specify the exact version of Node.js you are using (`node --version`)
- **Reproducible Example**: Include a minimal, self-contained code snippet that demonstrates the bug
- **Expected Behavior**: Describe what you expected to happen
- **Actual Behavior**: Describe what actually happened
- **Steps to Reproduce**: Provide clear, numbered steps to reproduce the issue
- **Environment Details**: Include relevant information about your operating system and any other pertinent configuration

Bug reports that lack a reproducible example or Node.js version information may be closed without investigation.

## Pull Requests

We appreciate pull requests that improve the codebase. To ensure a smooth review process, please follow these guidelines:

1. **Fork the Repository**: Create your own fork and work on a feature branch
2. **Make Your Changes**: Implement your feature or bug fix with clear, focused commits
3. **Run Tests**: Execute `node tests/test-suite.js` before submitting your pull request. **This is mandatory.** Pull requests with failing tests will not be merged.
4. **Write Clear Descriptions**: Explain what your pull request does and why the change is necessary
5. **Reference Issues**: Link to any related issues in your pull request description
6. **Keep Changes Focused**: Each pull request should address a single concern or feature
7. **Be Responsive**: Address review feedback promptly and professionally

## Coding Standards

This project adheres to strict coding standards to maintain quality and consistency:

### Zero External Dependencies Rule

**This project enforces a strict zero external dependency policy.** All functionality must be implemented using only Node.js built-in modules. This rule ensures:

- Maximum portability and minimal supply chain risk
- No dependency conflicts or version management overhead
- Reduced attack surface and improved security posture
- Faster installation and smaller package footprint

Pull requests that introduce external dependencies (beyond Node.js core modules) will be rejected without exception.

### Code Style

- Use clear, descriptive variable and function names
- Write self-documenting code with comments where necessary
- Follow consistent indentation (2 spaces)
- Keep functions focused and single-purpose
- Avoid unnecessary complexity

### Documentation

- Update relevant documentation when changing functionality
- Include JSDoc comments for public APIs
- Keep README.md accurate and up-to-date

## Code of Conduct

Be respectful, professional, and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## Questions

If you have questions about contributing, please open an issue with the "question" label, and maintainers will respond as soon as possible.

Thank you for contributing to Kiro PROC!
