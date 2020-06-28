/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { allDeviceTypes } from '../utils/getDeviceInfo';

const checkIsMobile = (e) => {
  const { matches, media } = e;
  if (matches) {
    switch (media) {
      case 'screen and (min-width: 480px)':
      case 'screen and (min-width: 768px)':
        return false;
      default:
        return true;
    }
  } else {
    switch (media) {
      case 'screen and (min-width: 480px)':
      case 'screen and (min-width: 768px)':
        return true;
      default:
        return false;
    }
  }
};

export const useMqlMobile = () => {
  const tabletMedia = allDeviceTypes[1];
  const mqlTablet = typeof window !== 'undefined' ? window?.matchMedia(tabletMedia.query) : false;
  const initIsMobile = mqlTablet ? !mqlTablet.matches : mqlTablet;
  const [isMobile, setIsMobile] = useState(initIsMobile);
  useEffect(() => {
    const handleMqlChange = (e) => {
      const newIsMobile = checkIsMobile(e);
      if (newIsMobile !== isMobile) {
        window.sessionStorage.setItem('isMobile', newIsMobile);
        setIsMobile(newIsMobile);
      }
    };
    if (mqlTablet.addListener) {
      mqlTablet.addListener(handleMqlChange);
    }
    return () => {
      window.sessionStorage.removeItem('isMobile');
      mqlTablet.removeListener(handleMqlChange);
    };
  }, [isMobile]);
  return isMobile;
};
