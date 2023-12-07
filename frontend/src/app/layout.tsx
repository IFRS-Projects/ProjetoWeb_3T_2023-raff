import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Flickery',
  description: 'Flickery Movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <AuthProvider> */}
        <main>
          {children}
          <Toaster richColors />
        </main>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
