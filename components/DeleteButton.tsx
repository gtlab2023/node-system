import { useFormStatus } from 'react-dom'

export default function DeleteButton({ isDraft, formAction }:{isDraft:boolean,formAction:any}) {
  const { pending } = useFormStatus()
  return !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <img
          src="/cross.svg"
          width="10px"
          height="10px"
          alt=""
          role="presentation"
        />
        删除
      </button>
    )
}
