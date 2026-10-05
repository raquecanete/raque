export type Project = {
  slug: string
  title: string
  eyebrow: string
  description: string
  year: string
  role: string
  technologies: string[]
  accent: string
  number: string
  overviewLead: string
  overviewCopy: string[]
  detailsTitle: string
  detailsSubtitle: string
  liveUrl?: string
  githubUrl?: string
  images?: { src: string; alt: string }[]
}

export const projects: Project[] = [
  {
    slug: 'watch-tower-system',
    title: 'Watch Tower System',
    eyebrow: 'Workforce management / 2025',
    description: 'A workforce management system for creating shift schedules and managing leave, overtime, undertime, and shift swaps for employees and admins.',
    year: '2025',
    role: 'Frontend developer',
    technologies: ['Vue.js', 'Node.js', 'Tailwind CSS', 'Frontend libraries'],
    accent: '#b6e35c',
    number: '01',
    overviewLead: 'One system.<br>Every shift.',
    overviewCopy: [
      'Watch Tower System gives employees and admins one clear place to manage workforce operations, from building shift schedules to handling leave and time requests.',
      'The platform supports shift swapping, overtime and undertime tracking, schedule creation, and the everyday approvals that keep teams moving.',
    ],
    detailsTitle: 'Clear schedules.<br>Better coverage.',
    detailsSubtitle: 'Workforce management',
    liveUrl: 'https://wt-system.netlify.app',
    images: [
      { src: '/Screenshot 2026-08-20 104746.png', alt: 'Watch Tower System public shift schedule' },
      { src: '/Screenshot 2026-08-20 104037.png', alt: 'Watch Tower System workforce management homepage' },
      { src: '/Screenshot 2026-08-20 103932.png', alt: 'Watch Tower System key workforce management features' },
    ],
  },
  {
    slug: 'mg-exclusive',
    title: 'MG Exclusive',
    eyebrow: 'E-commerce / 2024',
    description: 'A full-stack e-commerce platform where customers can browse products, customize selected items, manage orders, and leave reviews, supported by an admin dashboard for products, inventory, orders, and feedback.',
    year: '2024',
    role: 'Full-stack developer',
    technologies: ['Vue.js', 'Tailwind CSS', 'Laravel', 'MySQL', 'JWT', 'Axios', 'Vite'],
    accent: '#f4a261',
    number: '02',
    overviewLead: 'A better way.<br>To shop.',
    overviewCopy: [
      'MG Exclusive is a full-stack e-commerce platform where customers can browse products, explore details, customize selected items, manage their cart, place orders, and leave reviews.',
      'The admin dashboard supports product and inventory management, order processing, customer feedback, authentication, and secure API-driven workflows.',
    ],
    detailsTitle: 'Simple shopping.<br>Powerful management.',
    detailsSubtitle: 'Full-stack e-commerce',
    images: [
      { src: '/mg1.png', alt: 'MG Exclusive e-commerce storefront' },
      { src: '/mg2.png', alt: 'MG Exclusive product browsing and shopping experience' },
      { src: '/mg3.png', alt: 'MG Exclusive product and order management interface' },
    ],
  },
  {
    slug: 'sulya',
    title: 'SULYA',
    eyebrow: 'Project experience / 2026',
    description: 'A refined brand and digital showcase designed to present products, stories, and visual identity in a clean and memorable way.',
    year: '2026',
    role: 'Frontend developer',
    technologies: ['Vue.js', 'Tailwind CSS', 'Node.js', 'UI systems'],
    accent: '#c7a3ff',
    number: '03',
    overviewLead: 'Designed to feel.<br>Distinctive and clear.',
    overviewCopy: [
      ' SULYA is a modern student-focused web app designed to simplify study-load management, class schedules, and timely academic reminders.',
      'Students can also transform their study load into a customizable wallpaper, keeping their schedule visually accessible and organized wherever they go.',
    ],
    detailsTitle: 'Turn Your Schedule Into Your Style.',
    detailsSubtitle: 'Project experience',
    images: [
      { src: '/sulyaimg3.png', alt: 'SULYA landing page gallery' },
      { src: '/sulyaimg.png', alt: 'SULYA product and storytelling interface' },
      { src: '/sulyaimg2.png', alt: 'SULYA visual presentation and brand showcase' },
    ],
  },
  {
    slug: 'common-ground',
    title: 'Common Ground',
    eyebrow: 'Climate / 2024',
    description: 'Turning complex climate data into stories that make action feel possible.',
    year: '2024',
    role: 'Frontend developer',
    technologies: ['React', 'D3', 'WebGL'],
    accent: '#83d6ca',
    number: '04',
    overviewLead: 'Make data.<br><span>Feel possible.</span>',
    overviewCopy: ['Turning complex climate data into stories that make action feel possible.'],
    detailsTitle: 'Clear stories.<br>Meaningful action.',
    detailsSubtitle: 'Climate data experience',
  },
]

export const skills = ['Vue.js', 'Tailwind CSS', 'Laravel', 'Node.js', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'Design systems', 'Motion & interaction', 'Performance', 'Accessibility']

export const experience = [
  { company: 'Golden Arches Development Corporation', role: 'Customer Service Associate', date: '2022 — 2026', detail: 'Partnering with thoughtful teams to make ambitious products clear, fast, and human.', tags: ['Product', 'Systems'] },
  { company: 'Monetix Virtual Guard OPC', role: 'IT, Software Development Intern', date: 'January 2026 — May 2026', detail: 'Shaped digital identities and built the systems behind award-winning brand experiences.', tags: ['Brand', 'Digital'] },
  { company: 'Small Hours', role: 'Design technologist', date: '2018 — 2020', detail: 'Connected design and engineering across early-stage products, from prototype to launch.', tags: ['Prototyping', 'Web'] },
]

export const portfolioAssistant = {
  name: 'Raque',
  biography: 'An independent frontend developer and design engineer who builds fast, expressive digital experiences for thoughtful teams.',
  location: 'Based everywhere / GMT +1',
  role: 'Independent frontend developer',
  programmingLanguages: ['TypeScript', 'JavaScript'],
  frameworks: ['Vue', 'Nuxt', 'React'],
  tools: ['GSAP', 'D3', 'WebGL', 'Directus', 'Figma','Tailwind CSS', 'Bootstrap', 'Laravel', 'Node.js', 'Vuejs', 'Nuxt', 'React', 'GSAP', 'D3', 'WebGL', 'Directus', 'Figma'],
  services: ['Frontend development', 'Design engineering', 'Interaction design', 'Design systems', 'Performance and accessibility work'],
  education: [],
  certifications: [],
  achievements: [],
  resumeUrl: '',
  githubUrl: '',
  linkedinUrl: '',
  email: 'raquecanete60@gmail.com',
  availability: 'Available for a select few good projects.',
}

export const assistantSuggestedQuestions = [
  'Who are you?',
  'What technologies do you use?',
  'Tell me about your projects',
  'What services do you offer?',
  'Are you available for freelance work?',
  'How can I contact you?',
]