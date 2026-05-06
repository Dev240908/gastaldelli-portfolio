import type { Metadata } from 'next'
import { fontAbril, fontPlayfair, fontFraunces, fontCaprasimo } from '@/lib/fonts'
import Nav from '@/components/shell/Nav'
import PageWrapper from '@/components/shell/PageWrapper'
import SmoothScroll from '@/components/shell/SmoothScroll'
import CustomCursor from '@/components/shell/CustomCursor'
import Preloader from '@/components/shell/Preloader'
import ImageFollower from '@/components/ui/ImageFollower'
import '@/styles/globals.css'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://gastaldelli.it/#person',
      name: 'Brian Gastaldelli',
      jobTitle: 'Cross Media Communication Specialist',
      url: 'https://gastaldelli.it',
      email: 'mailto:brian@gastaldelli.it',
      telephone: '+393489515828',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Verona',
        addressRegion: 'VR',
        addressCountry: 'IT',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://gastaldelli.it/#business',
      name: 'Brian Gastaldelli — Siti web e automazioni per PMI',
      description:
        'Realizzo siti web, automazioni e sistemi digitali per attività locali e PMI del Nord Italia. Basato a Verona, consegno in 10-15 giorni.',
      url: 'https://gastaldelli.it',
      telephone: '+393489515828',
      email: 'brian@gastaldelli.it',
      founder: { '@id': 'https://gastaldelli.it/#person' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Verona',
        addressRegion: 'VR',
        addressCountry: 'IT',
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 45.4384,
          longitude: 10.9916,
        },
        geoRadius: '300000',
      },
      priceRange: '€€',
      openingHours: 'Mo-Fr 09:00-18:00',
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gastaldelli.it'),
  title: {
    default: 'Brian Gastaldelli — Siti web e automazioni per PMI',
    template: '%s — Brian Gastaldelli',
  },
  description:
    'Realizzo siti web, automazioni e sistemi digitali per attività locali e PMI del Nord Italia. Basato a Verona, consegno in 10-15 giorni.',
  keywords: ['sito web Verona', 'web designer Verona', 'automazioni PMI Italia', 'freelance web Verona'],
  authors: [{ name: 'Brian Gastaldelli', url: 'https://gastaldelli.it' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Brian Gastaldelli',
    url: 'https://gastaldelli.it',
    title: 'Brian Gastaldelli — Siti web e automazioni per PMI',
    description:
      'Realizzo siti web, automazioni e sistemi digitali per attività locali e PMI del Nord Italia.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${fontAbril.variable} ${fontPlayfair.variable} ${fontFraunces.variable} ${fontCaprasimo.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll />
        <Nav />
        <ImageFollower />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  )
}
