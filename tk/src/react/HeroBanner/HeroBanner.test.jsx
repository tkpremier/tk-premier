import React from 'react';
import { describe, it, expect } from 'jest';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HeroBanner from './HeroBanner';

describe('Hero Banner', () => {
  it('HeroBanner to match snapshot', () => {
    const image = 'https://assets.phillips.com/image/upload/t_Website_HeroBanner/v1/website/careers_banner_01.jpg';
    const headline = 'Sell with us.';
    const heroBanner = shallow(<HeroBanner image={image} headline={headline} />);
    expect(toJson(heroBanner)).toMatchSnapshot();
  });
});
