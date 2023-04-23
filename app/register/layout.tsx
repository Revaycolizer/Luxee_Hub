import { Providers } from '../app'
import ToasterProvider from '../provider/ToasterProvider'
import './globals.css'
// import Menu from './menu'



export const metadata = {
  title: 'Luxeehub',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><Providers><ToasterProvider/>{children}</Providers></body>
    </html>
  )
}
