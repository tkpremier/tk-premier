import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  auctionsError,
  auctionsSuccess,
  auctionLotsError,
  auctionLotsSuccess,
  lotComponentsRequested,
  lotComponentsSuccess,
  lotComponentsError,
  lotComponentUpdateSuccess,
  lotComponentUpdateError,
  lotComponentDeleteSuccess,
  lotComponentDeleteError,
  lotComponentImageUploadSuccess,
  lotComponentImageUploadError,
  lotComponentUpdateSubmit,
  editLotComponentData,
  clearSelectedLotComponent,
  setSelectedLotComponent
} from '../actions/lot-components';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  getBaseUrlState,
  getLotComponents,
  getLotComponentsImageUpload,
  getPreviouslySelectedComponentId,
  getSelectedAuctionSaleNumber,
  getSelectedLotComponent,
  getSelectedLotComponentDataIndex,
  getSelectedLotComponentId,
  getSelectedLotComponentIndex,
  getSelectedLotObjectNumber
} from '../selectors';


// === Watchers ===
export const auctionsWatchers = createSagaWatchers({
  [types.AUCTIONS_REQUESTED]: auctionsWorker
});

export const getAuctionLotsWatchers = createSagaWatchers({
  [types.AUCTION_LOTS_REQUESTED]: getAuctionLotsWorker
});

export const getLotComponentsWatchers = createSagaWatchers({
  [types.GET_LOT_COMPONENTS_SUBMIT]: getLotComponentsWorker
});

export const updateLotComponentWatchers = createSagaWatchers({
  [types.UPDATE_LOT_COMPONENT_SUBMIT]: updateLotComponentWorker
});

export const deleteLotComponentWatchers = createSagaWatchers({
  [types.DELETE_LOT_COMPONENT_SUBMIT]: deleteLotComponentWorker
});

export const lotComponentImageUploadWatchers = createSagaWatchers({
  [types.UPLOAD_LOT_COMPONENT_IMAGE_SUBMIT]: lotComponentImageUploadWorker
})

// === Workers ===
export function* auctionsWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const response = yield call(Api.auctions, baseUrl);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(auctionsError(json));
    return;
  }

  yield put(auctionsSuccess(json));
}

export function* getAuctionLotsWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const saleNumber = yield select(getSelectedAuctionSaleNumber);

  const response = yield call(Api.getAuctionLots, baseUrl, saleNumber);

  const { hasError, json, statusCode } = response;
  if (hasError || statusCode !== 200) {
    yield put(auctionLotsError(json));
    return;
  }

  yield put(auctionLotsSuccess(json));
}

export function* getLotComponentsWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const objectNumber = yield select(getSelectedLotObjectNumber);

  const response = yield call(Api.getLotComponents, baseUrl, objectNumber);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(lotComponentsError(json));
    return;
  }

  yield put(lotComponentsSuccess(json));
}

export function* updateLotComponentWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const lotComponents = yield select(getLotComponents);
  const selectedLotComponent = yield select(getSelectedLotComponent);
  const previouslySelectedComponentId = yield select(getPreviouslySelectedComponentId);

  const previouslySelectedlotComponent = lotComponents.find(c => c.componentContainerId === previouslySelectedComponentId);
  const updatedLotComponent = previouslySelectedComponentId === undefined || previouslySelectedlotComponent === undefined
    ? selectedLotComponent
    : previouslySelectedlotComponent;

  // console.log('Update Saga previouslySelectedComponentId: ', previouslySelectedComponentId);
  // console.log('Update Saga lotComponents: ', lotComponents);
  // console.log('Update Saga selectedLotComponent: ', selectedLotComponent);
  // console.log('Update Saga previouslySelectedlotComponent: ', previouslySelectedlotComponent);
  // console.log('Update Saga updatedLotComponent: ', updatedLotComponent);

  const response = yield call(
    Api.saveLotComponents,
    baseUrl,
    updatedLotComponent
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(lotComponentUpdateError(json));
    return;
  }

  yield put(lotComponentUpdateSuccess(json));
  yield put(setSelectedLotComponent(json));
  yield put(lotComponentsRequested());
  yield put(clearSelectedLotComponent());
}

export function* deleteLotComponentWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const lotComponentId = yield select(getSelectedLotComponentId);
  const response = yield call(
    Api.deleteLotComponent,
    baseUrl,
    lotComponentId
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(lotComponentDeleteError(json));
    return;
  }

  yield put(lotComponentDeleteSuccess(json));
  yield put(lotComponentsRequested());
  yield put(clearSelectedLotComponent());
}

export function* lotComponentImageUploadWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const image = yield select(getLotComponentsImageUpload);
  const selectedLotComponent = yield select(getSelectedLotComponent);
  const selectedComponent = yield select(getSelectedLotComponent);
  const selectedLotComponentIndex = yield select(getSelectedLotComponentIndex);
  const selectedLotComponentDataIndex = yield select(getSelectedLotComponentDataIndex);

  const response = yield call(
    Api.uploadLotCarouselImage,
    baseUrl,
    image
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(lotComponentImageUploadError({ message: C.ERROR.GENERAL }));
    return;
  }

  yield put(lotComponentImageUploadSuccess(selectedComponent, json));
  yield put(editLotComponentData(
    selectedLotComponent,
    selectedLotComponentIndex,
    selectedLotComponentDataIndex,
    'imageUrl',
    json.imagePath
  ));
  yield put(lotComponentUpdateSubmit());
  yield put(lotComponentsRequested());
}
