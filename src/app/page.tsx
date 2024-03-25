import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <Link
      href='/todos'
      className='rounded-md bg-blue-700 text-white px-4 py-2 font-semibold'>
      Todos
    </Link>
  )
}
