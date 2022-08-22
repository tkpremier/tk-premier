/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
const fs = require('fs');
const fsp = fs.promises;
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
// const SCOPES = [
//   'https://www.googleapis.com/auth/drive.readonly',
//   'https://www.googleapis.com/auth/drive.metadata.readonly'
// ];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
/* async function dataDump(gDriveData) {
  const data = gDriveData.files.filter(file => file.mimeType.indexOf('google-apps') === -1).map(file => file);
  const dbPromises = data.map(async file => {
    const { createdTime, id, mimeType, name, thumbnailLink, webContentLink, webViewLink, viewedByMeTime } = file;
    const thumbnail = thumbnailLink || null;
    const value = [id, mimeType, name, webViewLink, webContentLink, thumbnail, createdTime, viewedByMeTime];
    const dbRow = await createDriveFile(value);
    return dbRow;
  });
  return Promise.all(dbPromises)
    .then(values => values)
    .catch(err => err);
} */
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    if (typeof code !== 'undefined') {
      rl.close();

      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(process.env.GDTOKENPATH, JSON.stringify(token), err => {
          if (err) return console.error(err);
          console.log('Token stored to', process.env.GDTOKENPATH);
        });
        return oAuth2Client;
      });
    }
  });
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const response = await fsp
    .readFile(process.env.GDTOKENPATH, 'utf-8');
  oAuth2Client.setCredentials(JSON.parse(response));
  return oAuth2Client;
}

async function listFiles(auth, pageToken = '') {
  const drive = google.drive({ version: 'v3', auth });
  // api ref for files properties https://developers.google.com/drive/api/v3/reference/files?hl=en_US
  const opt = {
    pageToken,
    pageSize: 800,
    maxResults: 800,
    // fields: 'files, nextPageToken'
    fields:
      'files(kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime), nextPageToken'
  };
  const fetch = await drive.files.list(opt);
  return fetch;
}
async function getDriveList(nextPage = '') {
  try {
    const credentials = await fsp.readFile(process.env.GDCREDPATH, 'utf-8');
    const auth = await authorize(JSON.parse(credentials));
    const response = await listFiles(auth, nextPage);
    return response;
  } catch(e) {
    console.log('err: ', e);
  }
  
}
// id: "1Q9B8CAXbwqb43txdsz0BwYfbzr1tZQ2n"
async function getFile(auth, driveId) {
  const drive = google.drive({ version: 'v3', auth });
  const fetchFile = await drive.files.get({
    fileId: driveId,
    fields:
      'kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime'
  });
  return fetchFile;
}

async function getFileApi(req, res) {
  const credentials = await fsp.readFile(process.env.GDCREDPATH, 'utf-8');
  try {
    const auth = await authorize(JSON.parse(credentials));
    const data = await getFile(auth, req.query.driveId);
    return res.status(200).send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
}

async function getUser(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const user = await drive.about.get({ fields: 'user' });
  return user;
}

// INITIAL FUNCTION
// Load client secrets from a local file.
// fs.readFile('./credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   console.log('readfile content: ', content);
//   // Authorize a client with credentials, then call the Google Drive API.
//   authorize(JSON.parse(content), listFiles);
// });
export { authorize, getDriveList, getFileApi, getUser };
