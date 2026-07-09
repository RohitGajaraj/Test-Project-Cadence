# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Manual bank connection fallback flow as specified in spec eba796fb-b84a-43c3-a001-576dc2710dbb
- Added 'Link with account number' trigger link on the bank linking screen
- Implemented manual bank account form with fields for Account Holder Name, Routing Number, Account Number, and Account Type
- Added client-side validation for routing number format (9 digits) and required fields
- Updated .gitignore to follow GitHub's Node.gitignore standard with additional OS patterns

### Changed

- Updated bank-link-fallback.html to include the new manual bank connection functionality
- Updated .gitignore to include dist/, coverage/, logs/, and .env patterns

### Fixed

- Fixed health.json to use valid strict JSON syntax (double-quoted keys/strings)

## [0.1.0] - 2026-07-08

### Added

- Initial project setup with index.html and health.json

### Changed

- None

### Fixed

- None