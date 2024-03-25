'use client'
import { DeleteButton } from '@/components/buttons'
import { updateTodo } from '@/actions/todoForm'
import toast from 'react-hot-toast'
import { useOptimistic } from 'react'

type Todo = {
  id: string
  text: string
  completed: boolean
}

interface Props {
  todo: Todo
  deleteOptimisticTodo: (id: string) => void
  updatedOptimisticTodo: (id: string) => void
}
export function Todo({
  todo,
  deleteOptimisticTodo,
  updatedOptimisticTodo
}: Props) {
  return (
    <article
      key={todo.id}
      onClick={async (e) => {
        toast.success('Todo updated')
        updatedOptimisticTodo(todo.id)
        await updateTodo(todo.id)
      }}
      className={`flex items-center justify-between gap-4 shadow-lg rounded-md border-2 border-gray-500/60 px-4 py-3 cursor-pointer hover:scale-110 transition duration-300 ${
        todo.completed
          ? 'bg-blue-600 text-white hover:bg-blue-500'
          : 'bg-red-500 text-white hover:bg-red-400'
      } `}>
      <hgroup className='flex flex-col'>
        <h2 className='flex items-center text-xl max-sm:text-base font-semibold gap-2'>
          <span
            className={`rounded-full w-4 h-4 block ${
              todo.completed ? 'bg-blue-900' : 'bg-red-800'
            }`}></span>
          <span className='first-letter:uppercase'>{todo.text}</span>
        </h2>
        <p>
          <span
            className={`${
              todo.completed ? 'text-blue-300' : 'text-red-200'
            } text-xs capitalize`}>
            {todo.completed ? 'completed' : 'uncompleted'}
          </span>
        </p>
      </hgroup>
      <menu>
        <DeleteButton
          completed={todo.completed}
          deleteOptimisticTodo={deleteOptimisticTodo}
          id={todo.id}
        />
      </menu>
    </article>
  )
}
