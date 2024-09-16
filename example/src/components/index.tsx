import { useRouter } from 'next/router';
import React, { CSSProperties, memo, useEffect, useState, useRef } from 'react';

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
    const timeoutRef = useRef<NodeJS.Timeout>();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleRouteChange = (
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
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowLoading(true);
        }, animateAfter);
      }
    };

    const handleRouteChangeEnd = () => {
      clearTimeout(timeoutRef.current);
      setShowLoading(false);
      setCurrentLoadingComponent(null);
    };

    useEffect(() => {
      const handleRouteChangeStart = (
        url: string,
        { shallow }: { shallow: boolean }
      ) => {
        handleRouteChange(url, { shallow });
      };

      if (global) {
        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeEnd);
        router.events.on('routeChangeError', handleRouteChangeEnd);
      } else {
        const container = containerRef.current;
        if (container) {
          const links = container.getElementsByTagName('a');
          Array.from(links).forEach((link) => {
            link.addEventListener('click', (e) => {
              const href = link.getAttribute('href');
              if (href) {
                e.preventDefault();
                handleRouteChange(href, { shallow: false });
                router
                  .push(href)
                  .then(handleRouteChangeEnd)
                  .catch(handleRouteChangeEnd);
              }
            });
          });
        }
      }

      return () => {
        if (global) {
          router.events.off('routeChangeStart', handleRouteChangeStart);
          router.events.off('routeChangeComplete', handleRouteChangeEnd);
          router.events.off('routeChangeError', handleRouteChangeEnd);
        }
        clearTimeout(timeoutRef.current);
      };
    }, [
      loadingComponent,
      animateAfter,
      router,
      shallowRouting,
      disableSameURL,
      global,
    ]);

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
        ref={containerRef}
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
