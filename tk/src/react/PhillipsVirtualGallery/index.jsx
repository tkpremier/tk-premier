/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PhillipsVirtualGallery = (props) => {
  useEffect(() => {
    if (typeof Exhibbit !== 'undefined') {
      Exhibbit.init('T-T33qVXX4uO_FKSIAmrDQ2', '13748');
    }
    return () => {
      Exhibbit.unityWebGlRef.SendMessage('Destroy', Exhibbit.unityWebGlRef);
    }
  }, []);
  return <div id="exhibbit-embed" data-version="3" />;
};

export default PhillipsVirtualGallery;
