export interface Command {
  input: string
  output: string[]
  delay?: number
}

export const autoScript: Command[] = [
  { input: 'whoami', output: ['brian.gastaldelli'] },
  {
    input: 'cat about.txt',
    output: [
      '> Nome:     Brian Gastaldelli',
      '> Età:      20 anni',
      '> Location: Verona, Italy',
      '> Ruolo:    Cross Media Communication Specialist',
      '> Istinto:  AI-native builder',
    ],
  },
  {
    input: 'ls skills/',
    output: [
      'web-development/    automazioni/    ai-integration/',
      'cross-media/        webgl-3d/       photography/',
    ],
  },
  {
    input: 'cat contact.txt',
    output: [
      '> Email:    brian@example.com',
      '> Stato:    Disponibile per progetti',
      '',
      'Digita "help" per i comandi disponibili.',
    ],
  },
]

export const secretCommands: Record<string, string[]> = {
  help: ['Comandi disponibili:', '  about', '  skills', '  contact', '  projects', '  sudo hire-me'],
  'sudo hire-me': [
    'Accesso root concesso...',
    'Connessione a brian@gastaldelli.dev...',
    'Benvenuto nel team!  Contattami: brian@example.com',
  ],
  matrix: ['Benvenuto nel deserto del reale.'],
  clear: ['__CLEAR__'],
}
