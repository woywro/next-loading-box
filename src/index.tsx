import { useRouter } from 'next/router';
import React, { CSSProperties, memo, useEffect, useState } from 'react';

export interface LoadingBoxProps {
  loadingComponent: React.ReactNode;
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
    const [loadingElementId, setLoadingElementId] = useState<string | null>(
      null
    );
    const [showLoading, setShowLoading] = useState(false);
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

        if (loadingElementId || !children) {
          timeoutId = setTimeout(() => {
            setShowLoading(true);
          }, animateAfter);
        } else {
          setLoadingElementId('global');
          setShowLoading(true);
        }
      };

      const handleRouteChangeEnd = () => {
        clearTimeout(timeoutId);
        setLoadingElementId(null);
        setShowLoading(false);
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
      loadingElementId,
      animateAfter,
      router,
      children,
      shallowRouting,
      disableSameURL,
    ]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const elementId = target.getAttribute('id') || 'global';
      setLoadingElementId(elementId);
    };

    if (!children) {
      return showLoading ? <>{loadingComponent}</> : null;
    }

    return (
      <div
        style={{ position: 'relative', ...style }}
        className={className}
        id="loading-box"
        onClick={handleClick}
      >
        {showLoading && loadingElementId === 'loading-box' && loadingComponent}
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
