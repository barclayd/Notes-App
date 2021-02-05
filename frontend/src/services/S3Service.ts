import { Storage } from 'aws-amplify';

type StorageVault = {
  key: string;
};

export class S3Service {
  public async upload(file: File) {
    const filename = `${Date.now()}-${file.name}`;
    const stored = (await Storage.vault.put(filename, file, {
      contentType: file.type,
    })) as StorageVault;
    return stored.key;
  }
}
