import { useRouter } from 'next/router';
import React, { CSSProperties, memo, useEffect, useState } from 'react';

interface LoadingComponentConfig {
  path: string;
  component: React.ReactNode;
}

export interface LoadingBoxProps {
  loadingComponent: React.ReactNode | LoadingComponentConfig[];
  children?: React.ReactNode;
  animateAfter?: number;
  style?: CSSProperties;
  className?: string;
  shallowRouting?: boolean;
  disableSameURL?: boolean;
  global?: boolean;
  addToChildren?: boolean;
}

const LoadingBox = memo(
  ({
    loadingComponent,
    children,
    animateAfter = 0,
    style,
    className,
    shallowRouting = false,
    disableSameURL = true,
    global = false,
    addToChildren = false,
  }: LoadingBoxProps) => {
    const [showLoading, setShowLoading] = useState(false);
    const [currentLoadingComponent, setCurrentLoadingComponent] =
      useState<React.ReactNode | null>(null);
    const router = useRouter();
    let timeoutId: NodeJS.Timeout;

    const matchPath = (pattern: string, path: string): boolean => {
      const patternParts = pattern.split('/');
      const pathParts = path.split('/');

      if (patternParts.length !== pathParts.length) {
        return false;
      }

      return patternParts.every((part, index) => {
        if (part === '*') return true;
        if (part.startsWith('[') && part.endsWith(']')) return true;
        return part === pathParts[index];
      });
    };

    useEffect(() => {
      const handleRouteChangeStart = (
        url: string,
        { shallow }: { shallow: boolean }
      ) => {
        const currentUrl = router.asPath;
        const isSameUrl = url === currentUrl;

        if ((disableSameURL && isSameUrl) || (shallow && !shallowRouting)) {
          return;
        }

        let componentToShow: React.ReactNode | null = null;

        if (Array.isArray(loadingComponent)) {
          const matchingConfig = loadingComponent.find((config) =>
            matchPath(config.path, url)
          );
          if (matchingConfig) {
            componentToShow = matchingConfig.component;
          }
        } else {
          componentToShow = loadingComponent;
        }

        if (componentToShow) {
          setCurrentLoadingComponent(componentToShow);
          timeoutId = setTimeout(() => {
            setShowLoading(true);
          }, animateAfter);
        }
      };

      const handleRouteChangeComplete = () => {
        clearTimeout(timeoutId);
        setShowLoading(false);
        setCurrentLoadingComponent(null);
      };

      const handleRouteChangeError = (err: Error) => {
        clearTimeout(timeoutId);
        setShowLoading(false);
        setCurrentLoadingComponent(null);
      };

      if (global) {
        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);
      }

      return () => {
        if (global) {
          router.events.off('routeChangeStart', handleRouteChangeStart);
          router.events.off('routeChangeComplete', handleRouteChangeComplete);
          router.events.off('routeChangeError', handleRouteChangeError);
        }
        clearTimeout(timeoutId);
      };
    }, [
      loadingComponent,
      animateAfter,
      router,
      shallowRouting,
      disableSameURL,
      global,
    ]);

    if (global) {
      if (addToChildren) {
        return (
          <>
            {children}
            {showLoading && currentLoadingComponent}
          </>
        );
      }
      return showLoading && currentLoadingComponent ? (
        <>{currentLoadingComponent}</>
      ) : (
        <>{children}</>
      );
    }

    return (
      <div
        style={{ position: 'relative', ...style }}
        className={className}
        id="loading-box"
      >
        {showLoading && currentLoadingComponent}
        {children}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps?.shallowRouting === nextProps?.shallowRouting &&
      prevProps?.disableSameURL === nextProps?.disableSameURL &&
      prevProps?.global === nextProps?.global &&
      prevProps?.addToChildren === nextProps?.addToChildren &&
      prevProps?.children === nextProps?.children
    );
  }
);

LoadingBox.displayName = 'LoadingBox';

export { LoadingBox };
