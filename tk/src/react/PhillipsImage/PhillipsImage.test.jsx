import React from 'react';
import renderer from 'react-test-renderer';
import PhillipsImage from './PhillipsImage';

describe('PhillipsImage', () => {
  it('src should be /690/550/false/false/false/fitpadded/top', () => {
    const phillipsImage = renderer.create(
      <PhillipsImage imagePath={'/xigen/lotimg/Gino-Sarfatti/NY050117/1'} width={690} height={550} align={'top'} />
    );
    const tree = phillipsImage.toJSON();
    expect(tree).toMatchSnapshot();
  });

});