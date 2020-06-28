import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  editorialsRequested,
  editorialsSuccess,
  editorialsError,
  editorialUpdateSuccess,
  editorialUpdateError,
  editorialArticlesUpdateSuccess,
  editorialArticlesUpdateError,
  editorialArticleDeleteSuccess,
  editorialArticleDeleteError,
  editorialImageUploadSuccess,
  editorialImageUploadError,
  // editComponent,
  editEditorial,
  editEditorialComponentList,
  editEditorialList,
  editorialUpdateSubmit
} from '../actions/editorials';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  getBaseUrlState,
  getEditorials,
  getSelectedEditorial,
  getSelectedEditorialId,
  getEditorialsImageUpload,
  getSelectedComponent,
  getSelectedComponentId
} from '../selectors';


// === Watchers ===
export const getEditorialsWatchers = createSagaWatchers({
  [types.GET_EDITORIALS_SUBMIT]: getEditorialsWorker
});

export const updateEditorialWatchers = createSagaWatchers({
  [types.UPDATE_EDITORIAL_SUBMIT]: updateEditorialWorker
});

export const updateEditorialArticlesWatchers = createSagaWatchers({
  [types.UPDATE_EDITORIAL_ARTICLES_SUBMIT]: updateEditorialArticlesWorker
});

export const deleteEditorialArticleWatchers = createSagaWatchers({
  [types.DELETE_EDITORIAL_ARTICLE_SUBMIT]: deleteEditorialArticleWorker
});

export const editorialImageUploadWatchers = createSagaWatchers({
  [types.UPLOAD_EDITORIAL_IMAGE_SUBMIT]: editorialImageUploadWorker
})

// === Workers ===
export function* getEditorialsWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const response = yield call(Api.editorials, baseUrl);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(editorialsError(json));
    return;
  }

  yield put(editorialsSuccess(json));
}

export function* updateEditorialWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const editorial = yield select(getSelectedEditorial);

  const response = yield call(
    Api.updateEditorials,
    baseUrl,
    editorial
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(editorialUpdateError(json));
    return;
  }

  yield put(editorialUpdateSuccess(json));
  yield put(editorialsRequested());
}

// Not using:
export function* updateEditorialArticlesWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const editorials = yield select(getEditorials);

  const response = yield call(
    Api.updateEditorials,
    baseUrl,
    editorials
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(editorialArticlesUpdateError(json));
    return;
  }

  yield put(editorialArticlesUpdateSuccess(json));
  yield put(editorialsRequested());
}

export function* deleteEditorialArticleWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const editorialId = yield select(getSelectedEditorialId);
  const response = yield call(
    Api.deleteEditorialComponent,
    baseUrl,
    editorialId
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(editorialArticleDeleteError(json));
    return;
  }

  yield put(editorialArticleDeleteSuccess(json));
  yield put(editorialsRequested());
}

export function* editorialImageUploadWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const image = yield select(getEditorialsImageUpload);
  const selectedEditorial = yield select(getSelectedEditorial);
  const selectedComponent = yield select(getSelectedComponent);
  const selectedComponentId = yield select(getSelectedComponentId);

  const response = yield call(
    Api.uploadEditorialImage,
    baseUrl,
    image
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(editorialImageUploadError({ message: C.ERROR.GENERAL }))
    return
  }

  // Breif gymnastics within the saga for synchronosity's sake
  const newComponentList = selectedEditorial.componentData.map(
    component => {
      return (component.componentId === selectedComponentId) ? { ...component, 'imageUrl': json.imagePath } : component
    }
  );

  console.info('****** Image Saga:');
  console.dir(response);

  // yield put(editEditorialComponentList(newComponentList, selectedEditorial));
  console.dir(newComponentList);
  console.dir(selectedComponent);
  console.dir(selectedEditorial);
  yield put(editorialImageUploadSuccess(selectedComponent, json));
  console.dir(json);
  // yield put(editEditorialList(newComponentList))
  yield put(editEditorial(selectedEditorial, 'componentData', newComponentList));
  console.dir(selectedEditorial);
  yield put(editorialUpdateSubmit());
  yield put(editorialsRequested());
}
