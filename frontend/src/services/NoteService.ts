import { API } from 'aws-amplify';
import { S3Service } from './S3Service';
import { config } from '../config';
import { Note } from '../types';

type RawNote = {
  content: string;
  attachment?: File;
};

export class NoteService {
  private readonly basePath: string;

  constructor(
    private s3Service: S3Service = new S3Service(),
    private apiName: string = config.endpointName,
  ) {
    this.basePath = `/${apiName}`;
  }

  public async load<T>(path: string): Promise<T | undefined> {
    try {
      return (await API.get(this.apiName, path, {
        attachment: 'attachment',
      })) as T;
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      return;
    }
  }

  public async createNote(
    { content, attachment }: RawNote,
    onSuccess: () => void,
    onError: (message: string) => void,
  ) {
    try {
      const attachmentKey = attachment
        ? await this.s3Service.upload(attachment)
        : undefined;
      await API.post(this.apiName, '/notes', {
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

  public async updateNote(
    note: Note,
    onSuccess: () => void,
    onError: (message: string) => void,
    attachment?: File,
  ) {
    try {
      const attachmentKey = attachment
        ? await this.s3Service.upload(attachment)
        : note.attachment;
      note.attachment = attachmentKey;
      await API.put('notes', `${this.basePath}/${note.noteId}`, {
        body: {
          content: note.content,
          attachment: attachmentKey,
        },
      });
      onSuccess();
    } catch (error) {
      onError(error);
    }
  }

  public async deleteNote(
    noteId: string,
    onSuccess: () => void,
    onError: (message: string) => void,
  ) {
    try {
      await API.del('notes', `${this.basePath}/${noteId}`, undefined);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  }
}
