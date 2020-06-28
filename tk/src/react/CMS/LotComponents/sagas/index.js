import { call, fork } from 'redux-saga/effects';

import {
  auctionsWatchers,
  getAuctionLotsWatchers,
  getLotComponentsWatchers,
  updateLotComponentWatchers,
  deleteLotComponentWatchers,
  lotComponentImageUploadWatchers
} from './lot-components';

// Array<GenFunc> -> Array<GenFunc>
const forkList = (watcherList) => watcherList.map(w => fork(w));

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* periodicTask(task, timeout) {
  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    yield fork(task);
    yield call(delay, timeout);
  }
}

export default function* root() {
  // Run all watchers in parallel
  try {
    const allWatchers = [
      forkList(auctionsWatchers),
      forkList(getAuctionLotsWatchers),
      forkList(getLotComponentsWatchers),
      forkList(updateLotComponentWatchers),
      forkList(deleteLotComponentWatchers),
      forkList(lotComponentImageUploadWatchers)
    ];
    yield allWatchers;
  }
  catch (e) {
    console.error('Problem starting watchers', e.stack);
  }
}
