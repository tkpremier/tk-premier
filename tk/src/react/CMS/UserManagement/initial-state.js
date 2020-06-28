export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
};

export const globalState = {
  token: null,
  xsrf: null,
  baseUrl: 'https://devcms.phillips.com',
  apiUrl: 'https://devapi.phillips.com/api',
  auctionEdited: false
};

export const formErrors = {
  wrappingLink: false,
  source: false,
  altText: false,
  title: false,
  hasErrors: false
};

export const users = {
  bidsClientId: 'MjZlZTUxMmQtOTU3ZC00OTAyLWIxNDAtNTNiOTZmYjdiY2ExOlBISUxMSVBTV0VCU0lURQ==',
  bidsLogin: 'BidsNewYork@phillips.com',
  bidsLoginUser: {},
  bidsPassword: 'B1dsMaster',
  countries: [{
    countryId: 232,
    countryDesc: 'United States',
    countryCode: 'US'
  }],
  states: [{
    stateId: 47,
    countryId: 232,
    stateDesc: 'New York',
    stateCode: 'NY'
  }],
  progressIndicator: false,
  queryString: '',
  userEdited: false,
  users: [{
    id: '00000000-0000-0000-0000-000000000000',
    email: 'email@phillips.com',
    firstName: 'Test',
    lastName: 'User',
  }],
  selectedUser: {
    title: null,
    newEmail: null,
    company: null,
    phoneNumber: null,
    phoneCountryCode: null,
    phoneNumberLocal: null,
    faxNumber: null,
    faxCountryCode: null,
    faxNumberLocal: null,
    stripeCardToken: null,
    userAddress: { // If empty, should be null
      address1: '',
      address2: '',
      city: '',
      countryCode: '',
      countryDesc: '',
      countryID: null,
      intlPostalCode: null,
      province: null,
      stateCode: '',
      stateDesc: '',
      stateID: 0,
      zipCode: ''
    },
    followedMakers: [],
    favoriteLots: [],
    lotLists: [],
    messageCategories: [],
    stripeInfo: null,
    isActive: true,
    showLocation: true,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    message: '',
    testUser: true
  }
};
