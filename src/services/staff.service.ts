import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IStaffEntity } from 'src/shared/interfaces';
import mastersMock from 'src/shared/misc/staff.mock';
import { Storage } from '@google-cloud/storage';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage({
  keyFilename: 'beautysaloon-e851d-firebase-adminsdk-orkdt-cb7e2baec2.json'
});

const bucket = storage.bucket('gs://beautysaloon-e851d.appspot.com');

@Injectable()
export class StaffService extends InMemoryDbService<IStaffEntity> {

  constructor() {
    super();
    this.createMany(mastersMock);
  }

  public uploadPhoto(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = `${uuidv4()}${extname(file.originalname)}`;
      const blob = bucket.file(fileName);

      const blobWriter = blob.createWriteStream({
        metadata: { contentType: file.mimetype, },
      });

      blobWriter.on('error', err => reject(err));

      blobWriter.on('finish', () => {
        resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`)
      });

      blobWriter.end(file.buffer);
    })
  }

}