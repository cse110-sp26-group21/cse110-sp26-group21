# ADR: Use Vitest for Unit Testing

## Status
Accepted

## Context
We need a testing framework for writing and running unit tests in our Vite-based project.

## Decision
We will use Vitest as our primary testing framework.

## Consequences
Pros:
- Integrates seamlessly with Vite
- Fast test execution with watch mode
- Jest-compatible API makes it easy to learn

Cons:
- Adds another development dependency
- Smaller ecosystem compared to Jest
