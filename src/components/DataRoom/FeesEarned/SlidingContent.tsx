import css from './styles.module.css'
import type { FeeType } from './Fee'
import { useSafeDataRoomStats } from '@/hooks/useSafeDataRoomStats'
import dynamic from 'next/dynamic'
import type { RefObject } from 'react'
import { useIsMediumScreen } from '@/hooks/useMaxWidth'
import { useScroll, motion, useTransform } from 'framer-motion'

const Fee = dynamic(() => import('./Fee'))

const ANNUAL_SWAP_FEES_FALLBACK = 1822878.426773334
const TOTAL_BARS = 10

const SlidingContent = ({ fees, containerRef }: { fees: FeeType[]; containerRef: RefObject<HTMLDivElement> }) => {
  const { annualSwapFees } = useSafeDataRoomStats()
  const isMobile = useIsMediumScreen()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const transformLTR = useTransform(scrollYProgress, [0.35, 0.65], ['66.66%', '0%'])
  const displaySwapFees = annualSwapFees ? annualSwapFees : ANNUAL_SWAP_FEES_FALLBACK
  const feesMap = [displaySwapFees]

  return (
    <motion.div
      style={{
        x: isMobile ? transformLTR : 0,
      }}
      className={css.feeContainer}
    >
      {fees.map((fee, index) => (
        <Fee
          key={fee.label}
          totalBars={TOTAL_BARS}
          feeAmount={feesMap[index]}
          isLocked={fee.isLocked}
          label={fee.label}
        />
      ))}
    </motion.div>
  )
}

export default SlidingContent
