import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson from 'enzyme-to-json';
import { UnWrappedFollowArtist } from './FollowArtist';


describe('FollowArtist Button', () => {
  const mockUser = { email: 'FakeyMcFakeUser@fake.com', id: '0' };

  Enzyme.configure({ adapter: new Adapter() });
  it('Matches the snapshot', () => {
    const component = shallow(
      <UnWrappedFollowArtist
        active={false}
        makerId={1}
        makerName="Bobson Dugnutt"
        saveMaker={() => 'mock'}
        deleteMaker={() => 'mock'}
      />
  );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('when active it should have the active class', () => {
    const component = shallow(
      <UnWrappedFollowArtist
        active
        makerId={1}
        makerName="Bobson Dugnutt"
        saveMaker={() => 'mock'}
        deleteMaker={() => 'mock'}
      />
    );
    expect(component.hasClass('active')).toEqual(true);
  });

  it('when inactive onClick calls props.saveMaker', () => {
    const saveMaker = jest.fn();

    const component = shallow(
      <UnWrappedFollowArtist
        active={false}
        makerId={1}
        makerName="Bobson Dugnutt"
        saveMaker={saveMaker}
        deleteMaker={() => 'mock'}
        user={mockUser}
        userLoggedIn
      />
    );

    component.simulate('click');
    expect(saveMaker).toHaveBeenCalled();
  });

  it('when active onClick calls props.deleteMaker', () => {
    const deleteMaker = jest.fn();

    const component = shallow(
      <UnWrappedFollowArtist
        active
        makerId={1}
        makerName="Bobson Dugnutt"
        saveMaker={() => 'mock'}
        deleteMaker={deleteMaker}
        user={mockUser}
        userLoggedIn
      />
    );

    component.simulate('click');
    expect(deleteMaker).toHaveBeenCalled();
  });
});
