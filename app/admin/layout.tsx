import { ReactNode } from "react"

export const metadata = {
  title: 'Admin',
}

interface Props {
    children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <main className="container mx-auto flex flex-col prose">
        <h1>Admin</h1>
      {children}
    </main>
  )
}