/**
 * Personal details for Aditya Vitthal Kharade.
 * Swap GitHub repo URLs when you publish each project.
 */
export const profile = {
  name: 'Aditya Kharade',
  initials: 'AK',
  title: 'Full Stack Developer',
  avatarUrl: '/avatar.png',
  resumeUrl: '/Aditya-Kharade-Resume.png',
  subtitle: 'Computer Engineering & IoT · Pune',
  bio: [
    'I completed a Diploma in Computer Engineering & IoT at Cusrow Wadia Institute of Technology, Pune, with a 96% academic record. I build full-stack web apps, cloud dashboards, and small AI automations.',
    'I interned as a Full Stack Developer at Eduveda Academy, working with VS Code, Git, MySQL, and REST APIs. From August 2026 I will pursue my degree at Walchand College of Engineering, Sangli. I care about shipping usable tools — from AWS resource monitors to gesture-controlled games.',
  ],
  mapQuery: 'Pune, Maharashtra',
}

export const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: 'adityakharade576@gmail.com',
    href: 'mailto:adityakharade576@gmail.com',
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Pune, Maharashtra',
    href: null,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+91 80806 43943',
    href: 'tel:+918080643943',
  },
]

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Aditya725wu' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditya-kharade-08309a32a' },
  { id: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com/u/adityakharade576/' },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const services = [
  {
    id: 'frontend',
    title: 'Full Stack Development',
    description: 'Web apps with REST APIs, Git, and MySQL — from internship work at Eduveda.',
  },
  {
    id: 'cloud',
    title: 'Cloud & AWS',
    description: 'EC2, S3, and IAM used to monitor resources and track service health.',
  },
  {
    id: 'data',
    title: 'AI & Automation',
    description: 'Email summarization, ChatGPT API, Make, and NLP pipelines.',
  },
  {
    id: 'backend',
    title: 'IoT & Computer Vision',
    description: 'OpenCV, MediaPipe, and robotics tinkering alongside diploma coursework.',
  },
]

export const companies = [
  'Eduveda Academy',
  'Cusrow Wadia Institute of Technology',
  'Walchand College of Engineering, Sangli',
]

export const hobbies = [
  'Competitive Coding',
  'Open Source',
  'Cloud & DevOps',
  'Robotics & IoT',
  'Tech Blogging',
  'Cricket',
]

export const experience = [
  {
    id: 'exp-1',
    dates: '3 months',
    title: 'Full Stack Developer Intern',
    company: 'Eduveda Academy, Pune',
    achievements: [
      'Built front-end and back-end features for web applications during a 3-month industry internship.',
      'Worked with VS Code, Git, MySQL, and REST APIs to ship and iterate on student-facing product work.',
    ],
  },
]

export const education = [
  {
    id: 'edu-wce',
    dates: 'August 2026 — June 2029',
    title: 'Bachelor’s Degree',
    company: 'Walchand College of Engineering, Sangli',
    achievements: [
      'Starting August 2026 after completing the diploma in Computer Engineering & IoT.',
    ],
  },
  {
    id: 'edu-1',
    dates: 'Completed',
    title: 'Diploma in Computer Engineering & IoT',
    company: 'Cusrow Wadia Institute of Technology, Pune',
    achievements: [
      'Completed the diploma with 96% in Semester 5.',
      'Focus on full-stack development, cloud infrastructure, and AI-driven automation.',
    ],
  },
]

export const achievements = [
  'Completed the diploma with 96% in Semester 5 — top of class.',
  'Completed a 3-month industry internship at Eduveda Academy.',
  'Delivered 4 real-world software projects (cloud, automation, desktop, CV).',
  'Building a strong foundation in cloud, automation, and full-stack work.',
]

export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['C', 'Java', 'Python'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    items: ['AWS EC2', 'AWS S3', 'IAM', 'Cloud Computing'],
  },
  {
    id: 'data',
    title: 'Databases & Analysis',
    items: ['MySQL', 'MongoDB', 'Pandas', 'NumPy', 'Excel', 'Data Visualization'],
  },
  {
    id: 'tools',
    title: 'Tools & Automation',
    items: ['VS Code', 'Git', 'GitHub', 'Postman', 'Make (Integromat)', 'Gmail API'],
  },
  {
    id: 'ai',
    title: 'AI & ML',
    items: ['Prompt Engineering', 'NLP', 'OpenCV', 'MediaPipe', 'AI Automation', 'ChatGPT API'],
  },
  {
    id: 'biz',
    title: 'Business Development',
    items: [
      'Market Research',
      'Lead Generation',
      'Client Communication',
      'Requirement Analysis',
      'Proposal Writing',
    ],
  },
]

export const projectFilters = ['All', 'Web', 'Cloud', 'AI']

export const projects = [
  {
    id: 'proj-1',
    title: 'Cloud Service Management System',
    category: 'Cloud',
    description:
      'Centralized dashboard for monitoring AWS resources and tracking service health.',
    github: 'https://github.com/Aditya725wu',
  },
  {
    id: 'proj-2',
    title: 'Email Summarization Using Automation',
    category: 'AI',
    description:
      'Automated pipeline that uses NLP to summarize emails via Gmail API and Make.',
    github: 'https://github.com/Aditya725wu',
  },
  {
    id: 'proj-3',
    title: 'Book Store Management System',
    category: 'Web',
    description:
      'Inventory and billing system with real-time MySQL operations over JDBC.',
    github: 'https://github.com/Aditya725wu',
  },
  {
    id: 'proj-4',
    title: 'Hand Controlled Game',
    category: 'AI',
    description:
      'Real-time gesture-controlled game using OpenCV and MediaPipe.',
    github: 'https://github.com/Aditya725wu/HillClimb-Hand-Control',
  },
]
