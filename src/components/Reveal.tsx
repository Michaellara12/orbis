import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in ms. */
  delay?: number
}

/**
 * Scroll-reveal wrapper — fades + slides its children up the first time they
 * enter the viewport. Pure CSS transition (see `.reveal` in index.css), so
 * it's cheap and respects `prefers-reduced-motion`.
 */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
