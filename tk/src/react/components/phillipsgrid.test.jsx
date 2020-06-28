import React from 'react';
import EditorialItem from './editorialitem';
import PhillipsGrid from './phillipsgrid';
import renderer from 'react-test-renderer';

const items=[{
   htmlCaption:"Feature Video | Photographs",
   imageUrl:"https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/featuredContent-186.jpg",
   url:"https://www.phillips.com/Video/default?VideoID=190"
   },
   {
   htmlCaption:"Feature Video | Photographs",
   imageUrl:"https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/featuredContent-186.jpg",
   url:"https://www.phillips.com/Video/default?VideoID=190"
   },
   {
   htmlCaption:"Feature Video | Photographs",
   imageUrl:"https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/featuredContent-186.jpg",
   url:"https://www.phillips.com/Video/default?VideoID=190"
   },
   {
   htmlCaption:"Feature Video | Photographs",
   imageUrl:"https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/HomePage/featuredContent-186.jpg",
   url:"https://www.phillips.com/Video/default?VideoID=190"
   }
   ]

it('should render a grid', () => {
    const grid = renderer.create(
        <PhillipsGrid
            listClass="featuredContent"
            itemClass="grid-item"
            header="Features"
            numberOfItemsShown="4"
        >
         {items.map(props=> <EditorialItem key={Math.random()} {...props}/>)}

       </PhillipsGrid>
    );
    const tree = grid.toJSON();
    expect(tree).toMatchSnapshot();
});
