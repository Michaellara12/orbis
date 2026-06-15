import { Mail, Twitter, Github, type LucideIcon } from 'lucide-react'

export interface Social {
  Icon: LucideIcon
  label: string
  href: string
}

/** Social links shared by the Hero and CTA sections. */
export const SOCIALS: Social[] = [
  { Icon: Mail, label: 'Email', href: '#' },
  { Icon: Twitter, label: 'Twitter', href: '#' },
  { Icon: Github, label: 'Github', href: '#' },
]
