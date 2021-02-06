import { useAppContext } from '../libs/contextLib';
import { useEffect, useState } from 'react';
import { NoteService } from '../services/NoteService';

type Note = {
  content: string;
  createdAt: number;
  noteId: string;
  userId: string;
};

export const Notes = () => {
  const { isAuthenticated } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    (async () => {
      const notes = await new NoteService().load<Note[]>('/notes');
      console.log({ notes });
      setNotes(notes ?? []);
      setLoading(false);
    })();
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return <div>Getting a fresh copy of your notes...</div>;
  }

  return (
    <div className="notes">
      <h2 className="pb-3 my-3">Your Notes</h2>
    </div>
  );
};
