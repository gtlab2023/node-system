import { useFormStatus } from 'react-dom'

export default function SaveButton({ formAction }:{formAction:any}) {
  const { pending } = useFormStatus()

  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      {pending ? '保存中' : '保存'}
    </button>
  );
}
