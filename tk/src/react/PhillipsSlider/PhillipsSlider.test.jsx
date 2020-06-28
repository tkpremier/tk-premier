import React from 'react';
import isFunction from 'lodash/fp/isFunction';
import Hammer from 'react-hammerjs';
import PhillipsSlider from './phillipsslider';
import renderer from 'react-test-renderer';

const slides=[{
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   },
   {
   width:"500",
   height:"100%",
   transition:"all 500ms ease",
   transform:"translateX(-${sliderWidth * currentIndex}px)",
   WebkitTransform:"translateX(-${sliderWidth * currentIndex}px)"
   }
   ]

 it('should render a slider', () => {
    const slider = renderer.create(
        <PhillipsSlider
           // endAutoplay=PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
           // changeSlide=PropTypes.func,
           // onMount=PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
           // pagination=PropTypes.bool,
           // arrows=PropTypes.bool,
           currentIndex="10"
           animation="fade-animation"
           sliderClass="image-slider"
           sliderWidth="991"
           sliderClass="phillips-slider"
           onMount={(slider) => slider.setState({sliderWidth : 1024})}
           >

          {slides.map(props=> <PhillipsSlider key={Math.random()} {...props}/>)}
          // map or define state here too probably, which is currentIndex class active
       </PhillipsSlider>
    );
    const tree = slider.toJSON();
    expect(tree).toMatchSnapshot();
});
