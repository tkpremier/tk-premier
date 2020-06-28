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
  auctionEdited: false
};

export const formErrors = {
  wrappingLink: false,
  source: false,
  altText: false,
  title: false,
  hasErrors: false
};

export const pressReleases = {
  pressReleases: [],
  departmentList: [],
  selectedPressRelease: {
    active: true,
    body: '',
    departments: [],
    eventDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T00:00:00`,
    hasBody: true,
    locationId: 0,
    locationName: '',
    metaDescription: '',
    metaKeywords: '',
    pdfSource: '',
    pressReleaseId: 0,
    summary: '',
    title: 'New Press Release',
    url: ''
  }
};

export const testStore = {
  foo: 'bar'
}
