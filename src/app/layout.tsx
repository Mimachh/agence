import { type Metadata } from 'next'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'
import { ModalProvider } from '@/context/ModalContext'
import Modal from '@/components/modal/Modal'
import { NotificationProvider } from '@/context/NotificationContext'
import Toast from '@/components/notifications/Toast'

export const metadata: Metadata = {
  title: {
    template: 'MimacH',
    default: 'Mimach - Agence digitale pour professionnels',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
      <NotificationProvider>
  
        <RootLayout>
        <Toast />
          <ModalProvider>
        
              <Modal />
         
              {children}
         
          </ModalProvider>
        </RootLayout>
        </NotificationProvider>
      </body>
    </html>
  )
}
