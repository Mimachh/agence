"use client"
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModal } from '@/context/ModalContext';
import { X } from 'lucide-react';
import Simulation from './Simulation';
import BookingWrapper from '../booking/BookingWrapper';


// interface ModalProps {
//   open: boolean;
//   setOpen: (value: boolean) => void;
// }
export default function Modal() {
  const { open, setOpen, component } = useModal();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/70 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-muted px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full md:max-w-xl sm:p-6">
                <div className='absolute top-0 right-0 mr-2 mt-2'>
                  <X 
                  className='cursor-pointer'
                   onClick={() => setOpen(false)}
                  />
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    </Dialog.Title>
                    <div className="mt-2">
                      {component === "simulation" ? (
                        <Simulation />
                      ) : (
                        <BookingWrapper />
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
