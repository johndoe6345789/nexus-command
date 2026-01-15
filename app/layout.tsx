import type { Metadata } from 'next'
import { Inter, Rajdhani } from 'next/font/google'
import '../src/main.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NEXUS COMMAND',
  description: 'A premium AAA-quality game menu system for a Quake 3 Arena clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
