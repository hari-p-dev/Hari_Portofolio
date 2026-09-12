import type { PortfolioData } from './types';

/**
 * Single source of truth. Every value here is derived directly from Hari's
 * resume (HARI-RESUME.pdf). Copy has been rewritten into website voice, but
 * no experience, company, date, metric, or link has been invented.
 */
export const portfolio: PortfolioData = {
  personal: {
    name: 'Hari P',
    role: 'Full-Stack Developer',
    location: 'Chennai, India',
    email: 'haripanneer07@gmail.com',
    phone: '+91 6379478750',
    portrait: '/hari.png',
    resume: '/assets/Hari-P-Resume.pdf',
  },

  positioning: {
    headlineLines: ['HARI', 'FULL-STACK', 'DEVELOPER'],
    statement:
      'Designing and engineering complete digital products — from responsive interfaces to secure APIs, data layers, and everything between.',
    introduction:
      'Full-stack developer building scalable enterprise web applications with React, TypeScript, Node.js, and PostgreSQL. Comfortable across the entire stack — from reusable UI components to authentication, payments, and reporting pipelines.',
    bio:
      "I build products end to end — designing the interface, engineering the APIs, and modeling the data behind them. I work security-first, wiring in JWT and refresh-token auth, role-based access control, and rate limiting as I go. I've shipped across SaaS, government, and enterprise domains, from multi-tenant platforms to offline-capable field tools and compliant document workflows.",
  },

  // TECHNICAL SKILLS — verbatim groupings from the resume
  skills: [
    {
      key: 'languages',
      label: 'Languages',
      description: 'Core programming languages used to build scalable, maintainable, and efficient applications.',
      items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'SQL'],
    },
    {
      key: 'frontend',
      label: 'Frontend',
      description: 'Building responsive, reusable interfaces and rich client-side experiences.',
      items: [
        'React 19',
        'Vite',
        'Angular',
        'Tailwind CSS',
        'Redux Toolkit',
        'React Router 7',
        'React Hook Form',
        'Zod',
        'HTML5',
        'CSS3',
        'Framer Motion',
        'Recharts',
        'Leaflet Maps',
        'jsPDF',
        'QR Code Generation',
      ],
    },
    {
      key: 'backend',
      label: 'Backend',
      description: 'Designing secure REST services, authentication, and reliable server logic.',
      items: [
        'Node.js',
        'Express.js',
        'Fastify',
        'REST API Design',
        'JWT & Refresh-Token Auth',
        'Role-Based Access Control',
        'Centralized Error Handling',
        'Request Validation',
        'Swagger / OpenAPI',
      ],
    },
    {
      key: 'database',
      label: 'Database & ORM',
      description: 'Modeling, querying, and managing relational data with modern ORMs.',
      items: ['PostgreSQL', 'Neon Database', 'Prisma ORM', 'Drizzle ORM'],
    },
    {
      key: 'security',
      label: 'Security',
      description: 'Hardening applications with auth, access control, and abuse prevention.',
      items: [
        'JWT',
        'Password Encryption',
        'RBAC',
        'CAPTCHA Integration',
        'Helmet',
        'Rate Limiting',
      ],
    },
    {
      key: 'payments',
      label: 'Payments',
      description: 'Integrating billing and one-off payments with Stripe.',
      items: ['Stripe Payment Gateway', 'Subscription Billing'],
    },
    {
      key: 'testing',
      label: 'Testing',
      description: 'Verifying behaviour with unit and API integration tests.',
      items: ['Jest', 'Supertest'],
    },
    {
      key: 'devtools',
      label: 'Dev Tools',
      description: 'Tooling for quality, consistency, and a smooth developer workflow.',
      items: [
        'Git',
        'GitHub',
        'Docker',
        'Husky',
        'ESLint',
        'Prettier',
        'lint-staged',
        'Winston Logger',
      ],
    },
  ],

  // The full-stack architecture story (signature section). Technologies are
  // limited to those the resume actually supports.
  stackFlow: [
    {
      id: 'interface',
      label: 'Interface',
      caption: 'Responsive, reusable UI',
      tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
    },
    {
      id: 'application',
      label: 'Application Logic',
      caption: 'Validation & client state',
      tech: ['React Hook Form', 'Zod', 'React Router 7'],
    },
    {
      id: 'backend',
      label: 'Backend',
      caption: 'Secure REST services',
      tech: ['Node.js', 'Express.js', 'Fastify', 'REST APIs'],
    },
    {
      id: 'security',
      label: 'Security',
      caption: 'Auth & access control',
      tech: ['JWT', 'Refresh Tokens', 'RBAC', 'Rate Limiting'],
    },
    {
      id: 'data',
      label: 'Data',
      caption: 'Modeled & queried',
      tech: ['PostgreSQL', 'Prisma ORM', 'Drizzle ORM', 'Neon'],
    },
    {
      id: 'delivery',
      label: 'Delivery',
      caption: 'Reporting & integrations',
      tech: ['Stripe', 'PDF / Excel / Word', 'AWS S3'],
    },
  ],

  // PROFESSIONAL EXPERIENCE — dates and companies verbatim from resume
  experience: [
    {
      company: 'Stigmata Techno Solutions',
      role: 'Full-Stack Developer',
      period: 'Jul 2026 – Present',
      year: '2026',
      summary:
        'Building scalable full-stack enterprise applications end to end.',
      points: [
        'Build scalable full-stack enterprise applications with React, TypeScript, Node.js, Express.js, Fastify, and PostgreSQL.',
        'Design responsive, reusable frontend components using React, Tailwind CSS, and TypeScript.',
        'Develop secure REST APIs with JWT authentication, refresh tokens, and role-based access control (RBAC).',
        'Integrate the Stripe payment gateway for subscription billing and one-off online payments.',
        'Design and manage PostgreSQL databases using Prisma ORM and Drizzle ORM.',
        'Build reporting features including PDF generation, Excel export, and Word document generation.',
        'Set up reusable form validation with React Hook Form and Zod.',
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Fastify', 'PostgreSQL', 'Stripe', 'Prisma'],
    },
    {
      company: 'VCODEZ',
      role: 'Data Science Intern',
      period: 'Jun 2025 – Sep 2025',
      year: '2025',
      summary: 'Data preprocessing, visualization, and ML fundamentals.',
      points: [
        'Worked on data preprocessing, visualization, and machine learning fundamentals using Python, Pandas, and NumPy.',
        'Performed data analysis and produced statistical insights from client datasets.',
      ],
      tech: ['Python', 'Pandas', 'NumPy'],
    },
    {
      company: 'Nullclass Edtech Private Limited',
      role: 'Software Engineer Intern',
      period: 'Mar 2025 – Apr 2025',
      year: '2025',
      summary: 'Modules for a travel booking application.',
      points: [
        'Developed modules for a travel booking application using modern frontend technologies.',
        'Worked on responsive UI development and third-party API integration.',
      ],
      tech: ['React', 'REST APIs', 'Responsive UI'],
    },
    {
      company: 'Eagle Hi-Tech Softclou Private Limited',
      role: 'Junior Software Trainee',
      period: 'Jun 2024 – Jul 2024',
      year: '2024',
      summary: 'Client-facing web interfaces.',
      points: [
        'Built responsive web interfaces for client-facing applications.',
        'Contributed to frontend implementation and general UI improvements.',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript'],
    },
  ],

  // PROJECTS — case studies. All details drawn from resume bullets.
  projects: [
    {
      index: '01',
      name: 'Learn2Drive Academy',
      kind: 'Multi-Tenant SaaS Platform',
      challenge:
        'A driving academy business needed a single platform that could serve many independent vendors while keeping each tenant’s data and billing isolated.',
      approach:
        'Built frontend and backend modules for a multi-tenant SaaS platform, with JWT-based authentication and role-based access control at its core, and a vendor registration workflow driving onboarding.',
      role: 'Full-stack — interface, APIs, auth, payments, and document generation.',
      features: [
        'JWT-based authentication and RBAC',
        'Vendor registration workflow',
        'Stripe integration for subscriptions and payments',
        'Certificate generation with PDF export',
        'Leaflet-based map integration',
      ],
      tech: ['React 19', 'TypeScript', 'Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Stripe', 'AWS S3', 'JWT', 'Redux Toolkit'],
      architecture: [
        { layer: 'Interface', tech: 'React 19 · Redux Toolkit' },
        { layer: 'API', tech: 'Express.js · REST' },
        { layer: 'Auth', tech: 'JWT · RBAC' },
        { layer: 'Data', tech: 'PostgreSQL · Prisma' },
        { layer: 'Services', tech: 'Stripe · AWS S3' },
      ],
    },
    {
      index: '02',
      name: 'Tourist Exit Survey Platform',
      kind: 'Government Project — St. Maarten',
      challenge:
        'A government body needed to collect tourist exit surveys in the field, including in locations without reliable connectivity, and turn responses into analytics.',
      approach:
        'Built survey management modules with dynamic, configurable survey forms, offline-first data capture, and a reporting layer that turned collected data into insights.',
      role: 'Full-stack — configurable forms, offline sync, analytics, and exports.',
      features: [
        'Dynamic, configurable survey forms',
        'Offline functionality using IndexedDB (PWA)',
        'Analytics dashboard built with Recharts',
        'PDF, Word, and Excel export',
        'QR code generation and geolocation-enabled collection',
      ],
      tech: ['React', 'TypeScript', 'Fastify', 'PostgreSQL', 'Drizzle ORM', 'JWT', 'IndexedDB', 'PWA', 'Recharts', 'ExcelJS', 'docx'],
      architecture: [
        { layer: 'Interface', tech: 'React · PWA' },
        { layer: 'Offline', tech: 'IndexedDB' },
        { layer: 'API', tech: 'Fastify · JWT' },
        { layer: 'Data', tech: 'PostgreSQL · Drizzle' },
        { layer: 'Reporting', tech: 'Recharts · ExcelJS · docx' },
      ],
    },
    {
      index: '03',
      name: 'Tax Portal',
      kind: 'Netherlands Government',
      challenge:
        'A government tax-filing process needed a compliant digital form that met strict interface specifications and produced official documents.',
      approach:
        'Built one complete tax-filing form end to end with integrated PDF generation, wrapped in a responsive UI that met government interface specifications.',
      role: 'Frontend engineering — end-to-end form and PDF output.',
      features: [
        'Complete tax-filing form, built end to end',
        'Integrated PDF generation',
        'Responsive UI meeting government interface specs',
      ],
      tech: ['Angular', 'PDF Generation'],
      architecture: [
        { layer: 'Interface', tech: 'Angular' },
        { layer: 'Output', tech: 'PDF Generation' },
      ],
    },
    {
      index: '04',
      name: 'SSCIVIL',
      kind: 'Enterprise Application — L&T',
      challenge:
        'An enterprise engineering workflow required dynamic calculations driven by complex, Excel-based formulas alongside structured data maintenance.',
      approach:
        'Developed two enterprise modules with dynamic calculations driven by Excel-based formulas, plus the input, review, and reporting surfaces around them.',
      role: 'Application engineering — calculation modules and reporting.',
      features: [
        'Dynamic calculations driven by Excel-based formulas',
        'Input parameter screens and calculation cards',
        'STAAD table maintenance and a review page',
        'PDF generation',
      ],
      tech: ['Angular', '.NET'],
      architecture: [
        { layer: 'Interface', tech: 'Angular' },
        { layer: 'Logic', tech: 'Excel-driven calculations' },
        { layer: 'Backend', tech: '.NET' },
        { layer: 'Output', tech: 'PDF Generation' },
      ],
    },
  ],

  // EDUCATION — verbatim
  education: [
    {
      degree: 'B.Tech, Information Technology',
      institution: "St. Joseph's Institute of Technology, Chennai",
      period: '2022 – 2026',
      detail: 'CGPA: 8.67 / 10',
    },
    {
      degree: 'Higher Secondary (12th Standard)',
      institution: "St. Mary's Anglo-Indian Higher Secondary School",
      period: '2020 – 2022',
      detail: '74%',
    },
    {
      degree: 'SSLC (10th Standard)',
      institution: "St. Mary's Anglo-Indian Higher Secondary School",
      period: '2019 – 2020',
      detail: '80%',
    },
  ],

  // CERTIFICATIONS — verbatim
  certifications: [
    { title: 'Data Science for Engineers', issuer: 'NPTEL (Elite)' },
    { title: 'Python for Data Science', issuer: 'NPTEL (Elite)' },
    { title: 'Introduction to Front-End Development', issuer: 'Certification' },
    { title: 'Design Thinker', issuer: 'NPTEL (Elite)' },
  ],

  // CERTIFICATES — verifiable credential images in public/certificates.
  // Titles/issuers/dates transcribed directly from each certificate.
  certificates: [
    { title: 'Generative AI Fundamentals', issuer: 'Databricks Academy', date: 'Mar 2026', image: '/certificates/cert10.jpeg' },
    { title: 'Artificial Intelligence Fundamentals', issuer: 'IBM SkillsBuild', date: 'Feb 2026', image: '/certificates/cert9.jpeg' },
    { title: 'Java for Beginners', issuer: 'Infosys Springboard', date: 'Oct 2025', image: '/certificates/cert8.jpeg' },
    { title: 'Programming in Java', issuer: 'LinkedIn Learning', date: 'Aug 2025', image: '/certificates/cert7.jpeg' },
    { title: 'Introduction to Front-End Development', issuer: 'Meta · Coursera', image: '/certificates/cert6.jpeg' },
    { title: 'ICECONF 2025 — Research Paper Presentation', issuer: "St. Joseph's Institute of Technology (IEEE-sponsored)", date: 'Oct 2025', image: '/certificates/cert1.jpeg' },
    { title: 'Networking Basics', issuer: 'Cisco Networking Academy', image: '/certificates/cert4.jpeg' },
    { title: 'Hardware and Upgrade Support', issuer: 'Cisco Networking Academy', image: '/certificates/cert3.jpeg' },
    { title: 'Operating Systems Support', issuer: 'Cisco Networking Academy', image: '/certificates/cert2.jpeg' },
    { title: 'Prelude', issuer: 'Infosys Springboard', date: 'Oct 2023', image: '/certificates/cert5.jpeg' },
  ],

  // ACHIEVEMENTS — verbatim
  achievements: [
    {
      title: '2nd Place, Hackathon',
      detail: 'SIMATS Engineering',
      year: 'Sep 2024',
    },
    {
      title: '1st Place, Symposium',
      detail: 'SRM Institute of Science & Technology and Sri Sairam Institute of Technology',
      year: 'Aug 2024',
    },
    {
      title: 'Research Paper — IEEE Xplore',
      detail: '“Hybrid Convolutional Plant Disease Prediction and Detection”',
      year: '2026',
      // TODO: replace with the real IEEE Xplore URL when available.
      url: 'TODO_IEEE_XPLORE_URL',
    },
  ],

  links: {
    github: 'https://github.com/hari-p-dev',
    linkedin: 'https://www.linkedin.com/in/hari-p-293304258/',
    email: 'mailto:haripanneer07@gmail.com',
  },
};
