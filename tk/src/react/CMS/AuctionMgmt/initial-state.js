
export const globalState = {
  token: null,
  xsrf: null,
  baseUrl: 'https://devcms.phillips.com',
  auctionEdited: false
};

export const auctions = {
  auctions: [],
  displayAuctions: [],
  auctionManagementProgress: false
};

export const tags = {

};

export const lots = {
  lots: [],
  displayLots: [],
  noLots: false
};

export const selectedLot = {
  artistBiography: '',
  artistBirthYear: '',
  artistDeathYear: '',
  artistImageBlocked: false,
  artistInscription: null,
  artistNationality: '',
  auctionBidPartner: 1,
  auctionLotBidUrl: '',
  auctionLotDisplayTypeId: 1,
  auctionLotDisplayTypeName: 'single-cell',
  auctionLotPublicId: 0,
  auctionMobilityAuctionRowId: '0',
  auctionMobilityLotRowId: '0',
  soldOverridePrice: 0,
  cArtistInscription: null,
  cBirthDeath: null,
  cCirca: null,
  cDescription: null,
  cEssay: null,
  cExhibited: null,
  cExtraInfo: '',
  cLiterature: null,
  cMakerName: null,
  cMedium: null,
  conditionRequestEmail: null,
  cPreface: null,
  cProvenance: null,
  cSigEdtMan: null,
  circa: 'circa 1955',
  cloudinaryVersion: '1542818348',
  condition: 'Glass with some scuffs where the aluminum band rests. Aluminum with light oxidation throughout.',
  currencySign: '$',
  department: 'Design',
  depth: 0,
  description: 'Pair of wall lights, model no. 802.5',
  descriptionWithMarkup: null,
  detailLink: '',
  detailVideoUrl: '',
  dimensions: 'Each: 12 1/4 x 7 7/8 x 9 3/8 in. (31.1 x 20 x 23.8 cm)',
  displayFavoriteLotButton: false,
  essay: '',
  estimateSpecialChar: '',
  exhibited: '',
  extraInfo: '',
  hammerPlusBP: 0,
  hammerPlusBPLive: 0,
  height: 0,
  highEstimate: 7000,
  imagePath: '/auctions/NY050218/102_001.jpg',
  imageVersion: '1542818348',
  is360View: false,
  isExhibition: false,
  isHideDisplay: false,
  isHideEstimate: 0,
  isNoLot: false,
  isNoReserve: false,
  isSaleOver: true,
  isSold: false,
  isViewInRoom: false,
  literature: '',
  locationName: null,
  lotImages: [],
  lotNumber: 102,
  lotNumberFull: '0',
  lotNumberSuffix: null,
  lotSelected: false,
  lotSpecialChar: '',
  lotStatusId: 5,
  lotThumbList: null,
  lotThumbs: [],
  lowEstimate: 5000,
  makerId: 3976,
  makerName: 'Sample Lot',
  isSoldOverride: false,
  medium: 'Glass, aluminum.',
  objectNumber: '123489',
  otherEstimatesList: [],
  partnerBidUrl: '',
  preface: '',
  provenance: 'Private collection, Milan',
  saleNumber: 'NY000000',
  saleOfferThreshold: 3500,
  saleTitle: 'Sample Sale',
  saleTypeId: 1,
  showAdvanceBidButton: true,
  showConditionReport: true,
  showInquireButton: true,
  showSaleOffers: true,
  showSoldPrice: true,
  sigEdtMan: '',
  startDateTime: '0001-01-01T00:00:00',
  tags: [],
  useCloudinary: true,
  videoDescription: '',
  videoSource: '',
  videoTitle: '',
  viewInRoomImage: '',
  wModelName: null,
  wReferenceNo: null,
  webDescription: '',
  width: 0
};

export const updateState = {

};

export const alerts = {
  error: false,
  success: false,
  warning: false
};

export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
};

