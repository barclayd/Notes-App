import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { NoteConfig } from '../config';
import { NoteService } from '../services/NoteService';
import { useHistory } from 'react-router-dom';

export const NewNote: FC = () => {
  const file = useRef<File | undefined>(undefined);
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    file.current = event.target.files?.[0];
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      file.current?.size &&
      file.current?.size > NoteConfig.MAX_ATTACHMENT_SIZE
    ) {
      alert(
        `Uh oh, the file selected exceeds the limit of ${
          NoteConfig.MAX_ATTACHMENT_SIZE / 1000000
        } MB. Please select a new file.`,
      );
      return;
    }
    setLoading(true);
    await new NoteService().createNote(
      {
        content: text,
        attachment: file.current,
      },
      () => {
        history.push('/notes');
      },
      (errorMessage) => {
        alert('Error occurred whilst creating note: ' + errorMessage);
        setLoading(false);
      },
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Note
      </div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Type your note here..."
          onChange={(event) => setText(event.target.value)}
        />

        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none my-4"
          spellCheck="false"
          placeholder="Attachment"
          onChange={onFileChange}
          type="file"
        />

        <div className="icons flex text-gray-500 m-2">
          <svg
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            {isLoading ? <Spinner /> : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};
