import * as userActions from './actions';
import UserMockData from './__mocks__/UserFavorites.mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';

describe('Setting user data actions', () => {
  test('Should create a USER_LOGIN action', () => {
    const expectedAction = {
      type: 'USER_LOGIN',
      payload: {
        user: {
          email: 'Scostello@phillips.com',
          firstName: 'sean',
          id: 'd2276129-1e26-457d-9446-5d8b60e760a0',
          lastName: 'costello',
          userName: 'Scostello@phillips.com'
        }
      }
    };
    expect(userActions.setUser(UserMockData)).toEqual(expectedAction);
  });

  test('should create a USER_FETCHED action', () => {
    const expectedAction = {
      type: 'USER_FETCHED',
      payload: {
        favoriteLots: UserMockData.favoriteLots,
        followedMakers: UserMockData.followedMakers,
        lotLists: UserMockData.lotLists
      }
    };
    expect(userActions.userFetched(UserMockData)).toEqual(expectedAction);
  });

  test('should create a USER_LOGOUT action', () => {
    const expectedAction = {
      type: 'USER_LOGOUT',
      payload: {
        user: null,
        favoriteLots: [],
        followedMakers: []
      }
    };
    expect(userActions.logout()).toEqual(expectedAction);
  });
});

describe('Follow, Favorite, and List Actions', () => {
  test('should create an ADD_MAKER action', () => {
    const expectedAction = {
      type: 'ADD_MAKER',
      payload: { 
        maker: 10449 
      }
    };
    expect(userActions.addMaker(10449)).toEqual(expectedAction);
  });

  test('should create an REMOVE_MAKER action', () => {
    const expectedAction = {
      type: 'REMOVE_MAKER',
      payload: { 
        maker: 10449
      }
    };
    expect(userActions.removeMaker(10449)).toEqual(expectedAction);
  });

  test('Should create an ADD_LOT action', () => {
    const expectedAction = {
      type: 'ADD_LOT',
      payload: {
        lot: {
          saleNumber: 'UK010417',
          lotNumber: 2
        }
      }
    };
    expect(userActions.addLot({ saleNumber: 'UK010417', lotNumber: 2 })).toEqual(expectedAction);
  });

  test('should create a REMOVE_LOT action', () => {
    const expectedAction = {
      type: 'REMOVE_LOT',
      payload: {
        lot: {
          saleNumber: 'UK010417',
          lotNumber: 2
        }
      }
    };
    expect(userActions.removeLot({ saleNumber: 'UK010417', lotNumber: 2 })).toEqual(expectedAction);
  });

  test('should create an ADD_LOT_LIST action', () => {
    const list = {
      name: 'Test List',
      description: 'Some kind of test list',
      id: 0,
      lots: [{ saleNumber: 'UK010417', lotNumber: 1, lotNumberFull: '1', lotNumberSuffix: '' }]
    };
    const expectedAction = {
      type: 'ADD_LOT_LIST',
      payload: {
        lotList: list
      }
    };
    expect(userActions.addLotList(list)).toEqual(expectedAction);
  });

  test('should create an REMOVE_LOT_LIST action', () => {
    const expectedAction = {
      type: 'REMOVE_LOT_LIST',
      payload: {
        lotListId: 88
      }
    };
    expect(userActions.removeLotList(88)).toEqual(expectedAction);
  });

  test('should create an ADD_LOT_TO_LIST action', () => {
    const list = {
      name: 'Test List',
      description: 'Some kind of test list',
      id: 88,
      lots: [
        { saleNumber: 'UK010417', lotNumber: 1, lotNumberFull: '1', lotNumberSuffix: '' },
        { saleNumber: 'UK010417', lotNumber: 2, lotNumberFull: '2', lotNumberSuffix: '' }
      ]
    };
    const expectedAction = {
      type: 'ADD_LOT_TO_LIST',
      payload: {
        lotList: list
      }
    };
    expect(userActions.addLotToLotList(list)).toEqual(expectedAction);
  });

  test('should create an REMOVE_LOT_FROM_LIST action', () => {
    const list = {
      name: 'Test List',
      description: 'Some kind of test list',
      id: 88,
      lots: [
        { saleNumber: 'UK010417', lotNumber: 1, lotNumberFull: '1', lotNumberSuffix: '' }
      ]
    };
    const expectedAction = {
      type: 'REMOVE_LOT_FROM_LIST',
      payload: {
        lotList: list
      }
    };
    expect(userActions.removeLotFromLotList(list)).toEqual(expectedAction);
  });
});

describe('Asnyc User Actions', () => {
  const middleWares = [thunk];
  const mockStore = configureMockStore(middleWares);

  afterEach(() => nock.clearAll());

  test('login should dispatch USER_LOGIN then USER_FETCHED', () => {
    nock('localhost:8001')
      .get('/api/user/${id}/details')
      .reply(200, { body: UserMockData });

    const store = mockStore();
    const expectedActions = [
      {
        type: 'USER_LOGIN',
        payload: {
          user: {
            email: UserMockData.email,
            firstName: UserMockData.firstName,
            id: UserMockData.id,
            lastName: UserMockData.lastName,
            userName: UserMockData.userName
          }
        }
      },
      {
        type: 'USER_FETCHED',
        payload: {
          favoriteLots: UserMockData.favoriteLots,
          followedMakers: UserMockData.followedMakers,
          lotLists: UserMockData.lotLists
        }
      }
    ];
    userActions.loggedIn(UserMockData).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});