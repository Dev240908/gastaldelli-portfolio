import { projects } from '@/content/projects'

export const metadata = {
  title: 'Progetti',
  description: 'Portfolio progetti di Brian Gastaldelli — grafica, video, web e motion design.',
}

export default function ProgettiPage() {
  return (
    <main style={{ paddingTop: 'clamp(5rem,10vh,7rem)' }}>
      {/* Full-page gallery — da implementare nella prossima fase */}
      <div style={{
        padding: 'var(--space-section) var(--space-container)',
        fontFamily: 'var(--font-jetbrains)',
        color: 'rgba(240,240,238,0.3)',
        fontSize: '0.6rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {projects.length} progetti — gallery in costruzione
      </div>
    </main>
  )
}
