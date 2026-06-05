# Changelog

All notable changes to this project will be documented here.

## [1.5.0] - 2026-06-04

### Added
- Explosion effect when an asteroid gets destroyed

### Changed
- Added a function to asteroids.js that displays effect when called from destroyAsteroid
- Added appropriate styling for the effct

## [1.4.0] - 2026-06-04

### Added
- A current session high score feature

### Changed
- modified game state to include session high score variable
- modified result screen to display session high score

## [1.3.1] - 2026-06-03

### Added
- Tutorial screen to teach new players typing mechanics
- Single asteroid that pauses at top with instruction overlay
- Continue button to unpause asteroid during tutorial
- Completion overlay that displays when asteroid is destroyed or falls off screen
- Tutorial asteroid counter (1/1) to track progress
- Dedicated tutorial button (?) on home screen
- Tutorial input field with same styling as main game

### Changed
- Tutorial reuses instruction card styling for consistency with main game

## [1.3.0] - 2026-06-03

### Added
- Difficulty level selection UI for customizing gameplay
- Ability to select difficulty before starting game
- New question schema for increased variety
- Question updates based on new format structure

### Changed
- Question bank now supports multiple difficulty levels

## [1.2.1] - 2026-05-29

### Added
- HTML and CSS code snippets for the corresponding game modes

### Fixed
- Rendered HTML code snippets as literal text in asteroids instead of parsing them as HTML

## [1.2.0] - 2026-05-27

### Added
- Frontend game loop implementation with requestAnimationFrame
- Asteroid spawning, movement, and collision logic
- Code snippet loading from JSON data by language
- Typing input detection and snippet matching
- Score calculation with location-based bonuses
- Streak tracking and streak-based score multipliers
- Game over screen with final statistics
- Longest streak tracking across game session
- Accuracy calculation for end-game stats

### Changed
- Game flow now fully operational with smooth animations
- Improved typing input handling for snippet completion

## [1.1.0] - 2026-05-21

### Added
- index.html
- style.css
- scripts
- assets

### Changed
- Skeleton of site is added

## [1.0.0] - 2026-05-19

### Added
- Initial project setup
- ESLint configuration
- GitHub Actions CI pipeline
- PR and issue templates

### Changed
- Templates in admim 