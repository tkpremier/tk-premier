const fs = require('fs');
const fsp = require('fs').promises;
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listFiles(auth, pageToken = '') {
  const drive = google.drive({ version: 'v3', auth });
  const opt = {
    pageToken,
    pageSize: 800,
    fields: 'files, nextPageToken'
  };
  const fetch = await drive.files.list(opt).then(res => {
    // handleFileDump(res.data.files);
    const dbData = res.data.files
      .filter(file => file.mimeType.indexOf('google-apps') === -1)
      .map(({
        createdTime,
        id,
        mimeType,
        name,
        thumbnailLink,
        webContentLink,
        webViewLink,
        viewedByMeTime
      }) => ({
        createdTime,
        id,
        mimeType,
        name,
        thumbnailLink,
        webContentLink,
        webViewLink,
        viewedByMeTime
      }));
    fsp.writeFile('drive-files-dump.json', JSON.stringify(dbData, null, 2))
      .then(() => console.log('dump complete :)'))
      .catch((err) => console.log("dump err :( ", err));
    return res;
  });;
  // const fileAsync = await getFile("1Q9B8CAXbwqb43txdsz0BwYfbzr1tZQ2n");
  return fetch;
}
// id: "1Q9B8CAXbwqb43txdsz0BwYfbzr1tZQ2n"
async function getFile(auth, fileId) {
  const drive = google.drive({ version: 'v3', auth });
  const fetchFile = await drive.files.get({ fileId, fields: '*' });
  return fetchFile;
}

async function getUser(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const user = await drive.about.get({ fields: 'user' });
  return user;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    if (typeof code !== 'undefined') {
      rl.close();

      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(process.env.GDTOKENPATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', process.env.GDTOKENPATH);
        });
        return oAuth2Client;
      });
    }

  });
}

// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  const promise = await fsp.readFile(process.env.GDTOKENPATH, { 'encoding': 'utf8' })
    .then((res) => {
      oAuth2Client.setCredentials(JSON.parse(res));
      return oAuth2Client;
    })
    .catch(err => {
      console.log('err: ', err);
      return getAccessToken(oAuth2Client);
    });
  return promise;
}


// INITIAL FUNCTION
// Load client secrets from a local file.
// fs.readFile('./credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   console.log('readfile content: ', content);
//   // Authorize a client with credentials, then call the Google Drive API.
//   authorize(JSON.parse(content), listFiles);
// });
module.exports = { authorize, listFiles, getFile, getUser };