export const highlights = {
  auctionHighlights: [],
  highlightsImageUpload: {
    preview: '',
    highlightId: ''
  },
  selectedHighlight: {
    'active': true,
    'cloudinaryVersion': '1234',
    'description': '',
    'displayOrder': 0,
    'highlightId': 0,
    'imagePath': 'blank',
    'saleNumber': ''
  },
  pushToProdDialog: false,
  progressIndicator: false
};

export const uploadImage = {
  iosBannerDesktop: { preview: '' },
  iosBannerMobile: { preview: '' },
  catalogueCoverImage: { preview: '' },
  auctionBannerImage: { preview: '' }
};

export const uploadFile = {
  auctionResultsFile: { preview: '' },
  winnerBidEmailFile: { name: '', preview: '' }
};

export const cloudinaryUpload = {
  thumbnailDialogOpen: false,
  cloudinaryDialogOpen: false,
  cloudinaryUploadQueue: true
};

export const updateAuction = {
  saveDialogOpen: false
};

export const selectedAuction = {
  alternativeAuctionTitle: '',
  auctionBidPartner: 1,
  auctionDate: '2018-12-06T00:00:00',
  auctionDetails: null,
  auctionDetailsSmall: null,
  auctionEditorials: [],
  auctionPublicID: 572,
  auctionTitle: 'Sample Auction',
  auctionResultsFile: '',
  cAuctionTitle: null,
  catalogueSetSale: '',
  catalogueSetText: '',
  cloudinaryBannerVersion: '',
  conditionRequestEmail: null,
  contactEmail: null,
  createDate: '0001-01-01T00:00:00',
  currencyCode: 'USD',
  departmentName: null,
  departments: [],
  enableCuratedAuction: false,
  enableOnlineCatalogue: false,
  endDate: '2018-12-06T02:00:00',
  endSale: false,
  errorMessage: null,
  eventDate: null,
  eventTime: null,
  extraInfo: null,
  flocklerIDs: null,
  highlights: [],
  iosBannerDesktop: '',
  iosBannerDesktopUrl: '',
  iosBannerMobile: '',
  iosBannerMobileUrl: '',
  IsCalendar: false,
  isLiveAuction: false,
  isMixedAuction: false,
  liveAuctionLinkDesc: '',
  liveAuctionLinkUrl: '',
  liveAuctionSuperTitle: '',
  liveAuctionTitle: '',
  liveAuctionUrl: '',
  locationName: 'NEW YORK',
  modifyDate: '0001-01-01T00:00:00',
  modifyUserID: 0,
  postSaleOfferThreshold: 0,
  saleNumber: 'NY010100',
  saleNumberToMigrate: '',
  saleOfferEndDate: null,
  saleOfferThreshold: 0,
  saleType: 'Auction',
  saleTypeID: 1,
  showAdvanceBidButton: false,
  showBuyButton: true,
  showCatalogueDownloadLink: true,
  showConditionReport: false,
  showInquireButton: false,
  showSaleOffers: false,
  showSoldPrice: true,
  showShippingLink: false,
  showWebDescription: false,
  startDate: '2018-12-06T00:00:00',
  timeState: 0,
  timedAuction: true,
  useCloudinary: false,
  useGbg: true,
  virtualGalleryIds: '',
  winnerBidEmailFile: '',
  winnerBidEmailSendResults: {
    emailsSent: 0,
    totalEmailsToSend: 0,
    winningBids: [],
    sendDate: '2018-12-06T00:00:00'
  },
  winnerBidEmailSent: false
};

export const selectedAMSale = {
  saleEdited: false,
  unblockDialogOpen: false,
  auctionMobilityAuctionID: 0,
  bidThreshold: 0,
  saleNumber: '',
  saleType: '',
  calendarID: 0,
  auctionTitle: '',
  eventDate: '',
  eventDateAsDate: '',
  endDate: '',
  auctionDuration: 0,
  viewing: null,
  locationName: '',
  rowID: '',
  statusDesc: '',
  uploadStatus: '',
  eventTime: '',
  auctionMobilityModifyDate: '',
  incAuctionImage: false,
  incLotImages: false,
  incLotInfo: false
};

export const auctionMobilty = {
  auctionMobilityProgress: false
};
