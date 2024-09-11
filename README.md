<div align="center">
    <img src="https://github.com/woywro/next-loading-box/raw/main/logo.png?raw=true" alt="Logo" width="80" height="80">

  <h3 align="center">next-loading-box</h3>
    
  <p align="center">
  React component designed for Next.js to manage route change loading states. 
  </p>
</div>

⚠️ This is designed for Pages Router. The App Router provides built-in support for Loading UI. For more information, check out the Next.js documentation on Loading UI and Streaming.

## 📄 Motivation

In Next.js applications, server-side rendering (SSR) can sometimes be slow due to heavy computations, complex data fetching, or large payloads. These delays can leave users waiting without visual feedback while navigating between pages, leading to a poor user experience.

<b>next-link-loading-box</b> was created to solve this problem by providing an intuitive and customizable loading wrapper that seamlessly integrates with the Next.js routing.

This component simplifies managing loading states by eliminating the need for extensive boilerplate code and allowing any component to be used as a loading indicator, with configurable delays for animations. By delivering instant feedback during slow prerendering, next-link-loading-box boosts the perceived performance of your application, keeping users engaged and reassured that their interactions are being processed.

<div align="center">
  <img src="https://github.com/woywro/next-loading-box/raw/main/gif.gif?raw=true" alt="example" />
</div>

## ⚙️ Installation

Install the package using one of the following commands:

```
npm install next-loading-box

pnpm install next-loading-box

yarn add next-loading-box
```

## 🚀 Usage

### Scoped Loader (e.g., Spinner, Overlay, etc.)

A "scoped loader" is used for displaying loading indicators, such as spinners or overlays, within specific components of a page. Unlike a global loader, the scoped loader only affects the Link it wraps.

```ts
import { LoadingBox } from 'next-loading-box';

<LoadingBox
  // The delay in milliseconds before showing the loading component (e.g., 1000 = 1 second).
  // If the route changes before this time, the loading component won't be shown.
  animateAfter={1000}
  // Enables loading state for shallow routing (i.e., navigation without a full page reload).
  // Default is false.
  shallowRouting={false}
  // Disables the loading state when navigating to the same URL.
  // Note: Query parameters are considered part of the URL.
  disableSameUrl={true}
  // An object to apply inline styles directly to a wrapper element.
  style={{ width: '100%', height: '100%', display: 'flex' }}
  // Custom loading component to be displayed (e.g., overlay, spinner, progress bar, etc.).
  loadingComponent={<LoadingComponent />}
>
  <Link href="/slowLoadingPage">With Loader</Link>
</LoadingBox>;
```

### Global Loader (Displayed on Every Page Load)

If you do not pass any children to the LoadingBox, it is treated as a global loader. In the example below, a spinner is displayed in the bottom right corner of the window whenever a user loads a new page. <b>Note</b> that the style prop will not change anything here since the LoadingBox does not wrap any content.

```ts
import { LoadingBox } from 'next-loading-box';

<div className="absolute right-1 bottom-1">
  <LoadingBox loadingComponent={<LoadingSpinner />} />
</div>;
```

### Usage with Multiple Loading Components and Dynamic Routes

You can use multiple loading components based on different routes, including dynamic routes:
