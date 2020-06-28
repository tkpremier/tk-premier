import React, { Component, Fragment, useState } from 'react';
import {
  Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller
} from 'react-scroll';


const ScrollTest = (props) => {
  const [isShown, setIsShown] = useState(true);

  const scrollToTop = () => {
    scroll.scrollToTop();
    setIsShown(false);
  };


  return (
    <Fragment>
      { isShown ? (<button onScroll={() => setIsShown(true)} className="back-to-top" onClick={scrollToTop}>Back to Top</button>) : null}
    </Fragment>
  );
};
export default ScrollTest;
