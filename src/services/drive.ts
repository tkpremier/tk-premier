/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
import { Request, Response } from 'express';
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}
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
}
type GoogleApiCredentials = {
  installed: {
    // The application's client ID.
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
}; */

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH
  });
  console.log('client: ', client);
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(authClient, pageSize, pageToken) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize,
    fields:
      'nextPageToken, files(kind, id, name, createdTime, mimeType, name, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata, viewedByMeTime)',
    pageToken
  });
  return res;
}
async function getDriveList(nextPage = '', pageSize = 50) {
  try {
    const auth = await authorize();
    const res = await listFiles(auth, pageSize, nextPage);
    return res;
  } catch (e) {
    console.log('err: ', e);
  }
}
async function getFile(auth, driveId: string) {
  const drive = google.drive({ version: 'v3', auth });
  const fetchFile = await drive.files.get({
    fileId: driveId,
    fields:
      'kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime'
  });
  return fetchFile;
}

async function getFileApi(req: Request, res: Response): Promise<Response> {
  try {
    const auth = await authorize();
    const data = await getFile(auth, req.params.driveId.toString());
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

export { authorize, getDriveList, getFileApi, getUser };
