'use strict'

let Conf = {}

Conf.__DEV__ = global.__DEV__

// Conf.DEVELOPMENT = true
// Conf.PRODUCTION = !Conf.DEVELOPMENT

// BUILD VERSION
// follow this: http://stackoverflow.com/questions/2791121/what-every-digit-means-in-software-version-1-7-1-0-for-example
//
// <major ver>.<minor ver>.<revision>.<build number>
// major version - major release (react upgrade, ad system)
// minor version - number may bump for small features (UX improvements, forgot password)
// revision number - bump if you put bug fixes in
// build number - is for app store/play store, needs to be incremented when we upload a new one
Conf.version = '0.0.1.0'

// Build for: (styles, entry point, hook, etc.)
// Conf.BUILD_TARGET = 'CMS'
// Conf.BUILD_TARGET = 'Web'

// Note: This will need to be extracted from the body tag: <body data-domain="@ViewBag.domainUrl" data-apidomain="@ViewBag.apiUrl">
// http://ci-cmsdev/api/auctions/get
// Conf.PHILLIPS_BASE_URL = 'http://ci-cmsdev'
Conf.PHILLIPS_BASE_URL = 'https://devcms.phillips.com'
// Conf.PHILLIPS_BASE_URL = 'http://localhost:8000'

Conf.baseApiUrl = `${Conf.PHILLIPS_BASE_URL}/api`

Conf.ENDPOINTS = {
  auctions: Conf.baseApiUrl + '/auctions/get',
  auctionUpdate: Conf.baseApiUrl + '/auctions/put',
  imageUpload: Conf.baseApiUrl + '/media/image'
}

Conf.OPTIONS = {}

Conf.loggingMiddleware = true   // flag for Redux action + store logging

export default Conf
