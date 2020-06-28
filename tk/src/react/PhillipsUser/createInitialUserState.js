import { defaultUserProps } from '../PropTypes/proptypes';

export default (userData = defaultUserProps) => {
  return {
    recommendedLots: userData.recommendedLots || [],
    followedMakers: userData.followedMakers || [],
    favoriteLots: userData.favoriteLots || [],
    lotLists: userData.lotLists || [],
    saleRegistrations: userData.saleRegistrations || [],
    user: {
      company: userData.company || '',
      email: userData.email || '',
      title: userData.title || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      id: userData.id || '',
      loggedIn: userData.id
        ? userData.id.length > 0
        : false,
      name: userData.firstName
        ? `${userData.firstName} ${userData.lastName}`
        : '',
      phoneCountryCode: userData.phoneCountryCode || null,
      phoneNumber: userData.phoneNumber || null,
      phoneNumberLocal: userData.phoneNumberLocal || null,
      messageCategories: userData.messageCategories || [{}]
    },
    userForm: {
      status: '',
      message: '',
      type: 'signup'
    }
  };
};
