import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { SendHorizontal } from 'lucide-react'
import { useNotification } from '@/context/NotificationContext'
import { useState } from 'react'
import axios from 'axios'
import { Button } from './ui/button'



const navigation = [
  {
    title: 'Projets',
    links: [
      { title: 'Prothésiste ongulaire', href: '/work/family-fund' },
      { title: 'Barbier', href: '/work/family-fund' },
      { title: 'Avocat', href: '/work/family-fund' },
      {
        title: (
          <>
            Tout voir <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'L\'agence',
    links: [
      { title: 'A propos', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Réseaux',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {

  const [loading, setLoading] = useState(false)
  const { showNotification } = useNotification(); 


  const newsletterFormSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  })

  const newsletterForm = useForm<z.infer<typeof newsletterFormSchema>>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof newsletterFormSchema>) {
    setLoading(true);

    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom-newsletter-subs/v1/submit`;
    try {
      axios.post(apiUrl, {
        email: values.email,
      })
      .then(response => {
        console.log('Réponse de l\'API:', response.data.message);
        showNotification('Nous vous avons bien inscrit sur notre newsletter, merci !', 'success', 'Inscription réussie !');
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
    <Form {...newsletterForm}>
      <form className="max-w-sm"
        onSubmit={newsletterForm.handleSubmit(onSubmit)}
      >
        <h2 className="font-display text-sm font-semibold tracking-wider text-accent-foreground">
          M'inscrire à la newsletter
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Inscrivez-vous pour être tenu au courant des dernières nouveautés et actualités.
        </p>
        <div className="relative mt-6">
          <FormField
            control={newsletterForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className='w-full text-left'>
                <FormControl>
                  <div className='flex items-end gap-2 w-full relative'>
                    <Input type="email" placeholder="Email" {...field}
                      className="
                            ring-offset-none ring-offset-none focus-visible:ring-none
                            block w-full h-[55px] rounded-2xl border border-muted-foreground bg-transparent py-4 pl-6 pr-20 text-base/6 text-accent-foreground ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-background focus:outline-none focus:ring-muted"
                    />
                    <div className="absolute inset-y-1 right-1 flex justify-end">
                      <Button
                        disabled={loading}
                        type="submit"
                        className="flex aspect-square h-full items-center justify-center rounded-xl bg-background text-muted transition hover:bg-secondary-foreground"
                        variant="secondary"
                      >
                        {loading ? (
                              <p>...</p>
                            ) : (
                        <>
                        <ArrowIcon className="w-4" />
                        </>
                            )}
                      </Button>
                    </div>
                  </div>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-muted-foreground/20 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            © Mimach. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
