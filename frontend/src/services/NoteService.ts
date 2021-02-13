import { API } from 'aws-amplify';
import { S3Service } from './S3Service';
import { config } from '../config';

type Note = {
  content: string;
  attachment?: File;
};

export class NoteService {
  constructor(
    private s3Service: S3Service = new S3Service(),
    private apiName: string = config.endpointName,
  ) {}

  public async load<T>(path: string): Promise<T | undefined> {
    try {
      return (await API.get(this.apiName, path, undefined)) as T;
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      return;
    }
  }

  public async createNote(
    { content, attachment }: Note,
    onSuccess: () => void,
    onError: (message: string) => void,
  ) {
    try {
      const attachmentKey = attachment
        ? await this.s3Service.upload(attachment)
        : undefined;
      await API.post('notes', '/notes', {
        body: {
          content,
          attachment: attachmentKey,
        },
      });
      onSuccess();
    } catch (error) {
      onError(error);
    }
  }
}
