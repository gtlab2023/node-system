'use client'

import { useEffect, useRef, useState } from 'react'
import NotePreview from '@/components/NotePreview'
import { useFormState } from 'react-dom'
import { deleteNote, saveNote } from '../app/actions'
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'

const initialState = {
  message: null,
  errors: null
}

type TNodeEditorProps = {
  noteId: string | null
  initialTitle: string
  initialBody: string
}
export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}:TNodeEditorProps) {

  const [saveState, saveFormAction] = useFormState(saveNote as any, initialState)
  const [delState, delFormAction] = useFormState(deleteNote as any, initialState)

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)

  const isDraft = !noteId

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors)
    }
  }, [saveState])

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <input type="hidden" name="noteId" value={noteId || ''} />
        <div className="note-editor-menu" role="menubar">
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          { saveState?.message }
          { saveState.errors  }
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          输入note信息
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          预览
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}

