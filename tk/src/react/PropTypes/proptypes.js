import PropTypes from 'prop-types';

// BEGIN FLOCKLER EDITORIAL PROP TYPES
const editorialSectionPropTypes = {
  id: PropTypes.number,
  name: PropTypes.string
};

const defaultEditorialProps = {
  articleUrl: '',
  associatedSalesList: [],
  coverUrl: '',
  publishDate: '',
  section: '',
  sectionId: 0,
  sections: [],
  summary: '',
  title: '',
  flocklerId: 0,
  state: 0,
  displayType: 0,
  alternateTitle: '',
  alternateDescription: '',
  makerId: null
}

const editorialPropTypes = {
  articleUrl: PropTypes.string,
  associatedSalesList: PropTypes.arrayOf(PropTypes.string),
  coverUrl: PropTypes.string,
  publishDate: PropTypes.string,
  section: PropTypes.string,
  sectionId: PropTypes.number,
  sections: PropTypes.arrayOf(PropTypes.shape(editorialSectionPropTypes)),
  summary: PropTypes.string,
  title: PropTypes.string,
  associatedSales: PropTypes.string,
  flocklerId: PropTypes.number,
  state: PropTypes.number,
  displayType: PropTypes.number,
  alternateTitle: PropTypes.string,
  alternateDescription: PropTypes.string,
  makerId: PropTypes.number
};
// END FLOCKLER EDITORIAL PROP TYPES

const featuredMakerPropType = {
  biography: PropTypes.string,
  birthYear: PropTypes.string,
  deathYear: PropTypes.string,
  firstQuote: PropTypes.string,
  imagePath: PropTypes.string,
  isConsignmentMaker: PropTypes.bool,
  isFeatured: PropTypes.bool,
  landingDescription: PropTypes.string,
  lotNumber: PropTypes.number,
  lotNumberSuffix: PropTypes.string,
  makerId: PropTypes.number,
  makerName: PropTypes.string,
  nationality: PropTypes.string,
  saleNumber: PropTypes.string,
  secondQuote: PropTypes.string
};

const makerEditorialPropType = {
  birthYear: PropTypes.string,
  deathYear: PropTypes.string,
  editorial: editorialPropTypes,
  makerId: PropTypes.number,
  makerName: PropTypes.string,
  nationality: PropTypes.string
}

const makerPropTypes = {
  makerName: PropTypes.string,
  makerId: PropTypes.number,
  artistBiography: PropTypes.string,
  artistBirthYear: PropTypes.string,
  artistDeathYear: PropTypes.string,
  artistNationality: PropTypes.string
};

const auctionPropTypes = {
  auctionBidPartner: PropTypes.number,
  auctionDetails: PropTypes.string,
  auctionDetailsSmall: PropTypes.string,
  auctionTitle: PropTypes.string,
  cAuctionTitle: PropTypes.string,
  conditionRequestEmail: PropTypes.string,
  departmentName: PropTypes.string,
  enableCuratedAuction: PropTypes.bool,
  enableOnlineCatalogue: PropTypes.bool,
  endDate: PropTypes.string,
  eventDate: PropTypes.string,
  extraInfo: PropTypes.string,
  locationName: PropTypes.string,
  saleNumber: PropTypes.string,
  saleTypeID: PropTypes.number,
  showAdvanceBidButton: PropTypes.bool,
  showRegistrationLink: PropTypes.bool,
  startDate: PropTypes.string,
  timeState: PropTypes.number,
  useCloudinary: PropTypes.bool
};

const lotDescPropTypes = {
  circa: PropTypes.string,
  artistInscription: PropTypes.string,
  medium: PropTypes.string,
  dimensions: PropTypes.string,
  sigEdtMan: PropTypes.string
};

const lotImagePropType = {
  imagePath: PropTypes.string,
  isViewInRoom: PropTypes.bool
};

