'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/prisma'
import { z } from 'zod'

const TodoSchemea = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Todo cannot be empty')
    .max(100, 'Todo is very long'),
  id: z.string().uuid(),
  completed: z.boolean()
})

type Todo = z.infer<typeof TodoSchemea>

export async function addTodo(newTodo: Todo) {
  const todoSchema = TodoSchemea.safeParse(newTodo)
  if (!todoSchema.success) {
    return {
      error: todoSchema.error.issues.map((issue) => issue.message)
    }
  }

  await prisma.todos.create({
    data: todoSchema.data
  })

  revalidatePath('/todos')
}

export async function deleteTodo(id: string) {
  await prisma.todos.delete({ where: { id } })

  revalidatePath('/todos')
}

export async function updateTodo(id: string) {
  const todo = await prisma.todos.findUnique({ where: { id } })
  await prisma.todos.update({
    where: { id },
    data: { completed: !todo?.completed }
  })

  revalidatePath('/todos')
}
