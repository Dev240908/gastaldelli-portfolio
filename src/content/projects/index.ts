export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  alt?: string
  poster?: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  year: string
  category: string
  tags: string[]
  description: string
  media: ProjectMedia[]
  coverImage: string
  url?: string
  featured?: boolean
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall'
}

export const projects: Project[] = [
  // Brian popolerà questo array con i suoi progetti
  // Struttura pronta per ricevere qualsiasi formato (immagini, video, zip estratti)
]

export const featuredProjects = projects.filter((p) => p.featured)
