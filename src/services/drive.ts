import 'dotenv/config';
import { Request, Response } from 'express';
import { google } from 'googleapis';
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }
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
/* async function saveCredentials(client) {
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
} */

const oauth2 = new google.auth.OAuth2(
  process.env.GDCLIENTID!,
  process.env.GD_CLIENT_SECRET!,
  process.env.GD_REDIRECT_URI!
);
oauth2.setCredentials({ refresh_token: process.env.GD_REFRESH_TOKEN! });

const drive = google.drive({ version: 'v3', auth: oauth2 });

/**
 * Load or request or authorization to call APIs.
 *
 */
/* async function authorize() {
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
} */

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(pageSize, pageToken) {
  const res = await drive.files.list({
    pageSize,
    fields:
      'nextPageToken, files(description, kind, id, name, createdTime, mimeType, name, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata, viewedByMeTime, size)',
    pageToken
  });
  return res;
}
async function getDriveList(nextPage = '', pageSize = 50) {
  try {
    const res = await listFiles(pageSize, nextPage);
    return res;
  } catch (e) {
    console.log('err: ', e);
  }
}
async function getFile(driveId: string) {
  const fetchFile = await drive.files.get({
    fileId: driveId,
    fields:
      'description, kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime, size'
  });
  return fetchFile;
}

async function getFileApi(req: Request, res: Response): Promise<Response> {
  try {
    const data = await getFile(req.params.driveId.toString());
    return res.status(200).send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
}

async function getUser() {
  const user = await drive.about.get({ fields: 'user' });
  return user;
}

export { getDriveList, getFileApi, getUser };
