'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export default function AnimatedSection({
  children,
  delay = 0,
  className,
  once = true,
  direction = 'up',
}) {
  const prefersReduced = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.1 })

  const directions = {
    up:    { y: prefersReduced ? 0 : 24, opacity: 0 },
    down:  { y: prefersReduced ? 0 : -24, opacity: 0 },
    left:  { x: prefersReduced ? 0 : 24, opacity: 0 },
    right: { x: prefersReduced ? 0 : -24, opacity: 0 },
    fade:  { opacity: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={directions[direction] || directions.up}
      animate={inView ? { y: 0, x: 0, opacity: 1 } : directions[direction]}
      transition={{ duration: prefersReduced ? 0 : 0.6, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
