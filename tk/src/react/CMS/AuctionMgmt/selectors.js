export const getAllState = (state) => state;

// === TOP LEVEL ===
export const getState = (state) => state;
export const getAuctionsState = (state) => state.auctions;
export const getSelectedAuctionState = (state) => state.selectedAuction;
export const getSelectedAuctionSaleNumber = (state) => state.selectedAuction.saleNumber;
export const getSelectedLotState = (state) => state.selectedLot;
export const getSelectedLotLotNumber = (state) => state.selectedLot.lotNumber;

// === ENVIRONMENT BASE URL ===
export const getBaseUrlState = (state) => state.globalState.baseUrl;

// === IMAGE/FILE UPLOADS ===
export const getUploadImage = (state) => state.uploadImage;
export const getUploadFile = (state) => state.uploadFile;
export const getiOSBannerMobileImage = (state) => state.uploadImage.iosBannerMobile;
export const getiOSBannerDesktopImage = (state) => state.uploadImage.iosBannerDesktop;
export const getCatalogCoverImage = (state) => state.uploadImage.catalogueCoverImage;
export const getAuctionBannerImage = (state) => state.uploadImage.auctionBannerImage;
export const getSaleNumber = (state) => state.selectedAuction.saleNumber;

// === HIGHLIGHTS ===
export const getSelectedHighlight = (state) => state.highlights.selectedHighlight;
export const getSelectedHighlightId = (state) => state.highlights.selectedHighlight.highlightId;
export const getHighlightsImageUpload = (state) => state.highlights.highlightsImageUpload;

export const getSaleNumberToMigrate = (state) => state.selectedAuction.saleNumberToMigrate;

// === Auction Mobility ===
export const getAMSaleCalendarId = (state) => state.auctionMobility.calendarID;
export const getAMSaleIncludeAuctionImage = (state) => state.auctionMobility.incAuctionImage;
export const getAMSaleIncludeLotImages = (state) => state.auctionMobility.incLotImages;
export const getAMSaleIncludeLots = (state) => state.auctionMobility.incLotInfo;
export const getAMSalePublicationStatus = (state) => state.auctionMobility.statusDesc;
export const getAMSaleDuration = (state) => state.auctionMobility.auctionDuration;
export const getAMSaleBidThreshold = (state) => state.auctionMobility.bidThreshold;
