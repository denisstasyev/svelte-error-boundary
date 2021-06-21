# svelte-error-boundary

[![NPM version](https://img.shields.io/npm/v/svelte-error-boundary.svg?style=flat)](https://www.npmjs.com/package/svelte-error-boundary) [![NPM downloads](https://img.shields.io/npm/dm/svelte-error-boundary.svg?style=flat)](https://www.npmjs.com/package/svelte-error-boundary) [![Svelte v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

Partly fix error boundary Svelte 3 problem to prevent full app crash on initialization

# :warning: Warning: this package fixes only the problem with initialization errors. Runtime errors could not be handled with this approach

The key issue is that some of the built-in methods need to be wrapped in Svelte to create runtime error handling support, but there is only one pure "true" way to do this, and that is by implementing this built-in feature in Svelte.

There is another "runtime" error boundary package called [@crownframework/svelte-error-boundary](https://www.npmjs.com/package/@crownframework/svelte-error-boundary). But it also does not handle all errors due to this array of Svelte methods [GUARDED_BLOCK_FNS](https://github.com/CrownFramework/svelte-error-boundary/blob/main/src/createBoundary.js#L2), view [this issue](): "That you for reporting this. This does indeed seem to be either a bug or – more likely – a limitation of the current implementation". Another potential disadvantave of [@crownframework/svelte-error-boundary](https://www.npmjs.com/package/@crownframework/svelte-error-boundary) is too much more created `try...catch` blocks. This could affect the browser's built-in code optimizations. For example, according to this [Stack Overflow answer](https://stackoverflow.com/questions/19727905/in-javascript-is-it-expensive-to-use-try-catch-blocks-even-if-an-exception-is-n): "The problem is that V8 didn't support it in their optimizing compiler until version 6 of the engine, so the entire containing function that syntactically contains a try catch will not be optimized". And according [Wikipedia](https://en.wikipedia.org/wiki/Google_Chrome_version_history) V8 6.0 is equal to Chrome 60. The presence of a large number of `try...catch` blocks will slow down browsers younger than Chrome 60.

## :cake: Features

Right now Svelte 3 has no built-in error handling in components out of the box. To solve this issue this package was created inspired by [this thread](https://github.com/sveltejs/svelte/issues/3733).

- Simply applies Javascript `try...catch` statement to child components :lock:
- Easy to use (as traditional component)

## Install

```bash
npm i svelte-error-boundary
```

## Usage

```html
<script>
  import ErrorBoundary from 'svelte-error-boundary'

  ...
</script>

<ErrorBoundary name="custom try catch">
  <BrokenComponent />
</ErrorBoundary>
```

## API

### Parameters

| Name        | Type     | Default     | Description                 |
| ----------- | -------- | ----------- | --------------------------- |
| name        | string   | `undefined` | Custom name for error scope |
| handleError | function | `undefined` | Function to handle error    |

Function `handleError(error, name)` can be used to send error logs to server and so on.

Note that this component does not support SSR (`svelte.compile` with option: `generate: 'ssr'`) and does not support hydration (`svelte.compile` with option: `hydratable: true`).

Please use this `ErrorBoundary` component directly over the `BrokenComponent`, otherwise errors may appear outside. You can manually test the `ErrorBoundary` component by inserting `throw new Error('test')` inside your component.

## License

MIT &copy; [Denis Stasyev](https://github.com/denisstasyev)
