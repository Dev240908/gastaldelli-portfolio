import type { Metadata } from 'next'
import { fontSyne, fontInter, fontMono } from '@/lib/fonts'
import Nav from '@/components/shell/Nav'
import PageWrapper from '@/components/shell/PageWrapper'
import SmoothScroll from '@/components/shell/SmoothScroll'
import CustomCursor from '@/components/shell/CustomCursor'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gastaldelli.it'),
  title: {
    default: 'Brian Gastaldelli — Siti web e automazioni per PMI',
    template: '%s — Brian Gastaldelli',
  },
  description: 'Realizzo siti web, automazioni e sistemi digitali per attività locali e PMI del Nord Italia. Basato a Verona, consegno in 10-15 giorni.',
  keywords: ['sito web Verona', 'web designer Verona', 'automazioni PMI Italia', 'freelance web Verona', 'sito web per ristorante', 'sito web per hotel'],
  authors: [{ name: 'Brian Gastaldelli', url: 'https://gastaldelli.it' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Brian Gastaldelli',
    url: 'https://gastaldelli.it',
    title: 'Brian Gastaldelli — Siti web e automazioni per PMI',
    description: 'Realizzo siti web, automazioni e sistemi digitali per attività locali e PMI del Nord Italia.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fontSyne.variable} ${fontInter.variable} ${fontMono.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScroll />
        <Nav />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  )
}
