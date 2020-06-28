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

export const teamPage = {
  progressIndicator: false,
  teamMemberEdited: false,
  teamMembers: [],
  teamMemberImageUpload: {
    preview: '',
    teamMemberId: ''
  },
  selectedTeamMember: {
    teamMemberId: 0,
    deleteImage: null,
    teamMemberTypeDesc: 'Choose Type',
    teamMemberTypeId: 1,
    departmentName: 'Choose Department',
    departmentId: null,
    departmentCode: '',
    locationName: 'Choose Location',
    locationId: 1,
    title: 'Employee',
    firstName: 'Team',
    lastName: 'Member',
    email: 'email@phillips.com',
    currentEmail: 'email@phillips.com',
    phone: '+1 212 555 555',
    imageURL: 'https://phillips.vo.llnwd.net/v1/web_prod/team/empty-person.jpg',
    deptDisplayOrder: 0,
    locationDisplayOrder: 1,
    teamDisplayOrder: 1,
    isLocationDisplay: false,
    isTeamDisplay: true,
    isActive: true,
    errorMessage: null,
    displayEmail: true,
    newTeamMember: false
  }
};
