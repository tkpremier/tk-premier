import React from 'react';
import PhillipsVideo from './HomePageVideo';
import renderer from 'react-test-renderer';

 it('should render a video', () => {
    const phillipsvideo = renderer.create(
        <PhillipsVideo
            // active: PropTypes.bool,
            // onSelect: PropTypes.func,
            // editable: PropTypes.bool
            // saleInfo: PropTypes.node,
            // New York Auction&nbsp;18&nbsp;May&nbsp;2017
            // htmlCaption: PropTypes.node,
            // Revisiting &#39;The Void&#39;: Francesco Bonami on Damien Hirst&#39;s Iconic&nbsp;Pill Cabinet
            videoUrl="https://player.vimeo.com/video/216898363"
        />
    );
    const tree = phillipsvideo.toJSON();
    expect(tree).toMatchSnapshot();
});
