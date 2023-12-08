"use client"
import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { AlertTriangle, CheckCheckIcon, X } from 'lucide-react'
import { useNotification } from '@/context/NotificationContext'

export default function Toast() {
  const { notification, status, title } = useNotification();
  const [show, setShow] = useState(!!notification);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setShow(!!notification);
    if (!!notification) {
      setVisible(true);
      const timeoutId = setTimeout(() => {
        
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  return (
    <>{visible && (
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex  items-end px-4 py-6 sm:items-end sm:p-6 z-50"
      >
        <div className="flex w-full flex-col justify items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setVisible(false)}
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 relative z-50 ">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                  {status === "success" ? (
                      <CheckCheckIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{notification}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    )}

    </>
  )
}
