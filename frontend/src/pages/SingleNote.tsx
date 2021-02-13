import { useParams } from 'react-router-dom';
import { NoteService } from '../services/NoteService';
import { useAsyncEffect } from '../hooks/useAsyncEffect';
import { Note } from '../types';
import { FC, useState } from 'react';

export const SingleNote: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | undefined>(undefined);
  const notesService = new NoteService();

  useAsyncEffect(async () => {
    const note = await notesService.load<Note>(`/notes/${id}`);
    console.log(note);

    setNote(note);
  }, [id]);

  return <div>Single note</div>;
};
