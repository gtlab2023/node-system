'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
});

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// 定义 formData 的类型
type FormData = {
  get: (key: string) => string | null;
};

// 定义 saveNote 函数的返回类型
type SaveNoteResponse = {
  errors?: { issues: any[] };
  message?: string;
};

export async function saveNote(prevState: unknown, formData: FormData): Promise<SaveNoteResponse> {
  console.log(123,'saveNote',prevState,formData)
  // 获取 noteId
  const noteId = formData.get('noteId');
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error,
    };
  }

  // 更新数据库
  if (noteId) {
    await updateNote(noteId, JSON.stringify(data));
    revalidatePath('/', 'layout');
  } else {
    await addNote(JSON.stringify(data));
    revalidatePath('/', 'layout');
  }
  
  return { message: `Add Success!` };
}

// 定义 deleteNote 函数的返回类型
type DeleteNoteResponse = void;

export async function deleteNote(prevState: unknown, formData: FormData): Promise<DeleteNoteResponse> {
  const noteId = formData.get('noteId') ?? '';
  delNote(noteId);
  revalidatePath('/', 'layout');
  redirect('/');
}