# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Support custom validation messages for:
  - `required(message?)`
  - `min(limit, message?)`
  - `max(limit, message?)`
  - `pattern(regex, message?)`

### Examples

```ts
required('Email is required');
min(5, 'Minimum 5 characters');
max(50, 'Maximum 50 characters');
pattern(/^[a-z]+$/, 'Lowercase letters only');
```

No breaking changes. Existing validator usage continues to work.
