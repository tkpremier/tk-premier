'use strict'

import * as types from '../actions/action-types'
import { uploadImage as initialState } from '../initial-state'

export default function uploadImage(state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_IMAGE_SUBMIT:
      return {
        ...state
      }

    case types.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadedImage: action.payload,
        auctionEdited: false
      }

    case types.UPLOAD_IOSMOBILEBANNER_SUBMIT:
      return {
        ...state
      }

    case types.UPLOAD_IOSMOBILEBANNER_SUCCESS:
      return {
        ...state,
        uploadediOSMobileBanner: action.payload,
        auctionEdited: false
      }

    case types.UPLOAD_IOSDESKTOPBANNER_SUBMIT:
      return {
        ...state
      }

    case types.UPLOAD_IOSDESKTOPBANNER_SUCCESS:
      return {
        ...state,
        uploadedImage: action.payload,
        auctionEdited: false
      }

    case types.UPLOAD_CATALOG_COVER_SUBMIT:
      return {
        ...state
      }

    case types.UPLOAD_CATALOG_COVER_SUCCESS:
      return {
        ...state,
        uploadedImage: action.payload,
        auctionEdited: false
      }

    case types.UPLOAD_AUCTION_BANNER_SUBMIT:
      return {
        ...state
      }

    case types.UPLOAD_AUCTION_BANNER_SUCCESS:
      return {
        ...state,
        uploadedImage: action.payload,
        auctionEdited: false
      }

    case types.SET_UPLOAD_IMAGE:
      return {
        ...state,
        [action.imageLabel]: action.uploadImage
      }

    case types.CLEAR_UPLOAD_IMAGE:
      return {
        ...state,
        [action.imageLabel]: { preview: '' }
      }

    case types.AUCTION_SELECTED:
      return {
        ...state,
        iosBannerDesktop: { preview: '' },
        iosBannerMobile: { preview: '' }
      }

    default:
      return state

  }
}
