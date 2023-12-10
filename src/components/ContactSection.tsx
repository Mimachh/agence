"use client"

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import Separator from './Separator'
import { Calculator, CalendarDays, SendHorizontal } from 'lucide-react';
import { useModal } from '@/context/ModalContext'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import axios from "axios"
import { useNotification } from '@/context/NotificationContext'
const newsletterFormSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
})


export function ContactSection() {
  const { open, setOpen, setComponent } = useModal();
  const [loading, setLoading] = useState(false)
  const { showNotification } = useNotification(); 


  const newsletterForm = useForm<z.infer<typeof newsletterFormSchema>>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof newsletterFormSchema>) {
    setLoading(true);
   
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/demande-de-contact/v1/submit`;
    try {
      axios.post(apiUrl, {
        email: values.email,
      })
      .then(response => {
        console.log('Réponse de l\'API:', response.data.message);
        showNotification('Nous avons bien reçu votre demande, nous vous recontacterons dès que possible !', 'success', 'Enregistrement réussi !');
        newsletterForm.reset()
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error.response.data.message);
        showNotification(error.response.data.message, 'error', 'Erreur');
      })
      .finally(() => {
        setLoading(false);
      });
  
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setLoading(false);
    }
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl ">

        <div className="relative isolate overflow-hidden bg-background px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"  id='contact'>
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Parlons de votre projet.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Laissez votre mail pour être recontacté, ou réservez un entretien.
          </p>
          <div className='max-w-xl mx-auto space-y-8'>
            <Form {...newsletterForm}>
              <form
                onSubmit={newsletterForm.handleSubmit(onSubmit)}
                className="mx-auto mt-10 flex gap-x-4">
                <FormField
                  control={newsletterForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className='w-full text-left'>
                      <FormControl>
                        <div className='flex items-end gap-2 w-full relative'>
                          <Input type="email" placeholder="Email" {...field}
                            className='h-[50px] bg-background text-muted rounded-[25px] text-sm ring-offset-none ring-offset-none focus-visible:ring-none'
                          />
                          <Button 
                          disabled={loading}
                          type="submit" className='rounded-[25px] absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1' variant="default">
                            {loading ? (
                              <p>Chargement...</p>
                            ) : (
                              <>
                              Être recontacté
                              <SendHorizontal className='w-4 h-4' />
                            </>
                            )}
                          </Button>
                        </div>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </form>
            </Form>
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
