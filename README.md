### @rain-cafe/logger

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![CI Build][github-actions-image]][github-actions-url]
[![Maintainability][maintainability-image]][maintainability-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]
[![Code Style: Prettier][code-style-image]][code-style-url]

A simple logger for all Rainbow Cafe Apps & Libraries

### Usage

```tsx
import { Logger, LogLevel } from '@rain-cafe/logger';

Logger.setLevel(LogLevel.INFO); // This is the default LogLevel

Logger.silly('hello', 'world!'); // Outputs nothing since its lower then the configured level!
Logger.info('hello', 'world!'); // '[info]:  hello world!'
Logger.warn('hello', 'world!'); // '[warn]:  hello world!'
Logger.error('hello', 'world!'); // '[error]: hello world!'
```

[npm-version-image]: https://img.shields.io/npm/v/@rain-cafe/logger.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/@rain-cafe/logger.svg
[npm-url]: https://npmjs.org/package/@rain-cafe/logger
[github-actions-image]: https://img.shields.io/github/actions/workflow/status/rain-cafe/logger/ci.yml?event=push
[github-actions-url]: https://github.com/rain-cafe/logger/actions/workflows/ci.yml?query=branch%3Amain
[coveralls-image]: https://img.shields.io/coveralls/rain-cafe/logger.svg
[coveralls-url]: https://coveralls.io/github/rain-cafe/logger?branch=main
[code-style-image]: https://img.shields.io/badge/code%20style-prettier-ff69b4.svg
[code-style-url]: https://prettier.io
[maintainability-image]: https://img.shields.io/codeclimate/maintainability/rain-cafe/refreshly
[maintainability-url]: https://codeclimate.com/github/rain-cafe/refreshly/maintainability
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079
