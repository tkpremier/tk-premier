export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
}

export const globalState = {
  token: null,
  xsrf: null,
  baseUrl: 'https://devcms.phillips.com',
  auctionEdited: false
}

export const formErrors = {
  wrappingLink: false,
  source: false,
  altText: false,
  title: false,
  hasErrors: false
}

export const catalogueSubscriptions = {
  catalogueSubscriptions: [],
  selectedDepartment: {
    departmentID: 0,
    catalogueSubscriptions: []
  },
  selectedCatalogue: {
    id: 0,
    order: 0,
    description: '',
    code: '',
    price: 0,
    newCatalogue: true
  }
}
