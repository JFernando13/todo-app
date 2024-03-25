import { prisma } from '@/prisma'

import { Toaster } from 'react-hot-toast'
import { TodosWrapper } from '../../components/todos/todos-wrapper'

type Todos = {
  id: string
  text: string
  completed: boolean
}

export default async function TodosPage() {
  const todos = await prisma.todos.findMany()

  return (
    <main className='max-w-xl grid gap-12 place-content-start min-h-screen py-24 max-md:px-12'>
      <h1 className='text-7xl max-sm:text-5xl font-bold text-center'>
        Todos App
      </h1>
      <Toaster position='bottom-right' />

      <TodosWrapper todos={todos} />
    </main>
  )
}
