/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
import fs, { promises as fsp } from 'fs';
// import readline from 'readline';
import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';
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
type GoogleApiCredentials = {
  installed: {
    /**
     * The application's client ID.
     */
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
};
async function authorize(credentials: GoogleApiCredentials): Promise<OAuth2Client> {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const response = await fsp.readFile(process.env.GDTOKENPATH, 'utf-8');
  oAuth2Client.setCredentials(JSON.parse(response));
  return oAuth2Client;
}
type GAPIList = {
  data: drive_v3.Schema$FileList;
};
async function listFiles(auth: OAuth2Client, pageToken = ''): Promise<GAPIList> {
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
  const data = await drive.files.list(opt);
  return data;
}
async function getDriveList(nextPage = '') {
  try {
    const credentials = await fsp.readFile(process.env.GDCREDPATH, 'utf-8');
    const auth = await authorize(JSON.parse(credentials));
    const response = await listFiles(auth, nextPage);
    return response;
  } catch (e) {
    console.log('err: ', e);
  }
}
async function getFile(auth: OAuth2Client, driveId: string) {
  const drive = google.drive({ version: 'v3', auth });
  const fetchFile = await drive.files.get({
    fileId: driveId,
    fields:
      'kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime'
  });
  return fetchFile;
}

async function getFileApi(req: Request, res: Response): Promise<Response> {
  const credentials = await fsp.readFile(process.env.GDCREDPATH, 'utf-8');
  try {
    const auth = await authorize(JSON.parse(credentials));
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

// INITIAL FUNCTION
// Load client secrets from a local file.
// fs.readFile('./credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   console.log('readfile content: ', content);
//   // Authorize a client with credentials, then call the Google Drive API.
//   authorize(JSON.parse(content), listFiles);
// });
export { authorize, getDriveList, getFileApi, getUser };
