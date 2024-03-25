'use client'

import { addTodo } from '@/actions/todoForm'
import toast from 'react-hot-toast'
export function TodoForm({ addOptimisticTodos }: any) {
  return (
    <form
      action={async (formData) => {
        const newTodo = {
          text: formData.get('todo') as string,
          completed: false,
          id: crypto.randomUUID()
        }

        toast.success('Todo added', { duration: 5000 })
        addOptimisticTodos(newTodo)

        const form = document.querySelector('form')
        form?.reset()

        const response = await addTodo(newTodo)

        if (response?.error) {
          response.error.map((error) => toast.error(error))
        }
      }}
      className='flex gap-4'>
      <input
        type='text'
        placeholder='Go to gym...'
        name='todo'
        className='rounded-md border border-gray-300 px-4 py-2 outline-none flex-1'
      />

      <button
        className='rounded-md bg-blue-700 text-white px-4 py-2'
        id='add-btn'>
        <span>New Todo</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      </button>
    </form>
  )
}
