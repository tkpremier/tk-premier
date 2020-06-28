import { combineReducers } from 'redux';

import alert from './alert';
import auctionMobility from './auction-mobility';
import auctions from './auctions';
import cloudinaryUpload from './cloudinary-upload';
import globalState from './global-state';
import highlights from './highlights';
import lots from './lots';
import migratePreViewToStaging from './migrate-preview-to-staging';
import selectedAuction from './selected-auction';
import selectedLot from './selected-lot';
import tags from './tags';
import updateAuction from './update-auction';
import updateTags from './update-tag';
import uploadFile from './upload-file';
import uploadImage from './upload-image';

export default combineReducers({
  alert,
  auctionMobility,
  auctions,
  cloudinaryUpload,
  globalState,
  highlights,
  lots,
  migratePreViewToStaging,
  selectedAuction,
  selectedLot,
  tags,
  updateAuction,
  updateTags,
  uploadFile,
  uploadImage
});
