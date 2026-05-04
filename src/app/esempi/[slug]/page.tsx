import type { Metadata } from 'next'
import { examples } from '@/lib/examples'
import { notFound } from 'next/navigation'
import ExampleLayout from '@/components/shell/ExampleLayout'
import ExampleClientLoader from '@/components/shell/ExampleClientLoader'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const example = examples.find((e) => e.slug === slug)
  if (!example) return {}
  return {
    title: `${example.title} — Brian Gastaldelli`,
    description: example.description,
    openGraph: {
      title: example.title,
      description: example.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return examples.map((e) => ({ slug: e.slug }))
}

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params
  const example = examples.find((e) => e.slug === slug)
  if (!example) notFound()

  return (
    <ExampleLayout example={example}>
      <ExampleClientLoader slug={slug} />
    </ExampleLayout>
  )
}
