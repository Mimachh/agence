"use client"
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import Separator from './Separator'
import { Calculator, CalendarDays } from 'lucide-react';
import { useModal } from '@/context/ModalContext'
export function ContactSection() {
  const { open, setOpen, setComponent } = useModal();
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl ">

        <div className="relative isolate overflow-hidden bg-background px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Parlons de votre projet.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Laissez votre mail pour être recontacté, ou réservez un entretien.
          </p>
          <div className='max-w-xl mx-auto space-y-8'>
            <form className="mx-auto mt-10 flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Entrez votre mail"
              />
              <button
                type="submit"
                className="
                transition-all 
                flex-none rounded-md bg-input px-3.5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-input/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input"
              >
                Être recontacté
              </button>


            </form>
            <Separator text='Ou' />
            <div className='max-w-xl grid grid-cols-1 md:grid-cols-2 gap-3 '>
              <button
                onClick={() => {
                  setOpen(true)
                  setComponent("resa")
                }}
                type="button"
                className="
                transition-all 
                flex-none rounded-md bg-input  px-3.5 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-input/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input"
              >
                <div className='flex items-center gap-3 justify-center'>
                  <CalendarDays className='h-6 w-6 mb-[2px]' />
                  <span>Je réserve un entretien</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setOpen(true)
                  setComponent("simulation")
                }}
                type="button"
                className="
                transition-all 
                flex-none rounded-md bg-input  px-3.5 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-input/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input"
              >
                <div className='flex items-center gap-3 justify-center'>
                  <Calculator className='h-6 w-6 mb-[2px]' />
                  <span>Simuler un devis</span>
                </div>
              </button>
            </div>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 -top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="yellow" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>

      </FadeIn>
    </Container>
  )
}
