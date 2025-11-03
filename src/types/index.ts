import { Response } from 'express';

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

export type DriveFile = {
  id: string;
  driveId: string;
  type: string;
  name: string;
  webViewLink: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime: string;
  lastViewed?: string | null;
  createdOn: string;
  duration?: number;
  modelId: Array<number>;
};

export interface ExpDB {
  id: number;
  name: string;
  description: string;
}

export type ODriveFile = OptionalAll<DriveFile>;

export interface DbResponse<T = Record<string, unknown>> {
  rows: Array<T>;
}

export interface ErrorResponse {
  error: string;
}

export type SuccessResponse<T = unknown> = {
  data: T | Array<T>;
};
