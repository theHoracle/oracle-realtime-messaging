import Providers from '@/components/Providers'
import './globals.css'

export const metadata = {
  title: 'Oracle Fast Messaging',
  description: 'Send messages instantly via web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}
