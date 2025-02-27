'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  innerWidth: number | undefined;
  innerHeight: number | undefined;
  outerWidth: number | undefined;
  outerHeight: number | undefined;
  clientWidth: number | undefined;
  clientHeight: number | undefined;
  screenWidth: number | undefined;
  screenHeight: number | undefined;
  availWidth: number | undefined;
  availHeight: number | undefined;
  visualViewport: {
    width: number | undefined;
    height: number | undefined;
    scale: number | undefined;
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    innerWidth: undefined,
    innerHeight: undefined,
    outerWidth: undefined,
    outerHeight: undefined,
    clientWidth: undefined,
    clientHeight: undefined,
    screenWidth: undefined,
    screenHeight: undefined,
    availWidth: undefined,
    availHeight: undefined,
    visualViewport: {
      width: undefined,
      height: undefined,
      scale: undefined,
    },
  });
  
  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === 'undefined') {
      return;
    }

    function handleResize() {
      try {
        const vv = window.visualViewport;
        const visualViewportData = vv ? {
          width: vv.width,
          height: vv.height,
          scale: vv.scale,
        } : {
          width: undefined,
          height: undefined,
          scale: undefined,
        };

        const newSize = {
          width: window.innerWidth,
          height: window.innerHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight,
          clientWidth: document.documentElement?.clientWidth,
          clientHeight: document.documentElement?.clientHeight,
          screenWidth: window.screen?.width,
          screenHeight: window.screen?.height,
          availWidth: window.screen?.availWidth,
          availHeight: window.screen?.availHeight,
          visualViewport: visualViewportData,
        };
        
        console.log('Window resized:', newSize);
        
        setWindowSize(newSize);
      } catch (error) {
        console.error('Error in resize handler:', error);
      }
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Add visual viewport event listener if available
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', handleResize);
      vv.addEventListener('scroll', handleResize);
    }
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      const vv = window.visualViewport;
      if (vv) {
        vv.removeEventListener('resize', handleResize);
        vv.removeEventListener('scroll', handleResize);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  
  return windowSize;
}