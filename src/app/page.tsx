import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'

import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import imageLaptop from '@/images/laptop.jpg'
import wordpress from "@/images/technos/wordpress.svg"
import woocommerce from "@/images/technos/woocommerce.svg"
import nextjs from "@/images/technos/nextjs.svg"
import yoast from "@/images/technos/yoast.svg"

import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import Analytics from '@/components/Analytics'

const clients = [
  ['Wordpress', wordpress],
  ['Woocommerce', woocommerce],
  ['Nextjs', nextjs],
  ['Yoast SEO', yoast],
  // ['Stripe', stripe],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-background py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-base font-semibold tracking-wider text-primary sm:text-left">
            Les technologies que nous utilisons
          </h2>
          <div className="h-px flex-auto bg-primary/40" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn className='flex items-center gap-3 group'>
                  <Image src={logo} alt={client} unoptimized className='group-hover:scale-[130%] transition-all' />
                  <p className='text-muted text-md font-medium'>{client}</p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Les clients que nous accompagnons"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Nous travaillons avec différents corps de métiers. Leur point commun est la volonté partagée d'accroître leur visibilité en ligne, d'optimiser leur chiffre d'affaires et de conquérir de nouveaux clients. Nous vous accompagnons dans cette démarche, en créant des solutions personnalisées qui propulsent votre entreprise vers le succès numérique que vous méritez
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Projet client</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Renforcez votre présence digitale, saisissez les opportunités de demain dès aujourd'hui."
        className="mt-24 sm:mt-32 lg:mt-40"
        titleClass="text-accent-foreground"
        eyebrowClass="text-primary"
      >
        <p className='text-muted-foreground'>
          Chez Mimach, nous sommes bien plus qu'une agence digitale – nous sommes vos partenaires dévoués dans la transformation en ligne. Explorez notre gamme complète de services conçus pour propulser votre activité vers de nouveaux sommets.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Développement web">
              Nous nous spécialisons dans la conception de sites web vitrine magnifiques et de haute qualité pour  améliorer votre visibilité.
            </ListItem>
            <ListItem title="Module de réservation">
              Simplifiez la gestion de votre emploi du temps avec notre solution de réservation en ligne. Nous vous offrons un moyen efficace et convivial pour permettre à vos clients de réserver leurs services en quelques clics. Fini les plannings compliqués, notre module de réservation vous aide à optimiser votre temps et à offrir une expérience pratique à vos clients.
            </ListItem>
            <ListItem title="E-commerce">
              Stimulez vos ventes, boostez votre chiffre d'affaires. Notre service e-commerce offre une plateforme puissante, conçue pour maximiser la conversion et offrir une expérience d'achat exceptionnelle, propulsant ainsi votre réussite commerciale.
            </ListItem>
            <ListItem title="SEO - Référencement">
              Augmentez votre visibilité en ligne et attirez plus de clients grâce à notre expertise en optimisation SEO. Nous positionnons votre site en tête des résultats de recherche, stimulant ainsi votre présence digitale et propulsant votre entreprise vers de nouveaux sommets.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'Transformez votre présence en ligne avec notre agence digitale experte en conception de sites web sur mesure. Du design élégant à la fonctionnalité avancée, nous faisons passer votre entreprise au niveau supérieur. Découvrez des solutions web personnalisées pour professionnels, conçues pour impressionner et performer.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)
  return (
    <>
      <Analytics />
      <Container className="mt-24 sm:mt-32 md:mt-56">

        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-accent-foreground [text-wrap:balance] sm:text-7xl">
            Agence digitale <span className='text-primary'>Mimach</span> - L'art de donner vie à votre activité en ligne.
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Découvrez l'univers exclusif de Mimach, votre partenaire digital dédié. De la création élégante de sites vitrines à des boutiques en ligne intuitives, en passant par des modules de réservation en ligne sur mesure et une optimisation SEO de pointe, nous faisons briller votre entreprise.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Bill Gates', logo: logoPhobiaDark }}
      >
        Dans le monde digital d'aujourd'hui, si votre entreprise n'est pas sur internet, alors elle n'existe tout simplement pas.
      </Testimonial>
      {/* "Votre site web est la fenêtre par laquelle le monde voit votre entreprise." - Jacqueline V. Twillie */}
      <Services />

      <ContactSection />
    </>
  )
}
