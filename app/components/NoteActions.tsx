"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader, Loader2, Trash } from 'lucide-react';


interface NoteActionsProps {
  noteId: string;
  onDelete: (noteId: string) => void;
}

const NoteActions: React.FC<NoteActionsProps> = ({ noteId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await onDelete(noteId);
    setLoading(false);
  }

  return (
    <form onSubmit={handleDelete}>
      <input type='hidden' name='noteId' value={noteId} />
      <Button variant={"destructive"} size={"icon"} type='submit' disabled={loading}>
        {loading ? <Loader /> : <Trash className='h-4 w-4' />}
      </Button>
    </form>
  );
};

export default NoteActions;
