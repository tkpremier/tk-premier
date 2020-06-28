import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson from 'enzyme-to-json';
import { UnWrappedFavoriteLot } from './FavoriteLot';


describe('UnWrappedFavoriteLot Button', () => {
  const mockUser = { email: 'FakeyMcFakeUser@fake.com', id: '0' };
  Enzyme.configure({ adapter: new Adapter() });
  
  it('Matches the snapshot', () => {
    const component = shallow(
      <UnWrappedFavoriteLot
        active={false}
        saleNumber="NY00000"
        lotNumberFull="1"
        department="department"
        saveLot={() => 'mock'}
        deleteLot={() => 'mock'}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('when active it should have the active class', () => {
    const component = shallow(
      <UnWrappedFavoriteLot
        active
        saleNumber="NY00000"
        lotNumberFull="1"
        department="department"
        saveLot={() => 'mock'}
        deleteLot={() => 'mock'}
      />
    );
    expect(component.hasClass('active')).toEqual(true);
  });

  it('when inactive onClick calls props.saveLot', () => {
    const saveLot = jest.fn();

    const component = shallow(
      <UnWrappedFavoriteLot
        active={false}
        saleNumber="NY00000"
        lotNumberFull="1"
        department="department"
        saveLot={saveLot}
        deleteLot={() => 'mock'}
        user={mockUser}
        userLoggedIn
      />
    );

    component.simulate('click');
    expect(saveLot).toHaveBeenCalled();
  });

  it('when active onClick calls props.deleteLot', () => {
    const deleteLot = jest.fn();

    const component = shallow(
      <UnWrappedFavoriteLot
        active
        saleNumber="NY00000"
        lotNumberFull="1"
        department="department"
        saveLot={() => 'mock'}
        deleteLot={deleteLot}
        user={mockUser}
        userLoggedIn
      />
    );

    component.simulate('click');
    expect(deleteLot).toHaveBeenCalled();
  });
  
});
