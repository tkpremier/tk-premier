import React from 'react';
import LowerBannerImg from './lowerbannerimg';
import renderer from 'react-test-renderer';

it('should render a lower banner image on hover', () => {
    const lowerbannerimg = renderer.create(
        <LowerBannerImg
          id="1"
          desktopImageUrl="https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/lowerBanner-1-desktop.jpg"
          mobileImageUrl="https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/lowerBanner-1-mobile.jpg"
          url="/auctions/auction/CH080117"
          type="lowerBanner"
        />
    );
    const tree = lowerbannerimg.toJSON();
    expect(tree).toMatchSnapshot();
});
