import { uploadConfig } from '@config/upload';
import fs from 'fs';
import path from 'path';

export class DiskStorageProvider {
  public async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.directory, file)
    );
  }

  public async deleteFile(file: string) {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
