import React from 'react';
import renderer from 'react-test-renderer';
import PhillipsAlert from './PhillipsAlert';

it('should render a dismissable Alert Banner', () => {
  const alert = renderer.create(
    <PhillipsAlert
      dismissable="true"
      buttonLabel={'Lorem ipsum'}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
      </p>
      <p>
        Our <a href="/About/CookiePolicy">ullamco labori</a> ut aliquip ex commodo consequat.
      </p>
    </PhillipsAlert>
  );
  const tree = alert.toJSON();
  expect(tree).toMatchSnapshot();
});
