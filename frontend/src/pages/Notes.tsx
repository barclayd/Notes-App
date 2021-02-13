import { useAppContext } from '../libs/contextLib';
import { useEffect, useState } from 'react';
import { NoteService } from '../services/NoteService';
import { Note as NoteType } from '../types';
import { Note } from '../components/Note';
import { useHistory } from 'react-router-dom';

export const Notes = () => {
  const { isAuthenticated } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const router = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    (async () => {
      const notes = await new NoteService().load<NoteType[]>('/notes');
      console.log({ notes });
      setNotes(notes ?? []);
      setLoading(false);
    })();
  }, [isAuthenticated]);

  const onCreateNewNoteClick = () => {
    router.push('/notes/new');
  };
  const onNoteClick = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  if (isLoading || !isAuthenticated) {
    return <div>Getting a fresh copy of your notes...</div>;
  }

  return (
    <div className="notes">
      <div className="flex justify-end items-center">
        <button
          onClick={onCreateNewNoteClick}
          className="bg-blue-300 text-white px-3 mx-1 py-2 rounded-md text-sm font-medium focus:outline-none"
        >
          Create New Note
        </button>
      </div>
      <h1 className="pb-3 my-3 text-4xl font-bold">Your Notes</h1>
      {notes.map((note) => (
        <Note
          key={note.noteId}
          note={note}
          onClick={() => onNoteClick(note.noteId)}
        />
      ))}
    </div>
  );
};
