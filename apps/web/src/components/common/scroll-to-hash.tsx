import { useEffect } from "react";
import { useLocation } from "react-router";
import { useHeaderHeight, scrollToElement } from "~/utils/scroll";

export const ScrollToHash = () => {
    const { hash } = useLocation();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
      if (hash) {
        const id = hash.replace('#', '');
        
        // First scroll immediately to approximate position
        scrollToElement(id, headerHeight);
        
        // Then adjust after a small delay to ensure accurate positioning
        setTimeout(() => scrollToElement(id, headerHeight), 100);
      }
    }, [hash, headerHeight]);

    return null;
};