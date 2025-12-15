import 'dotenv/config';
import { drive_v3, google } from 'googleapis';
import { DriveFile, SyncStats } from '../types';
import { createDrive, deleteDrive, updateDrive } from './db/drive';
import { getExistingDriveIdentifiers } from './db/utils';

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
export const getDriveList = async (nextPage = '', pageSize = 1000) => {
  try {
    const res = await listFiles(pageSize, nextPage);
    return res;
  } catch (e) {
    console.error('err: ', e);
  }
};

const deriveDriveType = (mimeType?: string | null) => {
  if (!mimeType) {
    return 'unknown';
  }
  if (mimeType === 'application/vnd.google-apps.folder') {
    return 'folder';
  }
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  return mimeType;
};

const buildInsertValues = (file: drive_v3.Schema$File) => {
  const rawDuration = file.videoMediaMetadata?.durationMillis;
  const parsedDuration = rawDuration !== undefined ? Number(rawDuration) : null;
  const duration = Number.isFinite(parsedDuration ?? NaN) ? parsedDuration : null;

  return [
    file.id!,
    file.id!,
    deriveDriveType(file.mimeType),
    file.name ?? '',
    file.webViewLink ?? '',
    file.webContentLink ?? file.webViewLink ?? '',
    file.thumbnailLink ?? null,
    file.createdTime,
    file.viewedByMeTime ?? file.createdTime,
    duration,
    [] as number[],
    file.description ?? null,
    file.size ?? null
  ];
};

const buildUpdatePayload = (file: drive_v3.Schema$File, existingId?: string) => {
  const rawDuration = file.videoMediaMetadata?.durationMillis;
  const parsedDuration = rawDuration !== undefined ? Number(rawDuration) : null;
  const duration = Number.isFinite(parsedDuration ?? NaN) ? parsedDuration : null;
  return {
    id: existingId ?? file.id!,
    driveId: existingId ?? file.id!,
    type: deriveDriveType(file.mimeType),
    name: file.name ?? '',
    webViewLink: file.webViewLink ?? '',
    webContentLink: file.webContentLink ?? file.webViewLink ?? '',
    thumbnailLink: file.thumbnailLink ?? null,
    createdTime: file.createdTime,
    lastViewed: file.viewedByMeTime ?? file.createdTime,
    duration,
    description: file.description ?? null,
    size: file.size ?? null
  };
};

export const syncDriveFiles = async (nextPage = '', pageSize = 1000): Promise<SyncStats> => {
  const existingRecords = await getExistingDriveIdentifiers();
  const stats: SyncStats = {
    created: 0,
    updated: 0,
    errors: 0,
    processed: 0,
    lastPageToken: null,
    deleted: 0
  };

  // Track which drive_ids from the database were seen in the API response
  const seenDriveIds = new Set<string>();

  let pageToken = nextPage;

  do {
    const response = await getDriveList(pageToken, pageSize);
    if (!response?.data) {
      break;
    }

    const { files = [], nextPageToken } = response.data;

    for (const file of files) {
      if (!file?.id) {
        continue;
      }

      stats.processed += 1;
      seenDriveIds.add(file.id);

      try {
        if (existingRecords.has(file.id)) {
          const existingId = existingRecords.get(file.id);
          await updateDrive(buildUpdatePayload(file, existingId));
          stats.updated += 1;
        } else {
          const rows = await createDrive(buildInsertValues(file));
          const createdRow = rows?.[0] as { id?: string } | undefined;
          const newRecordId = createdRow?.id ?? file.id;
          existingRecords.set(file.id, newRecordId);
          stats.created += 1;
        }
      } catch (error) {
        console.error(`Failed to sync drive file ${file.id}`, error);
        stats.errors += 1;
      }
    }

    pageToken = nextPageToken ?? '';
    stats.lastPageToken = nextPageToken ?? null;
  } while (pageToken);

  // Find drive_ids that exist in the database but weren't seen in the API response
  const deletedDriveIds = Array.from(existingRecords.keys()).filter(driveId => !seenDriveIds.has(driveId));

  // Delete the drive files that no longer exist in Google Drive
  for (const driveId of deletedDriveIds) {
    const databaseId = existingRecords.get(driveId);
    if (databaseId) {
      try {
        await deleteDrive(databaseId);
        console.log(`Deleted drive file ${driveId} (id: ${databaseId})`);
        stats.deleted += 1;
      } catch (error) {
        console.error(`Failed to delete drive file ${driveId} (id: ${databaseId})`, error);
        stats.errors += 1;
      }
    }
  }

  return stats;
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

export const getMultipleFiles = async (fileIds: string[]) => {
  const filePromises = fileIds.map(fileId =>
    drive.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType, size' // Specify the fields you need
    })
  );

  try {
    const results = await Promise.all(filePromises);
    return results.map(res => res.data);
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};
