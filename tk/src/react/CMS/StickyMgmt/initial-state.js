
export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
};

export const deleteStickyDialog = {
  open: false
};

export const formErrors = {
  wrappingLink: false,
  source: false,
  altText: false,
  title: false,
  hasErrors: false
};

export const selectedSticky = {
  altText: '',
  displayOrder: 0,
  id: 0,
  isActive: false,
  isNew: false,
  open: false,
  source: '',
  targetIsBlank: false,
  title: '',
  wrappingLink: ''
};

export const globalState = {
  token: null,
  xsrf: null,
  baseUrl: 'https://devcms.phillips.com',
  auctionEdited: false
};

export const stickies = [{ ...selectedSticky }];

export const stickyImage = {
  name: '',
  preview: '',
  file: ''
};

export const stickyReorder = {
  stickyId: 0,
  position: 0
};
