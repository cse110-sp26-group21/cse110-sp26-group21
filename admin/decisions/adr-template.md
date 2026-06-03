# ADR: Use Firebase for Authentication

## Status
Accepted

## Context
We need user login, account creation, and session management.

## Decision
We will use Firebase Authentication.

## Consequences
Pros:
- Faster to implement
- Handles password security for us
- Good documentation

Cons:
- Adds dependency on Google/Firebase
- Less control than building our own auth system