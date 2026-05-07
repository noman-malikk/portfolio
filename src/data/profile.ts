export const profile = {
  name: 'Noman Ali Malik',
  title: 'Front-end Engineer',
  location: 'London, UK',
  phone: '+44-776-125-6841',
  email: 'noumanmalik970@gmail.com',
  linkedin: 'linkedin.com/in/noman-ali-malik',
  github: 'github.com/noman-malik',
  portrait: '/noman.jpeg',
  summary:
    'Creative front-end developer focused on responsive, user-centric web experiences; strong problem-solving, attention to detail, adaptability, teamwork.',
  experience: [
    {
      role: 'Front-End Engineer',
      company: 'SMSami',
      location: 'Toronto, Canada',
      range: 'Mar 2020 to Aug 2022',
      impact: [
        'Built and maintained responsive SaaS interfaces in agile sprints.',
        'Designed UI and integrated APIs with performance-first feedback loops.',
        'Customized Material Design components and optimized UI flows for speed.',
        'Owned product flow details while collaborating across product and QA.',
        'Evaluated emerging tech to improve efficiency and code quality.'
      ],
      focus: [
        'Performance tuning and render efficiency',
        'API integration and resilient UI states',
        'Material UI customization and theming',
        'Agile delivery and cross-functional alignment'
      ]
    },
    {
      role: 'Web Developer',
      company: 'iTechEra Solutions',
      location: 'Atlanta, USA',
      range: 'Jun 2019 to Feb 2020',
      impact: [
        'Maintained and customized e-commerce sites across design and functionality.',
        'Improved SEO performance with targeted audits and load-time tuning.',
        'Handled hosting, migrations, and server configuration for uptime.',
        'Led project planning and client communication for delivery clarity.',
        'Managed data uploads, social scheduling, and freelance platform bids.'
      ],
      focus: [
        'SEO and performance optimization',
        'Deployment and server reliability',
        'Client communication and planning',
        'Cross-browser consistency'
      ]
    }
  ],
  project: {
    name: 'E-Voting System (Blockchain)',
    tagline: 'Trust & Transparency Demo',
    description:
      'A tamper-resistant voting flow with voter registration, ballot casting, and result verification backed by on-chain records.',
    stack: ['Blockchain', 'Smart Contracts', 'Web3.js', 'Node.js'],
    linkLabel: 'Link',
    linkUrl: '#'
  },
  microCaseStudies: [
    {
      title: 'Material UI Customization Gallery',
      summary:
        'Token-driven theming, component variants, and accessibility states for dense SaaS workflows.',
      note: 'Inspired by SMSami UI theming work.'
    },
    {
      title: 'Performance & SEO Lab',
      summary:
        'Interactive toggles that simulate optimization decisions and their audit impact.',
      note: 'Reflects iTechEra SEO and performance tuning focus.'
    },
    {
      title: 'State + Flow Resilience',
      summary:
        'Patterns for API integration, loading fallbacks, and predictable UI states.',
      note: 'Drawn from cross-functional delivery work.'
    }
  ],
  skills: [
    {
      name: 'Languages + Frontend',
      items: [
        'HTML5',
        'CSS3',
        'JavaScript (ES6+)',
        'TypeScript',
        'React',
        'Next.js',
        'Redux',
        'Context API'
      ],
      usage: 'SaaS and e-commerce interfaces with responsive layout systems.'
    },
    {
      name: 'UI Systems',
      items: [
        'Tailwind',
        'Material UI',
        'Design tokens',
        'Component variants',
        'Accessibility states',
        'Responsive grids'
      ],
      usage: 'Material UI customization for SMSami and fast UI iteration.'
    },
    {
      name: 'Backend + APIs',
      items: ['Node.js', 'Express', 'REST APIs', 'JWT', 'API integration'],
      usage: 'Integrated APIs and auth flows for SaaS features.'
    },
    {
      name: 'Cloud + DevOps',
      items: ['AWS S3', 'AWS Lambda', 'CloudFront', 'Git', 'GitHub Actions', 'CI/CD', 'Linux'],
      usage: 'Deployment and delivery pipelines for production sites.'
    },
    {
      name: 'Data + Tooling',
      items: [
        'DynamoDB',
        'Firebase',
        'Prisma',
        'Sequelize',
        'Jest',
        'React Testing Library',
        'Chrome DevTools',
        'Postman',
        'VS Code'
      ],
      usage: 'Feature validation, data modeling, and test-driven iteration.'
    },
    {
      name: 'Practices',
      items: [
        'Responsive design',
        'Performance optimization',
        'Accessibility',
        'Cross-browser compatibility',
        'Agile collaboration'
      ],
      usage: 'Built accessible, resilient interfaces across devices.'
    }
  ],
  education: {
    school: 'Ruskin University',
    location: 'Cambridge, UK',
    degree: 'MEng Computer Science'
  }
} as const;
