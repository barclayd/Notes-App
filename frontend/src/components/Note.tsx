import { FC, useState } from 'react';
import { Note as NoteType } from '../types';
import { S3Service } from '../services/S3Service';
import { useAsyncEffect } from '../hooks/useAsyncEffect';

interface Props {
  note: NoteType;
  onClick: () => void;
}

const monthMap = new Map([
  [0, 'January'],
  [1, 'February'],
  [2, 'March'],
  [3, 'April'],
  [4, 'May'],
  [5, 'June'],
  [6, 'July'],
  [7, 'August'],
  [8, 'September'],
  [9, 'October'],
  [10, 'November'],
  [11, 'December'],
]);

const dayMap = new Map([
  [0, 'Monday'],
  [1, 'Tuesday'],
  [2, 'Wednesday'],
  [3, 'Thursday'],
  [4, 'Friday'],
  [5, 'Saturday'],
  [6, 'Sunday'],
]);

const dateSuffixMap = new Map([
  ['1', 'st'],
  ['2', 'nd'],
  ['3', 'rd'],
]);

const dateSuffix = (day: number) => {
  const dayAsString = String(day);
  const lastNumberOfString = dayAsString[dayAsString.length - 1];
  return dateSuffixMap.get(lastNumberOfString) ?? 'th';
};

const noteTimeSuffix = (noteHours: number) => (noteHours >= 12 ? 'PM' : 'AM');

const note12HourTime = (noteHours: number) =>
  noteHours >= 12 ? noteHours - 12 : noteHours;

const s3Service = new S3Service();

export const Note: FC<Props> = ({ note, onClick }) => {
  const [downloadLink, setDownloadLink] = useState(note.attachment);

  const noteDate = new Date(note.createdAt);
  const noteDay = `${dayMap.get(
    noteDate.getDay(),
  )} ${noteDate.getDay()}${dateSuffix(noteDate.getDay())}`;
  const noteMonth = monthMap.get(noteDate.getMonth())!;
  const noteYear = noteDate.getFullYear();
  const noteMinutes =
    noteDate.getMinutes() < 10
      ? `0${noteDate.getMinutes()}`
      : noteDate.getMinutes();
  const noteTime = `${note12HourTime(
    noteDate.getHours(),
  )}:${noteMinutes} ${noteTimeSuffix(noteDate.getHours())}`;
  const noteDateString = `${noteTime} - ${noteDay} ${noteMonth} ${noteYear}`;

  useAsyncEffect(async () => {
    if (!note.attachment) {
      return;
    }
    const s3DownloadLink = await s3Service.get(note.attachment);
    setDownloadLink(s3DownloadLink);
  }, []);

  return (
    <div
      className="bg-white shadow overflow-hidden sm:rounded-lg my-6 rounded-md"
      onClick={onClick}
    >
      <div className="px-4 py-5 sm:px-6 cursor-pointer">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {noteDateString}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Note from web</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Content</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {note.content}
            </dd>
          </div>
          {note.attachment && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">
                        {note.attachment}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={downloadLink}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Open
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};
