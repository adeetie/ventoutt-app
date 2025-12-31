import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component - scrolls to top on route change and page refresh
 * This ensures users always see the hero section first when navigating or refreshing
 * 
 * Uses two strategies:
 * 1. useLayoutEffect for immediate scroll before paint (catches refresh/initial load)
 * 2. useEffect with pathname dependency for route changes
 */
const ScrollToTop: React.FC = () => {
    const { pathname, key } = useLocation();
    const isFirstRender = useRef(true);

    // CRITICAL: Scroll immediately on mount/refresh BEFORE browser paints
    // This runs synchronously before the DOM is painted
    useLayoutEffect(() => {
        // Force scroll to top with instant behavior (bypasses smooth scrolling)
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

        // Also set scroll position directly as fallback
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // For Safari compatibility
    }, []);

    // Handle route changes (when user navigates between pages)
    useEffect(() => {
        // Skip on first render since useLayoutEffect already handled it
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Scroll to top with instant behavior for route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname, key]);

    return null;
};

export default ScrollToTop;
