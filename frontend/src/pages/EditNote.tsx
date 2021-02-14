import { useHistory, useParams } from 'react-router-dom';
import { NoteService } from '../services/NoteService';
import { useAsyncEffect } from '../hooks/useAsyncEffect';
import { Note } from '../types';
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { NoteConfig } from '../config';
import { usePartialState } from '../hooks/usePartialState';
import { formattedNoteDate } from '../helpers/note';
import { S3Service } from '../services/S3Service';

const s3Service = new S3Service();
const noteService = new NoteService();

export const EditNote: FC = () => {
  const [note, setNote] = usePartialState<Note | undefined>(undefined);
  const [attachmentURL, setAttachmentURL] = useState<string | undefined>(
    note?.attachment,
  );
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const file = useRef<File | undefined>(undefined);

  useAsyncEffect(async () => {
    const note = await noteService.load<Note>(`/notes/${id}`);
    setNote(note);
    if (note?.attachment) {
      const s3DownloadLink = await s3Service.get(note.attachment);
      setAttachmentURL(s3DownloadLink);
    }
  }, [id]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    file.current = event.target.files?.[0];
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!note) {
      return;
    }
    event.preventDefault();
    if (
      (event.nativeEvent as any).submitter.innerText.toLowerCase() === 'delete'
    ) {
      setDeleting(true);
      const confirmed = window.confirm(
        'Are you sure you want to delete this note?',
      );

      if (!confirmed) {
        return;
      }
      await noteService.deleteNote(
        note.noteId,
        () => {
          history.push('/');
        },
        (errorMessage) => {
          alert('Error occurred whilst updating note: ' + errorMessage);
          setLoading(false);
        },
      );
      return;
    }
    if (
      (event.nativeEvent as any).submitter.innerText.toLowerCase() === 'save'
    ) {
      setLoading(true);
      if (
        file.current?.size &&
        file.current!.size > NoteConfig.MAX_ATTACHMENT_SIZE
      ) {
        alert(
          `Uh oh, the file selected exceeds the limit of ${
            NoteConfig.MAX_ATTACHMENT_SIZE / 1000000
          } MB. Please select a new file.`,
        );
        return;
      }
    }
    await noteService.updateNote(
      note,
      () => {
        history.push('/');
      },
      (errorMessage) => {
        alert('Error occurred whilst updating note: ' + errorMessage);
        setLoading(false);
      },
      file.current,
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        {note ? formattedNoteDate(note) : 'Loading note...'}
      </div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Type your note here..."
          defaultValue={note?.content}
          onChange={(event) =>
            setNote({
              content: event.target.value,
            })
          }
        />

        {attachmentURL ? (
          <img
            className="my-4"
            style={{ width: '100%' }}
            alt={note!.attachment}
            src={attachmentURL}
          />
        ) : (
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none my-4"
            spellCheck="false"
            placeholder="Attachment"
            onChange={onFileChange}
            type="file"
          />
        )}

        <div className="icons flex text-gray-500 m-2">
          <svg
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div>
        </div>
        <div className="buttons flex">
          <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </button>
          <button
            type="submit"
            className="btn border p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-red-500"
          >
            {isDeleting ? <Spinner /> : 'Delete'}
          </button>
          <button
            type="submit"
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            {isLoading ? <Spinner /> : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};
