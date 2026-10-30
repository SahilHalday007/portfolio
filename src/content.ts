import type { LogEntry, ProfileFact, Project, StackGroup, WindowId } from './types';

export const WINDOW_IDS: readonly WindowId[] = ['whoami', 'about', 'projects', 'stack', 'log', 'contact'];

export const WINDOW_LABELS: Record<WindowId, string> = {
  whoami: 'whoami',
  about: 'about',
  projects: 'projects',
  stack: 'stack',
  log: 'log',
  contact: 'contact',
};

export const BANNER_WIDE = String.raw`███████╗ █████╗ ██╗  ██╗██╗██╗
██╔════╝██╔══██╗██║  ██║██║██║
███████╗███████║███████║██║██║
╚════██║██╔══██║██╔══██║██║██║
███████║██║  ██║██║  ██║██║███████╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝`;

export const BANNER_COMPACT = String.raw`╔═╗╔═╗╦ ╦╦╦
╚═╗╠═╣╠═╣║║
╚═╝╩ ╩╩ ╩╩╩`;

export const PROFILE_FACTS: ProfileFact[] = [
  { key: 'name', value: 'Sahil Halday007' },
  { key: 'role', value: 'Software & AI/ML Engineer' },
  { key: 'base', value: 'Tanzania · UTC+3' },
  { key: 'focus', value: 'Accessible edtech · AI · hardware' },
  { key: 'currently', value: 'SensePlay' },
  { key: 'status', value: 'open to collaboration' },
];

export const ABOUT_PARAGRAPHS = [
  'I build software and AI systems for accessible learning and real-world interaction. I am based in Tanzania and work across full-stack product engineering, embedded systems, computer vision, and educational technology.',
  'At the Tanzania Open Innovation Organisation (TOIO), I work as an Embedded Systems and AI Engineer and technical trainer. I enjoy the whole stack: a useful interface, reliable APIs and data, then the physical input or device that makes the product tangible.',
  'My current focus is SensePlay: learning-through-play experiences designed around Universal Design for Learning, adaptive difficulty, Swahili localization, and input options that include keyboard, touch, and MaKey MaKey.',
];

export const PRINCIPLES = [
  'Start with the person and their environment. Devices, connectivity, language, and input methods are design inputs, not afterthoughts.',
  'Treat accessibility as a constraint from day one. Offer multiple ways to act and give clear feedback.',
  'Connect design to engineering. Loading states, data quality, error handling, and maintainable architecture matter as much as the interface.',
  'Use AI where it helps explain or assist, with human judgement still in the loop. It should not stand in for an educator or a clinical claim.',
  'Build, test, learn, improve. Practical prototypes become useful products through real feedback and steady hardening.',
];

export const PROJECTS: readonly Project[] = [
  {
    id: 'senseplay',
    name: 'SensePlay',
    file: 'senseplay/',
    category: 'Accessible educational games',
    problem: 'Children need playful ways to practise memory, attention, reasoning, sequencing, and reaction skills without being blocked by a single input method or one-size-fits-all difficulty.',
    role: 'Full-stack product and game development under Robotek Labs: interaction design, adaptive game logic, and accessibility work.',
    stack: ['React', 'TypeScript', 'UDL', 'Adaptive difficulty', 'Swahili', 'MaKey MaKey'],
    highlights: [
      'Universal Design for Learning guides the experience rather than sitting in a checklist at the end.',
      'Difficulty adapts to the player, while keyboard, touch, and physical MaKey MaKey inputs share one interaction model.',
      'Swahili localization and real device constraints inform the product from the start.',
    ],
    links: [{ label: 'Related public game codebase', url: 'https://github.com/SahilHalday007/toio_games' }],
    linkTodos: ['TODO: add the canonical SensePlay product URL when public'],
    visual: 'grid',
  },
  {
    id: 'senselink',
    name: 'SenseLink',
    file: 'senselink/',
    category: 'Embedded hardware bridge',
    problem: 'A game is only inclusive if a child can actually control it. SenseLink bridges touch pads to the software without requiring a conventional keyboard or mouse.',
    role: 'Embedded systems and firmware: ESP32 board behavior, USB HID presentation, physical feedback, and connectivity.',
    stack: ['ESP32', 'Arduino', 'PlatformIO', 'USB HID', 'Charlieplexed LEDs', 'Wi-Fi'],
    highlights: [
      'ESP32 firmware presents as a USB HID keyboard and mouse from touch-pad input.',
      'Charlieplexed LEDs provide immediate physical feedback without one pin per LED.',
      'A Wi-Fi captive portal supports setup and telemetry from the device.',
    ],
    links: [],
    linkTodos: ['TODO: add the public SenseLink repository when available'],
    visual: 'chip',
  },
  {
    id: 'analytics',
    name: 'SensePlay Analytics Engine',
    file: 'senseplay_analytics_engine/',
    category: 'Gameplay data and AI reporting',
    problem: 'Raw gameplay events are not useful to educators until they become readable progress signals and session reports.',
    role: 'Python service architecture: ingestion, data model, asynchronous report jobs, and AI-assisted narrative summaries.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Celery', 'Redis', 'Groq', 'Alembic'],
    highlights: [
      'FastAPI endpoints ingest gameplay events into PostgreSQL, with pgvector for semantic session-pattern search.',
      'Celery and Redis handle asynchronous analytics and reporting work.',
      'Groq drafts narrative reports that explain patterns; they are not a substitute for educator judgement or diagnosis.',
    ],
    links: [{ label: 'Public repository', url: 'https://github.com/SahilHalday007/senseplay_analytics_engine' }],
    visual: 'chart',
  },
  {
    id: 'toio-site',
    name: 'TOIO Website',
    file: 'toio-website/',
    category: 'Organizational web presence',
    problem: 'TOIO needed a clear public website that presents its community, education, and innovation work with a polished interactive interface.',
    role: 'Frontend development for the Tanzania Open Innovation Organisation: a Next.js website and animated UI components.',
    stack: ['Next.js', 'React', 'TypeScript', 'Animated UI', 'Web accessibility'],
    highlights: [
      'Built a Next.js public-facing site with animated interface components.',
      'Kept the presentation readable and the content centered on TOIO programs and community work.',
    ],
    links: [{ label: 'TOIO organization site', url: 'https://www.toio.or.tz' }],
    linkTodos: ['TODO: add the public source repository when available'],
    visual: 'site',
  },
  {
    id: 'vfd',
    name: 'TRA VFD Receipt System',
    file: 'tra-vfd-receipts/',
    category: 'Receipt and workflow software',
    problem: 'A fabrication lab needs receipts and operational records that fit Tanzania Revenue Authority VFD requirements instead of improvised paperwork.',
    role: 'React and TypeScript application work for receipt generation and the surrounding lab workflow.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'TRA VFD'],
    highlights: [
      'Receipt generation is designed around Tanzania Revenue Authority VFD requirements.',
      'The surrounding app connects receipt work to a real fabrication-lab management context.',
      'The public project includes production guidance and a VFD receipt example.',
    ],
    links: [
      { label: 'Public project repository', url: 'https://github.com/SahilHalday007/fablab-management-system' },
      { label: 'Live application', url: 'https://toiofablabmanagementsystem.vercel.app' },
    ],
    visual: 'receipt',
  },
];