const watchDescPropTypes = {
  wReferenceNo: PropTypes.string,
  wMovementNo: PropTypes.string,
  wCaseNo: PropTypes.string,
  wModelName: PropTypes.string,
  wMaterial: PropTypes.string,
  wCalibre: PropTypes.string,
  wBracelet_Strap: PropTypes.string,
  wClasp_Buckle: PropTypes.string,
  wAccessories: PropTypes.string
};

const jewelsDescPropTypes = {
  jReport: PropTypes.string,
  jPrincipalStone: PropTypes.string,
  jSide: PropTypes.string,
  jMetal: PropTypes.string,
  jAssayMarks: PropTypes.string,
  jRemark: PropTypes.string,
  jYear: PropTypes.string,
  jAccessories: PropTypes.string
};

const lotPropTypes = {
  artistImageBlocked: PropTypes.bool,
  auctionLotDisplayTypeId: PropTypes.number,
  auctionLotDisplayTypeName: PropTypes.string,
  auctionLotPublicId: PropTypes.number,
  auctionMobilityAuctionRowId: PropTypes.string,
  auctionMobilityLotRowId: PropTypes.string,
  buyNowPrice: PropTypes.number,
  buyNowSaleNumber: PropTypes.string,
  className: PropTypes.string,
  cloudinaryVersion: PropTypes.string,
  currencySign: PropTypes.string,
  currentLanguage: PropTypes.string,
  description: PropTypes.string,
  descriptionWithMarkup: PropTypes.string,
  detailLink: PropTypes.string,
  detailVideoUrl: PropTypes.string,
  disableFollow: PropTypes.bool,
  editable: PropTypes.bool,
  enableShare: PropTypes.bool,
  enableTrackVisibility: PropTypes.bool,
  endSale: PropTypes.bool,
  essay: PropTypes.string,
  estimateSpecialChar: PropTypes.string,
  estimateText: PropTypes.string,
  eventDate: PropTypes.string,
  eventTime: PropTypes.string,
  extraInfo: PropTypes.string,
  filterEnabled: PropTypes.bool,
  hammerPlusBP: PropTypes.number,
  hammerPlusBPLive: PropTypes.number,
  hasRouter: PropTypes.bool,
  hideUserActions: PropTypes.bool,
  highEstimate: PropTypes.number.isRequired,
  imagePath: PropTypes.string,
  imageTransformation: PropTypes.string,
  is360View: PropTypes.bool,
  isDesktop: PropTypes.bool,
  isExhibition: PropTypes.bool,
  isOnlineSale: PropTypes.bool,
  isNoLot: PropTypes.bool,
  isSoldOverride: PropTypes.bool,
  isHideDisplay: PropTypes.bool,
  isVisible: PropTypes.bool,
  isWatch: PropTypes.bool,
  ...jewelsDescPropTypes,
  key: PropTypes.string,
  lazyLoadOffset: PropTypes.number,
  locationName: PropTypes.string,
  lotListDisabled: PropTypes.bool,
  lotNumber: PropTypes.number,
  lotNumberFull: PropTypes.string,
  lotNumberSuffix: PropTypes.string,
  lotImages: PropTypes.arrayOf(PropTypes.shape(lotImagePropType)),
  lotStatusId: PropTypes.number,
  lowEstimate: PropTypes.number.isRequired,
  ...makerPropTypes,
  objectNumber: PropTypes.string,
  saleNumber: PropTypes.string,
  saleTitle: PropTypes.string,
  saleTypeId: PropTypes.number,
  showBidButton: PropTypes.bool,
  showBidButtonPlaceholder: PropTypes.bool,
  showCuratedView: PropTypes.bool,
  showEstimateText: PropTypes.bool,
  showLotNumber: PropTypes.bool,
  showSoldPrice: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.object),
  toggleEstHammer: PropTypes.bool,
  useCloudinary: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  isViewInRoom: PropTypes.bool,
  literature: PropTypes.string,
  exhibited: PropTypes.string,
  videoSource: PropTypes.string,
  videoTitle: PropTypes.string,
  videoDescription: PropTypes.string,
  webDescription: PropTypes.string,
  ...lotDescPropTypes,
  lotSpecialChar: PropTypes.string,
  ...watchDescPropTypes
};

