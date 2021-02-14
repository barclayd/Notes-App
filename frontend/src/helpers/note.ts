import { Note } from '../types';

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
  [0, 'Sunday'],
  [1, 'Monday'],
  [2, 'Tuesday'],
  [3, 'Wednesday'],
  [4, 'Thursday'],
  [5, 'Friday'],
  [6, 'Saturday'],
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
  noteHours > 12 ? noteHours - 12 : noteHours;

export const formattedNoteDate = (note: Note) => {
  const noteDate = new Date(note.createdAt);
  const noteDay = `${dayMap.get(
    noteDate.getDay(),
  )} ${noteDate.getDate()}${dateSuffix(noteDate.getDay())}`;
  const noteMonth = monthMap.get(noteDate.getMonth())!;
  const noteYear = noteDate.getFullYear();
  const noteMinutes =
    noteDate.getMinutes() < 10
      ? `0${noteDate.getMinutes()}`
      : noteDate.getMinutes();
  const noteTime = `${note12HourTime(
    noteDate.getHours(),
  )}:${noteMinutes} ${noteTimeSuffix(noteDate.getHours())}`;
  return `${noteTime} - ${noteDay} ${noteMonth} ${noteYear}`;
};
