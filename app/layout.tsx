"use client"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@/components/layouts'
import { ThemeProvider } from 'next-themes'
import { LeftMenu } from '@/components/ui'
import localFont from 'next/font/local'
import Script from 'next/script'

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
        <div id="fb-root" />
        <Script
          id="facebook-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '${process.env.NEXT_PUBLIC_FB_APP_ID}',
                  cookie     : true,
                  xfbml      : true,
                  version    : 'v20.0'
                });
                console.log('✅ FB.init ejecutado');
              };
              (function(d, s, id) {
                if (d.getElementById(id)) return;
                var js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                js.async = true;
                js.defer = true;
                d.head.appendChild(js);
              })(document, 'script', 'facebook-jssdk');
            `,
          }}
        />
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
