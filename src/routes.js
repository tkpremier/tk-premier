const express = require('express');
const { authorize, listFiles, getFileApi } = require('./services/drive');
const {
  addExp,
  createAdmin,
  createDriveFileApi,
  createModel,
  createUser,
  signInUser,
  updateUserToAdmin
} = require('./services/db');

const getCredentials = () => ({
  installed: {
    client_id: '160250970666-eofi1rkudvcbhf3n3fheaf7acc3mak8c.apps.googleusercontent.com',
    project_id: 'quickstart-1557442132353',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '_SifxYsgMaLTGfTJdvHlNrhv',
    redirect_uris: ['http://localhost:9000', 'http:// localhost:3000']
  }
});
const router = express.Router();
async function getDriveList(req, res) {
  const credentials = getCredentials();
  const auth = await authorize(credentials);
  const newData = await listFiles(auth, req.query.nextPage)
    .then(({ data }) => {
      return res.status(200).send(
        JSON.stringify({
          files: data.files,
          nextPageToken: data.nextPageToken
        })
      );
    })
    .catch(err => {
      console.log('listFiles err: ', err);
      return res.status(500).send(err);
    });
  return newData;
}
router.get('/drive-list', getDriveList);
router.post('/admin', createAdmin);
router.put('/admin', updateUserToAdmin);
router.get('/drive-file', getFileApi);
router.post('/drive-file', createDriveFileApi);
router.post('/login', signInUser);
// router.get('/model', getModel);
router.post('/model', createModel);
router.post('/user', createUser);
router.post('/experience', addExp);
module.exports = router;
