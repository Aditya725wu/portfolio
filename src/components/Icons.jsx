function Svg({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  )
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </Svg>
  )
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 3.5-2 1.5a12 12 0 0 0 6 6l1.5-2 3.5 1.5v3A2 2 0 0 1 18 19 15 15 0 0 1 5 6a2 2 0 0 1 1.5-2.5Z" />
    </Svg>
  )
}

export function ChevronIcon({ open }) {
  return (
    <Svg className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  )
}

export function ExternalLinkIcon(props) {
  return (
    <Svg className={props.className ?? 'h-3.5 w-3.5'}>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </Svg>
  )
}

export function DownloadIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4v11" />
      <path d="m8 11 4 4 4-4" />
      <path d="M5 19h14" />
    </Svg>
  )
}

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className ?? 'h-4 w-4'} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.17-3.37-1.17-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className ?? 'h-4 w-4'} fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5A1.96 1.96 0 1 0 5.26 7.4 1.96 1.96 0 0 0 5.25 3.5ZM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.23v1.57h.05c.45-.85 1.54-1.75 3.17-1.75 3.39 0 4.01 2.23 4.01 5.13V20Z" />
    </svg>
  )
}

export function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className ?? 'h-4 w-4'} fill="currentColor" aria-hidden="true">
      <path d="M17.6 3.5h2.7l-5.9 6.74L22 20.5h-6.17l-4.83-6.32-5.52 6.32H2.77l6.31-7.22L2 3.5h6.33l4.36 5.77L17.6 3.5Zm-.95 15.3h1.5L7.42 5.12H5.81l10.84 13.68Z" />
    </svg>
  )
}

export function GlobeIcon(props) {
  return (
    <Svg className={props.className ?? 'h-4 w-4'}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </Svg>
  )
}

export function ServerIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </Svg>
  )
}

export function LayoutIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </Svg>
  )
}

export function CloudIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.5-1.5A4 4 0 0 0 7 18Z" />
    </Svg>
  )
}

export function DatabaseIcon(props) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </Svg>
  )
}

export function AwardIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-1.5 8 5-2.5L17 21l-1.5-8" />
    </Svg>
  )
}

export function CodeIcon(props) {
  return (
    <Svg {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m14 5-4 14" />
    </Svg>
  )
}

export function WrenchIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.2-2.2 2.5-2.5Z" />
    </Svg>
  )
}

export function SparkIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      <circle cx="12" cy="12" r="2.4" />
    </Svg>
  )
}

export const serviceIcons = {
  backend: ServerIcon,
  frontend: LayoutIcon,
  cloud: CloudIcon,
  data: DatabaseIcon,
}

export const contactIcons = {
  email: MailIcon,
  location: MapPinIcon,
  phone: PhoneIcon,
}

export const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  twitter: XIcon,
  site: GlobeIcon,
  leetcode: CodeIcon,
}

export const projectIcons = {
  Web: LayoutIcon,
  Cloud: CloudIcon,
  AI: SparkIcon,
}
