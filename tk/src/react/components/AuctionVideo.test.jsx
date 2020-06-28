import React from 'react';
import AuctionVideo from './AuctionVideo';
import renderer from 'react-test-renderer';

it('should render an auction video', () => {
    const auctionvideo = renderer.create(
        <AuctionVideo
            liveAuctionSuperTitle="will be inside p className eyebrow>"
            liveAuctionTitle="will be the h2 tag"
            liveAuctionLinkUrl="will be inside link className video-link
            liveAuctionLinkDesc="will be inside link className video-link
            liveAuctionUrl="will be the src of the iframe"
        />
    );
    const tree = auctionvideo.toJSON();
    expect(tree).toMatchSnapshot();
});
