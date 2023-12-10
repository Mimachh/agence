import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Découverte du besoin" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Le point de départ essentiel est de correctement définir vos{' '}
          <strong className="font-semibold text-neutral-950">besoins</strong> et{' '} <strong className="font-semibold text-neutral-950">objectifs</strong>, 
          en nous imprégnant de votre métier et votre façon de travailler.
        </p>
        <p>
          Une fois les besoins définis nous réaliserons de notre côté une étude de faisabilité afin de nous assurer de répondre pleinement à vos attentes.
        </p>
        <p>
          L'étude de faisabilité validée nous vous ferons la proposition d'une{' '}
          <strong className="font-semibold text-neutral-950">solution</strong> et,
          plus important encore, un budget.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Inclus dans cette phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Questionnaire sur vos besoins</TagListItem>
        <TagListItem>Etude de faisabilité</TagListItem>
        <TagListItem>Proposition d'une solution</TagListItem>
        <TagListItem>Validation du client</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Développement" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
      <p>
          A partir de la phase de découverte nous développerons votre projet dans un{' '}
          <strong className="font-semibold text-neutral-950">
            délai
          </strong> définit au préalable.
        </p>
        <p>
          Nous fournirons à chaque client une mise en ligne rapide du prototype de leur site afin qu'ils puissent constater, à la fois de son évolution, mais aussi vérifier que le rendu leur convient.
        </p>
        <p>
          Nous prendrons contact régulièrement avec vous afin de vérifier, ensemble, que tout avance dans le bon sens.
        </p>
      </div>

      {/* <Blockquote
        author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }}
        className="mt-12"
      >
        Studio were so regular with their progress updates we almost began to
        think they were automated!
      </Blockquote> */}
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Livraison" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Une fois le travail de développement terminé, nous procédons à une{' '}
          <strong className="font-semibold text-neutral-950">
            mise en ligne
          </strong>
          du projet final.
        </p>
        <p>
          Nous effectuons une dernière vague de{' '}           
          <strong className="font-semibold text-neutral-950">
            tests
          </strong> pour vérifier que tout fonctionne comme prévu.
        </p>
        <p>
          Une fois que nous avons la certitude de la qualité et la solidité du site, nous vous en laissons pleinement les clés. En restant disponible, sur les premiers jours de votre prise en main, pour toute question sur votre outil flambant neuf.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Dans cette phase
      </h3>
      <List className="mt-8">
        <ListItem title="Tests">
          Nos projets sont toujours testés en long, en large et en travers. Nous livrons des sites pleinement fonctionnels.
        </ListItem>
        <ListItem title="Infrastructure">
          Nous utilisons des technologies solides, connues, robustes pour maximumer la perennité de votre futur outil.
        </ListItem>
        <ListItem title="Support">
          Nous proposons une offre de suivi complet de votre site internet.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our values"
        title="Balancing reliability and innovation"
      >
        <p>
          We strive to stay at the forefront of emerging trends and
          technologies, while completely ignoring them and forking that old
          Rails project we feel comfortable using. We stand by our core values
          to justify that decision.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
            The first part of any partnership is getting our designer to put
            your logo in our template. The second step is getting them to do the
            colors.
          </GridListItem>
          <GridListItem title="Efficient">
            We pride ourselves on never missing a deadline which is easy because
            most of the work was done years ago.
          </GridListItem>
          <GridListItem title="Adaptable">
            Every business has unique needs and our greatest challenge is
            shoe-horning those needs into something we already built.
          </GridListItem>
          <GridListItem title="Honest">
            We are transparent about all of our processes, banking on the simple
            fact our clients never actually read anything.
          </GridListItem>
          <GridListItem title="Loyal">
            We foster long-term relationships with our clients that go beyond
            just delivering a product, allowing us to invoice them for decades.
          </GridListItem>
          <GridListItem title="Innovative">
            The technological landscape is always evolving and so are we. We are
            constantly on the lookout for new open source projects to clone.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Notre façon de travailler',
  description:
    'Transformer ces idées en succès digital, c\'est notre métier.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Notre façon de travailler" title="Comment nous procédons">
        <p>
        Dans le monde en constante évolution d'aujourd'hui, chaque entreprise a des idées, des aspirations et des objectifs uniques. <br /><br />
        Transformer ces idées en <strong>succès digital</strong>, c'est notre métier.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      {/* <Values /> */}

      <ContactSection />
    </>
  )
}
