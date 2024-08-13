import type { BaseBlock } from '@/components/Home/types'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { type CEX } from './Cex'
import css from './styles.module.css'

const SlidingContent = dynamic(() => import('./SlidingContent'))

const Cexes = ({ title, caption, cexes }: BaseBlock & { cexes: CEX[] }) => {
  const backgroundRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={backgroundRef} className={css.sectionContainer}>
      <div className={css.stickyContainer}>
        <SlidingContent title={title} caption={caption} cexes={cexes} containerRef={backgroundRef} />
      </div>
    </div>
  )
}

export default Cexes
