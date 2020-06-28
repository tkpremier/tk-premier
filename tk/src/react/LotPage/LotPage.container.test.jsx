import React from 'react';
import { LotPageContainer } from './LotPage.container';
import renderer from 'react-test-renderer';
// import { describe } from 'jest';

describe('LotPageContainer', () => {
  it('should render a LotPage', () => {
    const lotPageContainer = renderer.create(
      <LotPageContainer />
    );
    const tree = lotPageContainer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});