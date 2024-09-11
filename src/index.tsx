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
  }: LoadingBoxProps) => {
    const [showLoading, setShowLoading] = useState(false);
    const [currentLoadingComponent, setCurrentLoadingComponent] =
      useState<React.ReactNode | null>(null);
    const router = useRouter();
    let timeoutId: NodeJS.Timeout;

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
          const matchingConfig = loadingComponent.find(
            (config): config is LoadingComponentConfig =>
              'path' in config &&
              typeof config.path === 'string' &&
              url.startsWith(config.path)
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

      const handleRouteChangeEnd = () => {
        clearTimeout(timeoutId);
        setShowLoading(false);
        setCurrentLoadingComponent(null);
      };

      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.on('routeChangeComplete', handleRouteChangeEnd);
      router.events.on('routeChangeError', handleRouteChangeEnd);

      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
        router.events.off('routeChangeComplete', handleRouteChangeEnd);
        router.events.off('routeChangeError', handleRouteChangeEnd);
        clearTimeout(timeoutId);
      };
    }, [
      loadingComponent,
      animateAfter,
      router,
      children,
      shallowRouting,
      disableSameURL,
    ]);

    if (!children) {
      return showLoading && currentLoadingComponent ? (
        <>{currentLoadingComponent}</>
      ) : null;
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
      prevProps?.disableSameURL === nextProps?.disableSameURL
    );
  }
);

LoadingBox.displayName = 'LoadingBox';

export { LoadingBox };
