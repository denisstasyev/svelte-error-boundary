# svelte-error-boundary

[![NPM version](https://img.shields.io/npm/v/svelte-error-boundary.svg?style=flat)](https://www.npmjs.com/package/svelte-error-boundary) [![NPM downloads](https://img.shields.io/npm/dm/svelte-error-boundary.svg?style=flat)](https://www.npmjs.com/package/svelte-error-boundary) [![Svelte v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

Fix error boundary Svelte 3 problem to prevent full app crash

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
