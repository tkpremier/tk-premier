import React from 'react';
import SlideCaption from './CaptionSlide';
import renderer from 'react-test-renderer';

 it('should render a slide caption', () => {
    const slidecaption = renderer.create(
        <SlideCaption
           url="https://www.phillips.comauctions/auction/NY010517"
           htmlCaption="Latin America"
           slideWidt="500"
        />
    );
    const tree = slidecaption.toJSON();
    expect(tree).toMatchSnapshot();
});
