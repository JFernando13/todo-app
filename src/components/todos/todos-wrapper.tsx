'use client'
import { useOptimistic } from 'react'
import { TodoForm } from '@/components/form'
import { Todo } from '@/components/todos/todo'

type Todos = {
  id: string
  text: string
  completed: boolean
}

export function TodosWrapper({ todos }: { todos: Todos[] }) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos)

  const addOptimisticTodos = (newTodo: any) => {
    setOptimisticTodos((state) => [...state, newTodo])
  }

  const deleteOptimisticTodo = (id: string) => {
    setOptimisticTodos(optimisticTodos.filter((todo) => todo.id !== id))
  }

  const updateOptimisticTodo = (id: string) => {
    setOptimisticTodos((currentTodos: Todos[]) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <>
      <TodoForm addOptimisticTodos={addOptimisticTodos} />

      <section className='grid gap-4'>
        {optimisticTodos.length === 0 ? (
          <p className='text-center text-gray-400 italic font-medium'>
            You don´t have any todos
          </p>
        ) : (
          optimisticTodos
            .sort((a, b) => Number(b.completed) - Number(a.completed))
            .map((todo) => (
              <Todo
                todo={todo}
                updatedOptimisticTodo={updateOptimisticTodo}
                deleteOptimisticTodo={deleteOptimisticTodo}
                key={todo.id}
              />
            ))
        )}
      </section>
    </>
  )
}
