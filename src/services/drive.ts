import 'dotenv/config';
import { google } from 'googleapis';
import { DriveFile } from '../types';

const oauth2 = new google.auth.OAuth2(
  process.env.GDCLIENTID!,
  process.env.GD_CLIENT_SECRET!,
  process.env.GD_REDIRECT_URI!
);
oauth2.setCredentials({ refresh_token: process.env.GD_REFRESH_TOKEN! });

const drive = google.drive({ version: 'v3', auth: oauth2 });

async function listFiles(pageSize: number, pageToken: string) {
  const res = await drive.files.list({
    pageSize,
    fields:
      'nextPageToken, files(description, kind, id, name, createdTime, mimeType, name, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata, viewedByMeTime, size)',
    pageToken
  });
  return res;
}
export const getDriveList = async (nextPage = '', pageSize = 50) => {
  try {
    const res = await listFiles(pageSize, nextPage);
    return res;
  } catch (e) {
    console.error('err: ', e);
  }
};
export const updateFile = async (driveId: string, data: Partial<DriveFile>) => {
  const res = await drive.files.update({
    fileId: driveId,
    requestBody: data
  });
  return res;
};

export const getFile = async (driveId: string) => {
  const fetchFile = await drive.files.get({
    fileId: driveId,
    fields:
      'description, kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime, size'
  });
  return fetchFile;
};

export const getUser = async () => {
  const user = await drive.about.get({ fields: 'user' });
  return user;
};
