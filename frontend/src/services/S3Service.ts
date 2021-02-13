import { Storage } from 'aws-amplify';

type StorageVaultPut = {
  key: string;
};

export class S3Service {
  public async upload(file: File) {
    const filename = `${Date.now()}-${file.name}`;
    const stored = (await Storage.vault.put(filename, file, {
      contentType: file.type,
    })) as StorageVaultPut;
    return stored.key;
  }

  public async get(fileName: string) {
    return (await Storage.vault.get(fileName)) as string;
  }
}
