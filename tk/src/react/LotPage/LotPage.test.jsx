import React from 'react';
import LotPage from './LotPage';
import renderer from 'react-test-renderer';

describe('LotPageContainer', () => {
  it('should render a LotPage', () => {
    const lotPageContainer = renderer.create(
      <LotPage />
    );
    const tree = lotPageContainer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});