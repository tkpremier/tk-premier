import { takeEvery } from 'redux-saga';
import { Cloudinary } from 'cloudinary-core';

import entries from 'lodash/entries';
import includes from 'lodash/includes';
import values from 'lodash/values';

import * as actionTypes from '../actions/action-types';
import * as auctionsActionTypes from '../../AuctionMgmt/actions/action-types';
import * as stickyActionTypes from '../../StickyMgmt/actions/action-types';
import * as catalogueActionTypes from '../../CatalogueSubs/actions/action-types';
import * as pressReleasesActionTypes from '../../PressReleases/actions/action-types';
import * as editorialsActionTypes from '../../EditorialHub/actions/action-types';
import * as makerBiosActionTypes from '../../MakerBios/actions/action-types';
import * as teamPageActionTypes from '../../TeamPage/actions/action-types';
import * as userManagementActionTypes from '../../UserManagement/actions/action-types';
import * as lotComponentActionTypes from '../../LotComponents/actions/action-types';
import Conf from '../../conf';
import '@babel/polyfill';

// --- Utility Functions ---

// Throws error if condition is falsey.
export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    if (typeof Error !== 'undefined') {
      throw new Error(message);
    }
  }
}

// Create a standard action.
export function createAction(type, payload = undefined, meta = undefined) {
  const actionTypesList = {
    ...actionTypes,
    ...auctionsActionTypes,
    ...stickyActionTypes,
    ...catalogueActionTypes,
    ...pressReleasesActionTypes,
    ...editorialsActionTypes,
    ...makerBiosActionTypes,
    ...teamPageActionTypes,
    ...userManagementActionTypes,
    ...lotComponentActionTypes
  };

  assert(typeof type === 'string' &&
         type.length > 0,
         `Type ${type} must be non-empty string!`);
  assert(includes(values(actionTypesList), type),
        `Type ${type} must be a defined action type!`);
  assert(typeof payload === 'undefined' ||
         (typeof payload === 'object' &&
          payload !== null),
          // Object.keys(payload).length),
         `${type} payload must be non-empty object or undefined!`);
  assert(typeof meta === 'undefined' ||
         (typeof meta === 'object' &&
          meta !== null &&
          Object.keys(meta).length),
         `${type} meta must be non-empty object or undefined!`);

  return {
    type,
    ...(payload ? { payload } : {}),
    ...(meta ? { meta } : {})
  };
}

// Create Saga Watchers
export const createSagaWatchers = listenerMap => {
  return entries(listenerMap).map(([actionType, worker]) => {
    return function* () {
      yield* takeEvery(actionType, worker)
    }
  })
}

// Create Error Message
export function createErrorMsg(json, defaultMsg) {
  const { validation_errors, form_error } = json || {}
  const { message, text } = (validation_errors || form_error) || {}
  return message || text || defaultMsg
}

// Returns false if any part of the path does not exist
// (Object, String) => Bool
// EX: pathExists(payload, 'resp.entities.user') // -> false if user is not defined.
function _pathExists(obj, path) {
  return path
    .split('.')
    .reduce((o, path) => {
      if (path.length === 0) {
        return o
      }
      return (o && o[path]) || undefined
    }, obj) !== undefined
}

export function pathExists(obj, ...paths) {
  return paths.every(path => _pathExists(obj, path))
}

export function andLog(thing, name, ...rest) {
  if (Conf.loggingMiddleware) {
    const andRest = rest.length ? rest : ''
    name
      ? console.info(`${name}: `, thing, ...andRest)
      : console.info(thing, ...andRest)
  }
  return thing
}

// Generator forEach:
export function* forEachGen(array, fn) {
  for (var i of array) yield *fn(i)
}

// Object map and utilities:

// small, reusable auxiliary functions
export const keys = o => Object.keys(o)
export const assign = (...o) => Object.assign({}, ...o)
export const map = f => xs => xs.map(x => f(x))
export const mul = y => x => x * y
export const sqr = x => mul(x)(x)

// the actual map function
export const omap = f => o => {
  o = assign(o) // A
  map(x => o[x] = f(o[x]))(keys(o)) // B
  return o
}

// Rename object keys:
export const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}


// Slugify:
export const slugify = (string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// Cloudinary config
export const cloudinaryConfig = Cloudinary.new({
  cloud_name: 'phillips-assets',
  private_cdn: true,
  secure: true,
  secure_distribution: 'assets.phillips.com',
  cname: 'assets.phillips.com'
});

// Array move:
export const arrayMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};
