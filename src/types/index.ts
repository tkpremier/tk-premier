import { Response } from 'express';

export type DriveFile = {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink: string;
  createdTime: string;
  lastViewed: string;
};

type OptionalAll<Type> = {
  [Property in keyof Type]?: string | number | Array<number>;
};

export type NextApiRequestWithQuery = Response & {
  query?: {
    [key: string]: string;
  };
};

export interface ContactDB {
  createdOn: Date;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

export interface Contact {
  createdOn: string;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

export type DriveRowIdentifier = { id: string; drive_id: string };

export type DriveIdentifier = string | number;

export type DriveInsertValue = string | number | null | Array<number>;

export type DriveUpdatePayload = Record<string, string | number | null | Array<number>> & {
  id?: DriveIdentifier;
  driveId?: DriveIdentifier;
  drive_id?: DriveIdentifier;
};

export type DriveDB = {
  id: string;
  driveId: string;
  type: string;
  name: string;
  description?: string;
  webViewLink: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime: string;
  lastViewed?: string | null;
  createdOn: string;
  duration?: number;
  modelId: Array<number>;
};

export type SyncStats = {
  created: number;
  updated: number;
  errors: number;
  processed: number;
  lastPageToken: string | null;
};

export interface ExpDB {
  id: number;
  name: string;
  description: string;
}

export type ODriveFile = OptionalAll<DriveDB>;

export interface DbResponse<T = Record<string, unknown>> {
  rows: Array<T>;
}

export interface ErrorResponse {
  error: string;
}

export type SuccessResponse<T = unknown> = {
  data: T | Array<T>;
};
