<div align="center">
    <img src="https://github.com/woywro/next-loading-box/raw/main/logo.png?raw=true" alt="Logo" width="80" height="80">

  <h3 align="center">next-loading-box</h3>
    
  <p align="center">
  React component designed for Next.js to manage route change loading states. 
  </p>
</div>

⚠️ This component is designed for the Pages Router in Next.js. If you're using the App Router, it provides built-in support for Loading UI. For more information, refer to the Next.js documentation on Loading UI and Streaming.

## 📄 Motivation

Next.js applications using server-side rendering (SSR) can sometimes experience delays due to complex computations, data fetching, or large payloads. These delays can result in users waiting without visual feedback during page navigation, leading to a poor user experience.

<b>next-loading-box</b> addresses this issue by providing an intuitive and customizable loading wrapper that integrates seamlessly with Next.js routing.

Key benefits of using next-loading-box:

1. Simplifies loading state management
2. Eliminates the need for extensive boilerplate code
3. Allows any component to be used as a loading indicator
4. Offers configurable animation delays
5. Provides instant feedback during slow prerendering

By implementing next-loading-box, you can enhance the perceived performance of your application, keeping users engaged and informed about ongoing processes during navigation.

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

### Scoped Loader (For e.g. Spinner, Overlay, etc.)

A "scoped loader" is used for displaying loading indicators, such as spinners or overlays, within specific components of a page. Unlike a global loader, the scoped loader only affects the Link it wraps.

```tsx
import { LoadingBox } from 'next-loading-box';

const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      <LoadingBox loadingComponent={<LoadingComponent />}>
        <Link href="/slowLoadingPage">With Loader</Link>
      </LoadingBox>
      {/* Other component content */}
    </div>
  );
};

export default MyComponent;
```

### Global Loader with Multiple Loading Components (For e.g. Skeleton UI)

You can use multiple loading components based on different routes, including dynamic routes:

```tsx
// _app.tsx
import { AppProps } from 'next/app';
import { LoadingBox } from 'next-loading-box';
import BlogPostSkeleton from '../components/BlogPostSkeleton';
import ProductListSkeleton from '../components/ProductListSkeleton';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';

const loadingComponents = [
  { path: '/blogPost', component: <BlogPostSkeleton /> },
  { path: '/products', component: <ProductListSkeleton /> },
  { path: '/products/', component: <ProductDetailSkeleton /> },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingBox loadingComponent={loadingComponents} global>
      <Component {...pageProps} />
    </LoadingBox>
  );
}

export default MyApp;
```

### Global Loader with Additive Loading (For e.g. Top Loading Bar)

To add loading components to existing children instead of replacing them, use the `addToChildren` prop:

```tsx
// _app.tsx
import { AppProps } from 'next/app';
import { LoadingBox } from 'next-loading-box';
import TopLoadingBar from '../components/TopLoadingBar'; // Adjust the import path as needed

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingBox loadingComponent={<TopLoadingBar />} global addToChildren>
      <Component {...pageProps} />
    </LoadingBox>
  );
}

export default MyApp;
```

## 🔧 Props

| Prop               | Type                                          | Default | Description                                                                                                     |
| ------------------ | --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `loadingComponent` | `React.ReactNode \| LoadingComponentConfig[]` | -       | The loading component to display. Can be a single component or an array of components with path configurations. |
| `children`         | `React.ReactNode`                             | -       | The child components to wrap.                                                                                   |
| `animateAfter`     | `number`                                      | `0`     | Delay in milliseconds before showing the loading component.                                                     |
| `style`            | `CSSProperties`                               | -       | Inline styles for the wrapper element.                                                                          |
| `className`        | `string`                                      | -       | CSS class for the wrapper element.                                                                              |
| `shallowRouting`   | `boolean`                                     | `false` | Enable loading state for shallow routing.                                                                       |
| `disableSameURL`   | `boolean`                                     | `true`  | Disable loading state when navigating to the same URL.                                                          |
| `global`           | `boolean`                                     | `false` | Use as a global loader for all route changes.                                                                   |
| `addToChildren`    | `boolean`                                     | `false` | Add loading component to existing children instead of replacing them (only for global loaders).                 |

## 📄 License

next-loading-box is [MIT licensed](./LICENSE).
