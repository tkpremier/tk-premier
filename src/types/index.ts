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

export type ODriveFile = OptionalAll<DriveFile>;
