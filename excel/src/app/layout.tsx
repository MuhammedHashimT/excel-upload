import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EXCEL WEB APP',
  description: 'created by Farrago',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicons/favicon-16.png" type="image/x-icon" />
      </head>
      <body className='transition-all'>{children}</body>
    </html>
  )
}
