const fsp = require('fs').promises;
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly','https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// credentials 
const cred = {"installed":{"client_id":"160250970666-eofi1rkudvcbhf3n3fheaf7acc3mak8c.apps.googleusercontent.com","project_id":"quickstart-1557442132353","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"_SifxYsgMaLTGfTJdvHlNrhv","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
const { client_secret, client_id, redirect_uris} = cred.installed;
let oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);


/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listFiles(auth, pageToken = '') {

  const drive = google.drive({version: 'v3', auth });
  const opt = {
    pageToken,
    pageSize: 800,
    fields: 'files, nextPageToken'
  };
  const fetch = await drive.files.list(opt);
  // const fileAsync = await getFile("1Q9B8CAXbwqb43txdsz0BwYfbzr1tZQ2n");
  return fetch;
}
// id: "1Q9B8CAXbwqb43txdsz0BwYfbzr1tZQ2n"
async function getFile(auth, fileId) {
  const drive = google.drive({version: 'v3', auth });

  const fetchFile = await drive.files.get({ fileId, fields: '*'});
  return fetchFile;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
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
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const apiCred = {
  "type": "service_account",
  "project_id": "quickstart-1557442132353",
  "private_key_id": "2f64b0969701b67d3e01976de35841536961fd87",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDB7no9RC7zp9dY\nZOmyappplZ5OafgmcjRky0sIVg7AGnF+Lep0f6zzSpKQ/Zxv8fW197l8e2Iv1qf9\nAH7BtzoP127hQMCpV6OXzYhJNieD9r0Rw0/j/+e36FjDOWH9g/b23anghLliGHBq\nMQVYNNNOsm5gXHtTTnMI6voHAhFhfg083grucMqpZMm5ksQul4Fas8RU3yszl9s9\nlkXhwRUxAdB/RDyLC3exccCWd7uMZp9NrOgB5roJjUKX9Ub5fIAX0Y5f1DpzBhYL\nsUmvw6PppI5B0omCDKiq3zQPq9eVqTHi0f1HGLXRcpaUVdEqWrIbZsk+80Y8fChb\nX7fPpVTLAgMBAAECggEANxS612fkRgQn381ZqvkoPlDmk7L5bkIFq5MqDoYSznE0\nRvhXnRseTkOh+Vhu9ESu2y4vGrIYoym+sNdRKUgXT6SKs6OmlPJ1Xopb6R9efda4\nwLDOoh1u/QcbHufPcyfmHxu6QjCwTrJOS3r8356xXarEOs5JoNGpTqEevprRwPSC\n7YmN1Zd6+7eobYfhzgF4WTplKKWN3LD/zu5PxS32LkMZdPoHuk9c+S4JAnkA7Ks+\n8kkr4Q2b/sF1NcCNdE6xnuPSccdmnpkWAViBESwnTLdb0ZcJE5B1XaxVHtB620u8\ne3aUAbbLIq4GZ5FaJUgVsJr+8Ufheyinhkem+Z8zEQKBgQD6wJSMf8H6oJSUKo+9\nMN924GLc2d2QnxyfTxwW0tf7L5Pm6g630ZgrESqBcJAy9qQN7uJttwGXeUjtNprR\n0Vt2S92Nc1XGyI2o+c6jsLHtUXMoBhzkYq2QDHIjf6zetkvzsRUFa2IEncKZ/VlU\nIujIEpDVujDU5nAALhFxPpTr9QKBgQDF/XobHooOdPx9/lpCL5j7SOea8ah6EHem\nxDnkadmDrmXpeMZUK9xwEvcXT+f7X27YJm3ctOImYcLx5rvsRjD3IC9J4CxeLv/N\nnFEik4ffkRZaeZ085LUKSUxuc+rst8ZR0TRTJbG6ue3cVKUM2aTeqjuJq8eMY024\n5tGZs0eFvwKBgQCBoAJq6zSE8nQ8cBAkVlp+4ppY3wtp0scCF+xGZDKguES2D3MS\nVXhbcyFNDrqMjfHa/g3xd7SL8HfhoOPB6X9llOxwThoei9inbJQFDLe+Hefw3dAb\nxGNC3xw1+6+K5iQ3UuiyB4QBLOjHoC+Ijg9WNjrHMdxCgumNPkNoDlj/7QKBgGMU\nAbLoiXXKnT//tPNCFnBJf31OSV0sOHQ/5iijv7Hh6CX5xmYAvQNoujX0SsbEbxfD\nw16bNkC203NyX8BRL9e7R27Uu9817dTa0M9YvLnoRSNpkIIUgXRwUctEPt/O53Oy\nGVkyl8o1mQ6VXTMdByBWWA0A5Y8fcpmBCIq96KDJAoGAIjz61CFxUb84UHcpTHRv\naMMYnUBLX4uE2drjunr/RM4657/x2oeT0bAonok3Z3I3OkNAbZyRktxnWbZ5MONB\nb9KsgeoSuN3tbOKlUS6ogjPmwI+ZFhL9al6WOw/SvnA65d+WVnccolq/YxzA0f7f\nHksHJYyrObRSXJ6MCTF1yCU=\n-----END PRIVATE KEY-----\n",
  "client_email": "pokerteke@quickstart-1557442132353.iam.gserviceaccount.com",
  "client_id": "107761569662280632473",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/pokerteke%40quickstart-1557442132353.iam.gserviceaccount.com"
};
async function authorize() {
  // Check if we have previously stored a token.
  const promise = await fsp.readFile(TOKEN_PATH)
    .then((res) => {
      oAuth2Client.setCredentials(JSON.parse(res));
      return oAuth2Client;
    })
    .catch(err => err);
  return promise;
};

// INITIAL FUNCTION
// Load client secrets from a local file.
// fs.readFile('./credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   console.log('readfile content: ', content);
//   // Authorize a client with credentials, then call the Google Drive API.
//   authorize(JSON.parse(content), listFiles);
// });
module.exports = { authorize, listFiles, getFile };