export const STACK_GROUPS: readonly StackGroup[] = [
  { title: 'Frontend', icon: 'react', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Motion'] },
  { title: 'Backend', icon: 'server', items: ['Node.js', 'Express', 'FastAPI', 'Django', 'REST APIs'] },
  { title: 'Data', icon: 'database', items: ['PostgreSQL', 'Supabase', 'pgvector', 'Redis', 'Alembic'] },
  { title: 'Infra', icon: 'cloud', items: ['Vercel', 'Render', 'Railway', 'Git', 'GitHub'] },
  { title: 'AI/ML', icon: 'spark', items: ['Groq', 'scikit-learn', 'Gameplay analytics', 'Narrative reporting'] },
  { title: 'Embedded', icon: 'chip', items: ['ESP32', 'Arduino', 'PlatformIO', 'USB HID', 'MaKey MaKey', 'OpenCV'] },
];

export const LOG_ENTRIES: readonly LogEntry[] = [
  {
    hash: 'sp01a7',
    role: 'SensePlay — AI/ML & software engineer',
    detail: 'Accessible games, adaptive difficulty, Swahili localization, and analytics for learning through play.',
    date: 'TODO: add role start date',
  },
  {
    hash: 'hw2c4d',
    role: 'SenseLink — embedded systems',
    detail: 'ESP32 touch-to-HID bridge, charlieplexed LED feedback, and Wi-Fi setup/telemetry.',
    date: 'TODO: add prototype date',
  },
  {
    hash: 'to08e1',
    role: 'TOIO — engineer & technical trainer',
    detail: 'Hands-on innovation, web and hardware-connected projects, and technical training in Tanzania.',
    date: 'TODO: add role start date',
  },
  {
    hash: 'fs5b90',
    role: 'Full-stack product work',
    detail: 'React/TypeScript products, Node/Python APIs, data systems, and deployments on Vercel, Render, and Railway.',
    date: 'TODO: add relevant dates',
  },
];

export const CAT_LINES = [
  'purr. +1 trust',
  'mrrp. cursor company',
  'more! (please)',
  'feeding time is all the time',
  'I keep the prompt warm',
  'click registered. nap resumed',
  'this terminal has excellent mice',
];

export const BOOT_LINES = [
  'sahilOS terminal firmware · portable web build',
  'checking font glyphs ......... ok',
  'loading ANSI palettes ........ 7 themes',
  'mounting ~/sahil/projects .... 5 entries',
  'starting TUI session ......... ready',
];

export const EMAIL = 'sahil@toio.or.tz';
export const GITHUB_URL = 'https://github.com/SahilHalday007';
export const LINKEDIN_TODO = 'TODO: add LinkedIn profile URL';
export const CV_TODO = 'TODO: add public CV PDF link';

export const HELP_LINES = [
  'help                 list all commands',
  'whoami               go to the home window',
  'ls                   list available windows',
  'cd <section>         open a window by name',
  'cat <file>           read about.md, projects.md, stack.md, or contact.md',
  'open <project>       open a project by id',
  'projects             open the project explorer',
  'stack                show the technology manifest',
  'log                  show the experience log',
  'contact              show verified contact options',
  'theme <name>         set a terminal theme (use `theme` alone to list names)',
  'pet                  pet the cat',
  'clear                clear command output',
  'history              show recent commands',
  'neofetch             open the system-info / about view',
  'sudo hire sahil      a polite easter egg',
  'exit                 return home',
  '',
  'Keyboard: 1-6 windows · j/k list selection · Enter open · Esc back',
  'Ctrl+K command palette · ? keybinding help · : or / command mode',
];
