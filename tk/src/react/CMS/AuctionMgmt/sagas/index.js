import { call, fork } from 'redux-saga/effects';

// import { appWatchers } from './app'
import {
  auctionsWatchers,
  loadAuctionWatchers
} from './auctions';
import { updateAuctionWatchers } from './update-auction';
import {
  uploadImageWatchers,
  uploadiOSDesktopBannerWatchers,
  uploadiOSMobileBannerWatchers,
  uploadCatalogCoverWatchers,
  uploadAuctionBannerWatchers
} from './upload-image';
import {
  cloudinaryUploadTriggerWatchers,
  thumbnailUpdateWatchers
} from './cloudinary-upload';
import {
  getHighlightsWatchers,
  saveHighlightsWatchers,
  deleteHighlightsWatchers,
  imageUploadHighlightsWatchers,
  highlightsPushToProdWatchers,
  highlightsMigratePreviewToStagingWatchers
} from './highlights';
import {
  lotsGetWatchers
} from './lots';
import {
  migratePreviewToStagingWatchers
} from './migrate-preview-to-staging';
import {
  updateLotWatchers,
  cloudinaryLotUploadWatchers
} from './update-lot';
import {
  tagsGetWatchers
} from './tags';
import {
  uploadSaleResultsWatchers,
  uploadWinnerEmailWatchers
} from './upload-file';
import {
  getAMSaleWatchers,
  updateAMSaleWatchers,
  unlockAMSaleWatchers
} from './auction-mobility';

// Array<GenFunc> -> Array<GenFunc>
const forkList = (watcherList) => watcherList.map(w => fork(w))

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function* periodicTask(task, timeout) {
  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    yield fork(task)
    yield call(delay, timeout)
  }
}

export default function* root() {
  // Run all watchers in parallel
  try {
    const allWatchers = [
      forkList(auctionsWatchers),
      forkList(cloudinaryLotUploadWatchers),
      forkList(cloudinaryUploadTriggerWatchers),
      forkList(deleteHighlightsWatchers),
      forkList(getAMSaleWatchers),
      forkList(getHighlightsWatchers),
      forkList(highlightsMigratePreviewToStagingWatchers),
      forkList(highlightsPushToProdWatchers),
      forkList(imageUploadHighlightsWatchers),
      forkList(loadAuctionWatchers),
      forkList(lotsGetWatchers),
      forkList(migratePreviewToStagingWatchers),
      forkList(saveHighlightsWatchers),
      forkList(tagsGetWatchers),
      forkList(thumbnailUpdateWatchers),
      forkList(unlockAMSaleWatchers),
      forkList(updateAMSaleWatchers),
      forkList(updateAuctionWatchers),
      forkList(updateLotWatchers),
      forkList(uploadAuctionBannerWatchers),
      forkList(uploadCatalogCoverWatchers),
      forkList(uploadImageWatchers),
      forkList(uploadiOSDesktopBannerWatchers),
      forkList(uploadiOSMobileBannerWatchers),
      forkList(uploadSaleResultsWatchers),
      forkList(uploadWinnerEmailWatchers)
    ];
    yield allWatchers;
  } catch (e) {
    console.error('Problem starting watchers', e.stack);
  }
}
