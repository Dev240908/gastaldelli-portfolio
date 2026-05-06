export interface WorkProcess {
  step: string
  detail: string
}

export interface WorkResult {
  label: string
  value: string
}

export interface WorkItem {
  slug: string
  title: string
  type: string
  year: string
  preview: string
  accentColor: string
  client: string
  brief: string
  challenge: string
  process: WorkProcess[]
  solution: string
  tech: string[]
  results: WorkResult[]
  url?: string
}

export const works: WorkItem[] = [
  {
    slug: 'sistema-ai',
    title: 'AI Assistant System',
    type: 'AI · Automazione',
    year: '2025–oggi',
    preview: 'linear-gradient(135deg, #574634 0%, #DA9100 50%, #B7410E 100%)',
    accentColor: '#DA9100',
    client: 'Uso personale · Infrastruttura operativa',
    brief:
      'Costruire un sistema AI che gestisse in autonomia le routine operative quotidiane: rispondere a messaggi, organizzare appuntamenti, aggiornare CRM, generare contenuti e monitorare i sistemi — tutto tramite Telegram.',
    challenge:
      "Il problema non era trovare uno strumento AI, ma costruire un'infrastruttura che lavorasse mentre io dormivo. Tutti i servizi esistenti richiedono abbonamenti, dipendenze esterne e non si adattano al mio workflow. Serviva qualcosa di completamente custom.",
    process: [
      {
        step: 'Architettura multi-agente',
        detail:
          'Definito un sistema a 5 agenti specializzati: uno per i clienti, uno per i contenuti, uno per il codice, uno per le operazioni e un orchestratore centrale che smista le richieste.',
      },
      {
        step: 'Integrazione Claude SDK',
        detail:
          'Ogni agente usa Claude 3.5 Sonnet con un system prompt specifico e accesso a un set di tool dedicato. La memoria è persistente tra sessioni grazie a un database SQLite.',
      },
      {
        step: 'Deploy e automazione',
        detail:
          'Il sistema gira su PM2 in background su Windows, con cron job che attivano routine automatiche ogni mattina: briefing giornaliero, controllo email, aggiornamento task.',
      },
    ],
    solution:
      'Un sistema operativo AI personale accessibile via Telegram. Cinque assistenti specializzati, memoria cross-sessione, cron job 24/7 e orchestrazione intelligente. Zero intervento manuale per le operazioni di routine. Il sistema gestisce circa 30-50 interazioni al giorno in autonomia.',
    tech: ['TypeScript', 'Claude SDK', 'Node.js', 'PM2', 'SQLite', 'Telegram Bot API'],
    results: [
      { label: 'Ore risparmiate/settimana', value: '~8h' },
      { label: 'Task automatizzati/giorno', value: '30-50' },
      { label: 'Uptime sistema', value: '99.2%' },
      { label: 'Agenti specializzati', value: '5' },
    ],
  },
  {
    slug: 'portfolio-dev',
    title: 'gastaldelli.it',
    type: 'Web · Creative Dev',
    year: '2025',
    preview: 'linear-gradient(135deg, #F5F0E1 0%, #FAE679 40%, #DA9100 100%)',
    accentColor: '#B7410E',
    client: 'Portfolio personale',
    brief:
      'Costruire un portfolio che non sembrasse un template. Qualcosa che riflettesse il mio approccio al digitale: tecnico, caldo, diretto. Con animazioni che aggiungessero valore invece di distrarre.',
    challenge:
      "Il portfolio classico con griglia di card e hero centrato non funzionava. Serviva un sito che comunicasse personalità e competenza tecnica allo stesso tempo, senza scivolare nell'autoreferenzialità.",
    process: [
      {
        step: 'Sistema di design',
        detail:
          "Definita una palette neo-retro anni '70: cream, harvest gold, rust orange, espresso. Tipografia con Abril Fatface per i display, Fraunces per il corpo, Caprasimo per i badge.",
      },
      {
        step: 'Animazioni GSAP',
        detail:
          "SplitText per-character sull'headline hero con mask:true per il reveal. ScrollTrigger per le animazioni clip-path sulle card progetti. Custom cursor con ring magnetico.",
      },
      {
        step: 'Funnel di conversione',
        detail:
          'Homepage strutturata come funnel PMI: problema → metodo → lavori → prove sociali → CTA. Ogni sezione risponde a un\'obiezione specifica del target.',
      },
    ],
    solution:
      'Un portfolio-funnel in Next.js 15 con design system warm e coerente. Preloader con progress line, animazioni SplitText, ImageFollower cursor, schema JSON-LD per SEO locale. Deploy su Vercel con CI automatico.',
    tech: ['Next.js 15', 'TypeScript', 'GSAP 3.15', 'Framer Motion', 'Lenis', 'Vercel'],
    results: [
      { label: 'Lighthouse Performance', value: '96/100' },
      { label: 'Time to build', value: '< 15 giorni' },
      { label: 'Bundle JS gzipped', value: '< 140kb' },
      { label: 'Core Web Vitals', value: 'Tutti verdi' },
    ],
    url: 'https://gastaldelli.it',
  },
  {
    slug: 'tuteladoc',
    title: 'TutelaDoc',
    type: 'SaaS · B2B',
    year: '2025',
    preview: 'linear-gradient(135deg, #568203 0%, #FAE679 100%)',
    accentColor: '#568203',
    client: 'Aziende settore edilizia · Sicurezza cantieri',
    brief:
      'Automatizzare la compilazione dei Piani Operativi di Sicurezza (POS) per i cantieri edili. Un documento che normalmente richiede ore di lavoro a un tecnico specializzato, reso compilabile in minuti da chiunque.',
    challenge:
      "Il POS è un documento obbligatorio per legge ma estremamente ripetitivo: contiene dati aziendali, specifiche del cantiere, analisi dei rischi e misure di prevenzione. La versione standard è un Word da 40 pagine. La sfida era tradurla in un'interfaccia guidata senza perdere la conformità legale.",
    process: [
      {
        step: 'Analisi documentale',
        detail:
          'Studio approfondito del D.Lgs. 81/2008 e dei template POS standard. Identificate 8 sezioni principali, 34 campi obbligatori e 12 variabili legate al tipo di cantiere.',
      },
      {
        step: 'Interfaccia guidata step-by-step',
        detail:
          'Progettato un wizard in 5 step con validazione in tempo reale. Ogni step raccoglie una categoria di informazioni con tooltip che spiegano il significato legale di ogni campo.',
      },
      {
        step: 'Generazione PDF',
        detail:
          'Backend Node.js che riceve i dati del form e compila un template POS conforme, esportato in PDF. Il documento finale è pronto per la firma e l\'archiviazione.',
      },
    ],
    solution:
      'Piattaforma web SaaS che trasforma un processo da ore in minuti. Interfaccia guidata in 5 step, validazione in tempo reale, generazione PDF automatica. Conforma al D.Lgs. 81/2008. Target: piccole imprese edili e responsabili sicurezza.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'PDF-lib', 'Vercel'],
    results: [
      { label: 'Tempo medio compilazione', value: '< 12 min' },
      { label: 'Risparmio vs manuale', value: '85%' },
      { label: 'Documenti generati', value: '40+' },
      { label: 'Campi automatizzati', value: '34/34' },
    ],
    url: 'https://tuteladoc.it',
  },
  {
    slug: 'lead-gen',
    title: 'Lead Gen Pipeline',
    type: 'Automazione · CLI',
    year: '2025',
    preview: 'linear-gradient(135deg, #B7410E 0%, #E45356 50%, #FAE679 100%)',
    accentColor: '#E45356',
    client: 'Uso interno · Outreach freelance',
    brief:
      'Costruire una pipeline automatica per trovare PMI italiane che potrebbero beneficiare di un sito web o automazione, e contattarle con email personalizzate generate via LLM — senza spam, con contesto reale.',
    challenge:
      "Il cold outreach manuale richiede ore di ricerca per ogni lead. Serve trovare l'azienda, capire cosa fa, vedere se ha un sito web decente, scrivere un'email contestuale. Automatizzare tutto questo senza che l'email sembrasse un template era la vera sfida.",
    process: [
      {
        step: 'Ricerca prospect automatica',
        detail:
          'Integrazione con Hunter.io per trovare email verificate di titolari e responsabili. Filtri per settore (ristorazione, turismo, artigianato), location (Nord Italia) e dimensione aziendale.',
      },
      {
        step: 'Analisi sito web',
        detail:
          'Ogni prospect viene analizzato: esiste un sito? È mobile-friendly? Ha Google Business? La pipeline usa Puppeteer per estrarre questi dati in automatico e li usa come contesto.',
      },
      {
        step: 'Generazione email via LLM',
        detail:
          'Claude API genera email personalizzate basandosi sul settore, il nome del titolare, i problemi specifici rilevati nel sito e una proposta di valore contestuale. Zero template.',
      },
    ],
    solution:
      'CLI Python che automatizza l\'intero ciclo di prospecting: trova lead → analizza sito → genera email personalizzata → traccia invii e risposte. Ogni email è unica, contestuale, con un tasso di risposta 3x superiore al cold outreach standard.',
    tech: ['Python', 'uv', 'Claude API', 'Hunter.io', 'Puppeteer', 'SMTP', 'SQLite'],
    results: [
      { label: 'Lead processati/ora', value: '20-30' },
      { label: 'Risparmio vs manuale', value: '90%' },
      { label: 'Tasso risposta medio', value: '~8%' },
      { label: 'Email personalizzate', value: '100%' },
    ],
  },
]

export function getWork(slug: string): WorkItem | undefined {
  return works.find(w => w.slug === slug)
}
