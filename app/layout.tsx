"use client"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@/components/layouts'
import { ThemeProvider } from 'next-themes'
import { LeftMenu } from '@/components/ui'
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/RedHatDisplay-VariableFont_wght.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={myFont.className}>
      <head>
        <title>Panel administrativo</title>
        <link rel="icon" href={process.env.NEXT_PUBLIC_FAVICON} />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <Navbar>
              <LeftMenu>
                {children}
              </LeftMenu>
            </Navbar>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
