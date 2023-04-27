import './globals.css'
// import Menu from './menu'
import { Providers } from './app'
import ToasterProvider from './provider/ToasterProvider'

export const metadata = {
  title: 'Luxeehub',
  description: 'Where talents are displayed',
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
