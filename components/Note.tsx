import dayjs from 'dayjs';
import NotePreview from '@/components/NotePreview'
import EditButton from '@/components/EditButton'

type TNoteProps = {
  noteId: string,
  note: {
    title: string,
    content: string,
    updateTime: string
  }
}
export default function Note({ noteId, note }:TNoteProps) {
  const { title, content, updateTime } = note

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            上次更新于{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
            <EditButton noteId={noteId}>编辑</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}
