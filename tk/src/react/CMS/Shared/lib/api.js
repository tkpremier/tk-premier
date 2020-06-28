import { RESPONSE } from '../constants';
import { parsedFetch } from './api-wrapper';

// === Get auctions ===
export function auctions(url) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/auctions/get`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Get individual auction ===
export function getAuction(url, saleNumber) {
  return parsedFetch(
    'getAuction',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/GetCmsAuction?salenumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Put (update) auctions ===
export function auctionUpdate(url, data) {
  return parsedFetch(
    'auctionUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/auctions/put`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Get lots ===
export function lotsGet(url, saleNumber) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/Lots/GetCmsAuctionLots?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Update Lot ===
export function lotUpdate(url, data) {
  return parsedFetch(
    'lotUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/Lots/Post`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Upload lot to cloudinary ===
// /Lots/UploadToCloudinary?saleNumber=NY050218&lotNumber=108
export function uploadLotToCloudinary(url, saleNumber, lotNumber) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/Lots/UploadToCloudinary?saleNumber=${saleNumber}&lotNumber=${lotNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Get Tags ===
export function tagsGet(url) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/Tags/Get`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Update Tag ===
export function tagUpdate(url, data) {
  return parsedFetch(
    'lotUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/Lots/Post`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Image Upload ===
export function imageUpload(url, data) {
  const form = new FormData();
  form.append('imageUrl', data.name);
  form.append('imageType', 'IosBanner');
  form.append('file', data.file);

  return parsedFetch(
    'imageUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/media/image`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === Print Catalog Cover Image Upload ===
export function uploadPrintCatalogCover(url, data, saleNumber) {
  const form = new FormData();
  form.append('imageUrl', data.name);
  form.append('imageType', 'PrintCatalogueCover');
  form.append('file', data.file);
  form.append('saleNumber', saleNumber);

  return parsedFetch(
    'imageUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/auctions/UploadPrintCatalogCover`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === Sale Results File Upload ===
export function uploadSalesResults(url, data, saleNumber) {
  const form = new FormData();
  form.append('file', data.file);
  form.append('saleNumber', saleNumber);

  return parsedFetch(
    'fileUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/auctions/uploadauctionresultspdf`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === Winner Bid Csv File Upload ===
export function uploadWinnerBidEmailResults(url, data, saleNumber) {
  const form = new FormData();
  form.append('file', data.file);
  form.append('saleNumber', saleNumber);

  return parsedFetch(
    'fileUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/mailer/SendWinningBidEmail`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

export function getLastWinnigBidEmailStatus(url, saleNumber) {
  return parsedFetch(
    'fileUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/auctions/getLastWinnigBidEmailStatus?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    }
  );
}


// === Auction Banner Image Upload ===
export function uploadAuctionBanner(url, data, saleNumber) {
  const form = new FormData();
  form.append('imageUrl', data.name);
  form.append('imageType', 'AuctionBannerImage');
  form.append('file', data.file);
  form.append('saleNumber', saleNumber);

  return parsedFetch(
    'imageUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/auctions/uploadauctionbanner`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === Cloudinary Upload ===
export function cloudinaryUpload(url, saleNumber) {
  return parsedFetch(
    'cloudinaryUpload',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/UploadToCloudinary?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function getSaleUploadStatus(url) {
  return parsedFetch(
    'getSaleUploadStatus',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/GetSaleUploadStatus`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}


// === Thumbnail Update ===
export function thumbnailUpdate(url, saleNumber) {
  return parsedFetch(
    'thumbnailUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/UpdateThumbnail?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}


// === Highlights APIs ===
export function getAuctionHighlights(url, saleNumber) {
  return parsedFetch(
    'getAuctionHighlights',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/GetAuctionHighlights?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function saveAuctionHighlight(url, data) {
  return parsedFetch(
    'saveAuctionHighlight',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/SaveHighlight`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

export function uploadHighlightImage(url, data, saleNumber) {
  const form = new FormData();
  form.append('imageUrl', data.name);
  form.append('imageType', 'AuctionHighlightsGalleryModal');
  form.append('saleNumber', saleNumber);
  form.append('file', data.file);

  return parsedFetch(
    'uploadHighlightImage',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/UploadHighlightImage`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

export function deleteAuctionHighlights(url, highlightId) {
  return parsedFetch(
    'deleteAuctionHighlights',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/DeleteHighlight?highlightId=${highlightId}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function pushHighlightsToProd(url, saleNumber) {
  return parsedFetch(
    'getAuctionHighlights',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/MoveHighlightsToProduction?saleNumber=${saleNumber}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function highlightsMigratePreviewToStaging(url, saleNumber) {
  return parsedFetch(
    'highlightsMigratePreviewToStaging',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/MoveHighlightsFromPreviewToProduction?saleNumber=${saleNumber}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function migratePreviewToStaging(url, saleNumber) {
  return parsedFetch(
    'migrateSaleFromPreviewToStaging',
    RESPONSE.HAS_ERROR,
    `${url}/api/Auctions/MigrateSaleFromPreviewToStaging?saleNumber=${saleNumber}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Get catalog subscriptions ===
export function catalogueSubs(url) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/departments/catalogue-subscription`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Put (update) catalog subscriptions ===
export function catalogueSubsUpdate(url, data, departmentId) {
  return parsedFetch(
    'auctionUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/departments/${departmentId}/catalogue-subscription`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
}

// === Put (update) department order ===
export function departmentOrderUpdate(url, data) {
  return parsedFetch(
    'auctionUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/departments/reorder-catalogue-subscription`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
}

// === Update Sticky ===
export function styckyUpdate(url, data) {
  return parsedFetch(
    'stickyUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/websitehomepage/sticky`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

export function styckyImageUpdate(url, data) {
  const form = new FormData();
  form.append('imageUrl', data.name);
  form.append('imageType', 'Sticky');
  form.append('file', data.file);

  return parsedFetch(
    'uploadStickyImage',
    RESPONSE.HAS_ERROR,
    `${url}/api/websitehomepage/sticky-image`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

export function styckyPositionUpdate(url, data) {
  return parsedFetch(
    'updateStickyPosition',
    RESPONSE.HAS_ERROR,
    `${url}/api/websitehomepage/sticky/${data.stickyId}/position/${data.position}`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      }
    }
  );
}

export function deleteSticky(url, stickyId) {
  return parsedFetch(
    'deleteSticky',
    RESPONSE.HAS_ERROR,
    `${url}/api/websitehomepage/sticky/${stickyId}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': '*/*'
      }
    }
  );
}


// === Get Press Releases ===
export function pressReleases(url) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/Press/GetSummary`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Get Press Release ===
export function pressReleaseArticle(url, pressReleaseId) {
  return parsedFetch(
    'auctions',
    RESPONSE.HAS_ERROR,
    `${url}/api/Press/GetPressRelease?pressReleaseId=${pressReleaseId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Put (update) Press Releases ===
export function updatePressRelease(url, data) {
  return parsedFetch(
    'auctionUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/Press/SavePressRelease`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Delete Press Releases ===
export function deletePressRelease(url, pressReleaseId) {
  return parsedFetch(
    'deletepressRelease',
    RESPONSE.HAS_ERROR,
    `${url}/api/press/DeletePressRelease?pressReleaseId=${pressReleaseId}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': '*/*'
      }
    }
  );
}

// === Upload Press Release PDF ===
export function uploadPressReleasePDF(url, data, title) {
  const form = new FormData();
  form.append('fileType', 'Press');
  form.append('file', data.file);
  form.append('title', title);

  return parsedFetch(
    'uploadPressReleasePDF',
    RESPONSE.HAS_ERROR,
    `${url}/api/press/uploadpresspdf`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === Editorial APIs ===
// === Get Editorial Page ===
export function editorials(url) {
  return parsedFetch(
    'editorials',
    RESPONSE.HAS_ERROR,
    `${url}/api/editorial/content`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Put (update) Editorial Page ===
export function updateEditorials(url, data) {
  return parsedFetch(
    'editorialUpdate',
    RESPONSE.HAS_ERROR,
    `${url}/api/editorial/content`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Delete Editorial Component ===
export function deleteEditorialComponent(url, editorialId) {
  return parsedFetch(
    'deleteEditorial',
    RESPONSE.HAS_ERROR,
    `${url}/api/editorial/content/${editorialId}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': '*/*'
      }
    }
  );
}

// === Upload Editorial Image ===
export function uploadEditorialImage(url, data) {
  const form = new FormData();
  // form.append('imageUrl', data.name)
  form.append('imageType', 'EditorialArticle');
  form.append('file', data.file);

  return parsedFetch(
    'uploadEditorialImage',
    RESPONSE.HAS_ERROR,
    `${url}/api/editorial/image`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === cache purge ===
export function websiteCachePurge(url, selectedcacheEndpoint) {
  const form = new FormData();
  if (selectedcacheEndpoint.hasInput) {
    form.append(selectedcacheEndpoint.input.key, selectedcacheEndpoint.input.value);
  }
  const fullUrl = `${url}${selectedcacheEndpoint.endpoint}`.toLowerCase().replace('//cache', '/cache');

  return parsedFetch(
    'websiteCachePurge',
    RESPONSE.HAS_ERROR,
    `${fullUrl}?key=MjZlZTUxMmQtOTU3ZC00OTAyLWIxNDAtNTNiOTZmYjdiY2ExOlBISUxMSVBTV0VCU0lURQ==`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// === Get Maker Bios ===
export function getMakerBios(url) {
  return parsedFetch(
    'get maker',
    RESPONSE.HAS_ERROR,
    `${url}/api/maker`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Delete Maker Bio ===
// export function deleteMakerBio(url, makerId) {
//   return parsedFetch(
//     'delete maker bio',
//     RESPONSE.HAS_ERROR,
//     `${url}/api/editorial/content/${makerId}`,
//     {
//       method: 'DELETE',
//       headers: {
//         'Accept': '*/*'
//       }
//     }
//   );
// }

// === Update Maker Bio ===
export function updateMakerBio(url, id, data) {
  return parsedFetch(
    'Update maker bio',
    RESPONSE.HAS_ERROR,
    `${url}/api/maker/${id}`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Team Page
// === Get Team Members ===
export function getTeamMembers(url) {
  return parsedFetch(
    'getTeamMembers',
    RESPONSE.HAS_ERROR,
    `${url}/api/TeamMembers/Get`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Delete Team Member ===
export function deleteTeamMember(url, data) {
  return parsedFetch(
    'deleteTeamMember',
    RESPONSE.HAS_ERROR,
    `${url}/api/TeamMembers/Delete`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Update Team Member ===
export function updateTeamMember(url, data) {
  return parsedFetch(
    'updateTeamMember',
    RESPONSE.HAS_ERROR,
    `${url}/api/TeamMembers/Post`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Upload Team Member Image ===
export function uploadTeamMemberImage(url, data, email, currentEmail) {
  const form = new FormData();
  form.append('file', data.file);
  form.append('email', email);
  form.append('currentEmail', currentEmail);

  return parsedFetch(
    'uploadTeamMemberImage',
    RESPONSE.HAS_ERROR,
    `${url}/api/TeamMembers/UploadImage`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}

// +++ User Management +++
// === Bids Login ===
export function bidsLogin(apiUrl, userName, password, clientId) {
  return parsedFetch(
    'bidsLogin',
    RESPONSE.HAS_ERROR,
    `${apiUrl}universalaccount/login`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `basic ${clientId}`
      },
      body: JSON.stringify({
        'Login': userName,
        'Password': password
      })
    }
  );
}

export function getUsers(url, queryString) {
  return parsedFetch(
    'get users',
    RESPONSE.HAS_ERROR,
    `${url}/api/Users/GetUserByFragment?userFragment=${queryString}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

export function getUserDetails(apiUrl, token, userId) {
  return parsedFetch(
    'get user details',
    RESPONSE.HAS_ERROR,
    `${apiUrl}user/${userId}/details`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }
  );
}

export function updateUser(apiUrl, token, userId, user) {
  return parsedFetch(
    'Update user details',
    RESPONSE.HAS_ERROR,
    `${apiUrl}user/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify({
        ...user
      })
    }
  );
}

// Get Countries:
export function getCountries(apiUrl) {
  return parsedFetch(
    'get users',
    RESPONSE.HAS_ERROR,
    `${apiUrl}lookup/countries`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// Get States:
export function getStates(apiUrl) {
  return parsedFetch(
    'get users',
    RESPONSE.HAS_ERROR,
    `${apiUrl}lookup/states`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// Auction Mobility:
// === Get Auction Mobility Sale ===
export function getAuctionMobilitySale(url, saleNumber) {
  return parsedFetch(
    'getAuctionMobilitySale',
    RESPONSE.HAS_ERROR,
    `${url}/api/AuctionMobilityAuctions/GetAuctionMobilitySale?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Get Uosert Auction Mobility Sale ===
export function getUpsertAuction(
  url,
  saleNo,
  calendarId,
  includeAuctionImage,
  includeLotImages,
  includeLots,
  publicationStatus,
  duration,
  bidThreshold
) {
  return parsedFetch(
    'getUpsertAuction',
    RESPONSE.HAS_ERROR,
    `${url}/api/AuctionMobilityAuctions/GetUpsertAuction?saleNo=${saleNo}&calendarId=${calendarId}&includeAuctionImage=${includeAuctionImage}&includeLotImages=${includeLotImages}&includeLots=${includeLots}&publicationStatus=${publicationStatus}&duration=${duration}&bidThreshold=${bidThreshold}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Get Auction Mobility Sale ===
export function putResetAuctionMobilityStatus(url, saleNumber) {
  return parsedFetch(
    'putResetAuctionMobilityStatus',
    RESPONSE.HAS_ERROR,
    `${url}/api/AuctionMobilityAuctions/PutResetAuctionMobilityStatus?saleNumber=${saleNumber}`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}


// === Lot Components API Calls ===

// === Get Auction Lots ===
// /api/Lots/GetAuctionLots?saleNumber={saleNumber}
export function getAuctionLots(url, saleNumber) {
  return parsedFetch(
    'getAuctionLots',
    RESPONSE.HAS_ERROR,
    `${url}/api/Lots/GetAuctionLots?saleNumber=${saleNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}


// === Get Auction Lot ===
// /api/Lots/GetAuctionLot
export function getAuctionLot(url, saleNumber, lotNumber) {
  return parsedFetch(
    'getAuctionLot',
    RESPONSE.HAS_ERROR,
    `${url}/api/Lots/GetAuctionLot?saleNumber=${saleNumber}&lotNumber=${lotNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}


// === Get Lot Components ===
// /api/lot-component/{objectNumber}
export function getLotComponents(url, objectNumber) {
  return parsedFetch(
    'getLotComponents',
    RESPONSE.HAS_ERROR,
    `${url}/api/lot-component/${objectNumber}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Save Lot Components ===
export function saveLotComponents(url, data) {
  return parsedFetch(
    'saveLotComponents',
    RESPONSE.HAS_ERROR,
    `${url}/api/lot-component/`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  );
}

// === Delete Lot Component ===
// /api/lot-component/content/{componentId}
export function deleteLotComponent(url, componentId) {
  return parsedFetch(
    'deleteLotComponent',
    RESPONSE.HAS_ERROR,
    `${url}/api/lot-component/${componentId}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

// === Save Lot Carousel Image ===
// /api/lot-component/image
export function uploadLotCarouselImage(url, data) {
  const form = new FormData();
  form.append('file', data.file);
  form.append('imageType', 'LotComponent');

  return parsedFetch(
    'uploadLotCarouselImage',
    RESPONSE.HAS_ERROR,
    `${url}/api/lot-component/image`,
    {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: form
    }
  );
}
