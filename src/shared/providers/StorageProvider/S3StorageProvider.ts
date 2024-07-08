import { uploadConfig } from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

export class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1'
    });
  }

  public async saveFile(file: string) {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);

    const mime = require('mime'); // importação não tava funcionando
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found.');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  public async deleteFile(file: string) {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file
      })
      .promise();
  }
}
