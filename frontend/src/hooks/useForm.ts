import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState(initialState);
  return {
    form,
    setForm: (event: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [event.target.id]: event.target.value?.trim(),
      });
    },
  };
};
