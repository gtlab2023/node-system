import { useFormStatus } from 'react-dom'

export default function EditButton({ formAction }) {
  const { pending } = useFormStatus()

  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      {pending ? 'Saving' : 'Done'}
    </button>
  );
}
