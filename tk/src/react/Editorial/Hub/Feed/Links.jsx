import React, { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';


const Links = ({ children }) => {
  const linkEl = document.querySelector('.editorial-hub__h1');
  const el = document.createElement('span');
  el.classList.add('editorial-hub__h1__link-wrapper');
  useEffect(() => {
    linkEl.appendChild(el);
    return () => {
      linkEl.removeChild(el);
    };
  });
  return createPortal(
    children,
    el
  );
};

export default Links;
