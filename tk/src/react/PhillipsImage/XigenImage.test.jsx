import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson from 'enzyme-to-json';
import XigenImage from './XigenImage';

describe('XigenImage test', () => {
  Enzyme.configure({ adapter: new Adapter() });

  it('it should call onload when loaded', () => {
    const onLoad = jest.fn();
    const component = shallow(
      <XigenImage
        alt={'Nature morte à la pastèque (Still Life with Watermelon)'}
        imagePath={'/xigen/lotimg/Pablo-Picasso/UK030217/1'}
        transformation={'LotDetailMainImage'}
        onLoad={onLoad}
      />
    );
    component.simulate('load');
    expect(onLoad).toHaveBeenCalled();
  });

  it('it should call onError when theres an error', () => {
    const onError = jest.fn();
    const component = shallow(
      <XigenImage
        alt={'Nature morte à la pastèque (Still Life with Watermelon)'}
        imagePath={'/xigen/lotimg/Pablo-Picasso/UK030217/1'}
        transformation={'LotDetailMainImage'}
        onError={onError}
      />
    );
    component.simulate('error');
    expect(onError).toHaveBeenCalled();
  });

  it('it should have the correct image source', () => {
    const component = shallow(
      <XigenImage
        alt={'Nature morte à la pastèque (Still Life with Watermelon)'}
        imagePath={'/xigen/lotimg/Pablo-Picasso/UK030217/1'}
        transformation={'LotDetailMainImage'}
      />
    );
    expect(toJson(component)).toHaveProperty('props.src', '/xigen/lotimg/Pablo-Picasso/UK030217/1/605/550/false/false/false');
  });
  
});
