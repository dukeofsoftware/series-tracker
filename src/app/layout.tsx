import Providers from '@/components/providers'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/navbar'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Series tracker',
  description: 'Track your series and episodes easily.',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="tr" className="bg-gray-50 antialiased">
        <body
          className={
            `${process.env.DEVELOPMENT === "true" && "debug-screens"
            } z-10 h-full min-h-screen 
          w-full bg-slate-50 antialiased dark:bg-slate-900 dark:border-white border-slate-900
          ` + inter.className
          }
        >
          <Providers>
            <Navbar />
            {children}
          </Providers></body>
      </html>

    </ClerkProvider>
  )
}
