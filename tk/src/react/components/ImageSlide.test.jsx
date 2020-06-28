import React from 'react';
import ImageSlider from './ImageSlide';
import renderer from 'react-test-renderer';

it('should render an active slide', () => {
    const imageslider = renderer.create(
        <ImageSlider
            slideActive
            url="/auctions/auction/NY010317"
            imageUrl="https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/slide-128.jpg"
        />
    );
    const tree = imageslider.toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render an inactive slide', () => {
    const imageslider = renderer.create(
        <ImageSlider
            url="/auctions/auction/NY010317"
            imageUrl="https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/slide-128.jpg"
        />
    );
    const tree = imageslider.toJSON();
    expect(tree).toMatchSnapshot();
});