const defaultLotProps = {
  artistImageBlocked: false,
  auctionLotDisplayTypeId: 1,
  auctionLotDisplayTypeName: 'single-cell',
  auctionLotPublicId: 0,
  auctionMobilityAuctionRowId: '0',
  auctionMobilityLotRowId: '0',
  buyNowPrice: 0,
  buyNowSaleNumber: 'EX080519',
  className: '',
  cloudinaryVersion: '1',
  currencySign: '$',
  currentLanguage: 'en-US',
  description: '',
  descriptionWithMarkup: null,
  detailLink: '',
  detailVideoUrl: null,
  disableFollow: false,
  editable: false,
  enableShare: false,
  enableTrackVisibility: false,
  endSale: false,
  estimateSpecialChar: '',
  estimateText: '',
  filterEnabled: true,
  hammerPlusBP: 0,
  hasRouter: false,
  hideUserActions: false,
  highEstimate: 1,
  imagePath: '',
  imageTransformation: 'SingleCell',
  is360View: false,
  isDesktop: true,
  isExhibition: false,
  isHideDisplay: false,
  isNoLot: false,
  isNoReserve: false,
  jAccessories: null,
  jAssayMarks: null,
  jMetal: null,
  jRemark: null,
  jReport: null,
  jSide: null,
  jYear: null,
  lazyLoadOffset: 500,
  locationName: 'New York',
  lotListDisabled: false,
  lotNumber: 1,
  lotNumberFull: '1 ',
  lotNumberSuffix: ' ',
  lotStatusId: 1,
  lowEstimate: 0,
  makerName: '',
  makerId: 0,
  objectNumber: '',
  saleNumber: '',
  saleTypeId: 1,
  showBidButton: false,
  showBidButtonPlaceholder: false,
  showCuratedView: false,
  showEstimateText: true,
  showLotNumber: true,
  showSaleOffers: false,
  showSoldPrice: true,
  tags: [],
  toggleEstHammer: false,
  useCloudinary: true,
  videoDescription: '',
  videoSource: '',
  videoTitle: '',
  wModelName: null,
  wReferenceNo: null
};
const defaultUserProps = {
  recommendedLots: [],
  followedMakers: [],
  favoriteLots: [],
  lotLists: [],
  saleRegistrations: [],
  user: {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    loggedIn: false,
    name: '',
    phoneCountryCode: null,
    phoneNumber: null,
    phoneNumberLocal: null,
    messageCategories: []
  }
};

const saleRegistration = {
  saleNumber: PropTypes.string.isRequired,
  paddleNumber: PropTypes.number.isRequired,
  registrationStatus: PropTypes.number.isRequired
};
const user = {
  recommendedLots: PropTypes.array,
  followedMakers: PropTypes.array,
  favoriteLots: PropTypes.array,
  lotLists: PropTypes.array,
  saleRegistrations: PropTypes.arrayOf(saleRegistration),
  user: {
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
    messageCategories: PropTypes.array,
    loggedIn: PropTypes.bool,
    phoneCountryCode: PropTypes.string,
    phoneNumber: PropTypes.string,
    phoneNumberLocal: PropTypes.string
  }
};

const deptPropTypes = {
  departmentId: PropTypes.number,
  instagram: PropTypes.string,
  features: PropTypes.array,
  pastAuctions: PropTypes.array,
  pressReleases: PropTypes.array,
  upcomingAuctions: PropTypes.array,
  videos: PropTypes.array,
  carousel: PropTypes.arrayOf(defaultLotProps)
};

const videoPropType = {
  videoPath: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export {
  defaultEditorialProps,
  editorialPropTypes,
  featuredMakerPropType,
  makerEditorialPropType,
  makerPropTypes,
  lotPropTypes,
  defaultLotProps,
  lotDescPropTypes,
  auctionPropTypes,
  deptPropTypes,
  defaultUserProps,
  saleRegistration,
  user,
  videoPropType
};
