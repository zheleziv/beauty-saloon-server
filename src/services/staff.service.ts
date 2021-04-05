import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IStaffEntity } from 'src/shared/interfaces';
import { FIREBASE_STORAGE_HOST, FIREBASE_STORAGE_BUCKET, FIREBASE_STOREAGE_KEYFILE } from 'src/shared/constants';
import mastersMock from 'src/shared/misc/staff.mock';
import { Bucket, Storage } from '@google-cloud/storage';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StaffService extends InMemoryDbService<IStaffEntity> {

  bucket: Bucket;

  constructor() {
    super();

    this._initStorage();
    this.createMany(mastersMock);
  }

  public uploadPhoto(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = `${uuidv4()}${extname(file.originalname)}`;
      const blob = this.bucket.file(fileName);

      const blobWriter = blob.createWriteStream({
        metadata: { contentType: file.mimetype, },
      });

      blobWriter.on('error', err => reject(err));
      blobWriter.on('finish', () => resolve(this._getFileUrl(blob.name)));
      blobWriter.end(file.buffer);
    })
  }

  private _getFileUrl(blobName: string): string {
    return `${FIREBASE_STORAGE_HOST}/v0/b/${this.bucket.name}/o/${encodeURI(blobName)}?alt=media`;
  }

  private _initStorage() {
    const storage = new Storage({ keyFilename: FIREBASE_STOREAGE_KEYFILE });    
    this.bucket = storage.bucket(FIREBASE_STORAGE_BUCKET);
  }

}