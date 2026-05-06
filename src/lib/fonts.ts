import { Abril_Fatface, Playfair_Display, Fraunces, Caprasimo } from 'next/font/google'

// Display: audace, autentica anni '70 — usata per H1/H2 e logo
export const fontAbril = Abril_Fatface({
  subsets: ['latin'],
  variable: '--font-abril',
  display: 'swap',
  weight: '400',
})

// Subheading: eleganza editoriale, italic per accenti emotivi
export const fontPlayfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

// Body: Fraunces variable — warmth oldstyle, leggibile, 300-600
export const fontFraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

// Badge/tag: decorativo, solo elementi brevi (sezione num, pill)
export const fontCaprasimo = Caprasimo({
  subsets: ['latin'],
  variable: '--font-caprasimo',
  display: 'swap',
  weight: '400',
})
