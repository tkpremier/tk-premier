import React, { Fragment, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';


const ScrollButton = (props) => {
  const [isShown, setIsShown] = useState(false);

  const scrollToTop = () => {
    scroll.scrollToTop();
    setIsShown(false);
  };

  let scrolled = null;
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', (event) => {
      if (!scrolled) {
        setTimeout(() => {
          if (window.scrollY > 300) {
            setIsShown(true);
          } else { setIsShown(false); }
          scrolled = null;
        }, 1000);
      }
      scrolled = event;
    });
  }

  return (
    <Fragment>
      { isShown ? (<button className="back-to-top" onClick={() => scrollToTop()}>Back to Top</button>) : null}
    </Fragment>
  );
};
export default ScrollButton;
