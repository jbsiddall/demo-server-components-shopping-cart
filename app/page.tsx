import Image from 'next/image'
import {prisma} from "./prisma"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='btn btn-primary'>hello world</h1>
    </main>
  )
}
