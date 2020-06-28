import React from 'react';
import EditorialItem from './editorialitem';
import renderer from 'react-test-renderer';

 it('should render an editorial item', () => {
    const editorialitem = renderer.create(
        <EditorialItem
            htmlCaption="Feature Video | Photographs"
            imageUrl="https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/featuredContent-186.jpg"
            url="https://www.phillips.com/Video/default?VideoID=190"
        />
    );
    const tree = editorialitem.toJSON();
    expect(tree).toMatchSnapshot();
});
