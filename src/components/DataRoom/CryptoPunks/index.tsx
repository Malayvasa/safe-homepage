import { Box, Typography } from '@mui/material'
import type { BaseBlock } from '@/components/Home/types'
import { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import type { MotionValue } from 'framer-motion'
import css from './styles.module.css'
import LinksWrapper from '../LinksWrapper'

const CryptoPunks = ({ title, text, link }: BaseBlock) => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: backgroundRef,
    offset: ['start end', 'end start'],
  })

  return (
    <Box ref={backgroundRef} className={css.sectionContainer}>
      <Box className={css.stickyContainer}>
        <LeftPanel scrollYProgress={scrollYProgress} />
        <RightPanel scrollYProgress={scrollYProgress}>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h2">{text}</Typography>
          {link && <LinksWrapper {...link} />}
        </RightPanel>
      </Box>
    </Box>
  )
}

function LeftPanel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const OPACITY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, 1, 1, 0])
  const TRANSLATE_LTR = useTransform(scrollYProgress, [0.25, 0.75], ['-50%', '0%'])
  const TRANSLATE_RTL = useTransform(scrollYProgress, [0.25, 0.75], ['0%', '-50%'])
  const BG_TRANSLATE = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], ['-100%', '0%', '0%', '-100%'])
  return (
    <motion.div
      style={{
        x: BG_TRANSLATE,
        opacity: OPACITY,
      }}
      className={css.LeftPanelContainer}
    >
      {Array.from({ length: 8 }).map((_, outerIndex) => (
        <motion.div
          style={{
            // Columns with odd indices translate from left to right,
            // while columns with even indices translate from right to left.
            translateX: outerIndex % 2 === 1 ? TRANSLATE_LTR : TRANSLATE_RTL,
          }}
          className={css.CryptoPunkColumns}
          key={outerIndex}
        >
          {Array.from({ length: 15 }).map((_, innerIndex) => {
            // Generate a random number between 0 and 1
            const CHANCE = Math.random()
            // Determine if the color should be green (14% CHANCE)
            const IS_GREEN = CHANCE <= 0.14
            // Determine if the color should be dark green (3% CHANCE)
            const IS_DARK_GREEN = CHANCE >= 0.14 && CHANCE <= 0.17
            // Determine if the color should be darker green (3% CHANCE)
            const IS_DARKER_GREEN = CHANCE > 0.17 && CHANCE <= 0.2

            return (
              <motion.div
                key={innerIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                }}
                style={{
                  transformOrigin: 'center',
                  color: IS_GREEN
                    ? '#12FF80'
                    : IS_DARK_GREEN
                    ? '#12A154'
                    : IS_DARKER_GREEN
                    ? '#124228'
                    : 'currentColor',
                }}
              >
                <CryptoPunkSVG />
              </motion.div>
            )
          })}
        </motion.div>
      ))}
    </motion.div>
  )
}

const RightPanel = ({ scrollYProgress, children }: { scrollYProgress: MotionValue<number>; children: ReactNode }) => {
  const OPACITY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, 1, 1, 0])
  const BG_X_TRANSLATE = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], ['100%', '0%', '0%', '100%'])
  return (
    <div className={css.RightPanelContainer}>
      <motion.div
        className={css.RightPanelContent}
        style={{
          opacity: OPACITY,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className={css.RightPanelBG}
        style={{
          translateX: BG_X_TRANSLATE,
        }}
      ></motion.div>
    </div>
  )
}

const CryptoPunkSVG = () => {
  return (
    <div>
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.6">
          <rect x="12.7672" y="12.8345" width="6.11973" height="31.4438" fill="currentColor" />
          <rect x="12.7672" y="69.9463" width="6.11973" height="50.0535" fill="currentColor" />
          <rect x="6.6474" y="44.2783" width="6.11973" height="12.1925" fill="currentColor" />
          <rect width="6.11973" height="6.41711" transform="matrix(1 0 0 -1 0.52771 62.8877)" fill="currentColor" />
          <rect width="6.11973" height="6.41711" transform="matrix(1 0 0 -1 12.7672 62.8877)" fill="currentColor" />
          <rect width="6.11973" height="6.41711" transform="matrix(1 0 0 -1 6.6474 69.3047)" fill="currentColor" />
          <rect width="6.11973" height="6.41711" transform="matrix(1 0 0 -1 18.8869 12.8345)" fill="currentColor" />
          <rect width="6.11973" height="12.8342" transform="matrix(1 0 0 -1 36.6342 120)" fill="currentColor" />
          <rect width="6.11973" height="6.41711" transform="matrix(1 0 0 -1 67.2328 100.749)" fill="currentColor" />
          <rect width="24.4789" height="6.41711" transform="matrix(1 0 0 -1 42.7538 107.166)" fill="currentColor" />
          <rect width="6.11973" height="6.41711" transform="matrix(1 0 0 -1 67.2328 12.8345)" fill="currentColor" />
          <rect
            x="67.2328"
            y="6.41699"
            width="42.2262"
            height="6.41711"
            transform="rotate(180 67.2328 6.41699)"
            fill="currentColor"
          />
          <rect x="73.3525" y="12.8345" width="6.11973" height="81.4973" fill="currentColor" />
        </g>
      </svg>
    </div>
  )
}

export default CryptoPunks
