'use client'
import { DeleteIcon } from '@/components/icons'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/prisma'
import { deleteTodo } from '@/actions/todoForm'
import toast from 'react-hot-toast'

interface Props {
  completed: boolean
  id: string
  deleteOptimisticTodo: (id: string) => void
}

export function DeleteButton({ completed, id, deleteOptimisticTodo }: Props) {
  return (
    <button
      className={`rounded-md  text-white font-medium p-2 hover:scale-105 transition-all ${
        completed ? 'bg-blue-900' : 'bg-red-800'
      }`}
      onClick={async (e) => {
        e.stopPropagation()
        toast.success('Todo deleted')
        deleteOptimisticTodo(id)
        deleteTodo(id)
      }}>
      <DeleteIcon />
    </button>
  )
}
