import { type Metadata } from 'next'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'
import { ModalProvider } from '@/context/ModalContext'
import Modal from '@/components/modal/Modal'

export const metadata: Metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>
          <ModalProvider>
          <Modal />
          {children}
          </ModalProvider>
        </RootLayout>
      </body>
    </html>
  )
}