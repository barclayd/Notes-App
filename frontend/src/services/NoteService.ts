import { API } from 'aws-amplify';
import { S3Service } from './S3Service';

type Note = {
  content: string;
  attachment?: File;
};

export class NoteService {
  constructor(private s3Service: S3Service = new S3Service()) {}

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
