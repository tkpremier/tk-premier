import React from 'react';
import Sticky from '../HomePage/Sticky';
import renderer from 'react-test-renderer';

it('should render a sticky', () => {
    const sticky = renderer.create(
        <stickyMarkup
            source="\\phillipsds\website\Media_preview\FeaturedPromo\FeaturedPromoImage_nextPhotosTCA.png"
            wrappingLink="https://live.phillips.com/"
            altText="Next Photos and Contemporary"
            imgSrc="/Xigen/image.ashx?path=\\phillipsds\website\Media_preview\FeaturedPromo\FeaturedPromoImage_nextPhotosTCA.png"
        />
    );
    const tree = sticky.toJSON();
    expect(tree).toMatchSnapshot();
});
