import React, { ReactNode, useEffect } from 'react'
import { RiCloseLine } from '@remixicon/react'
import Button from '@/app/components/system/Button'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  onClose: () => void
}

const ModalCarouselArtifacts: React.FC<Props> = ({ children, onClose }) => {

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[9999] bg-white backdrop-blur-sm animate-in fade-in duration-200">
      {/* <Button
        onClick={onClose}
        icon={<RiCloseLine />}
        variant='tertiary_button'
        aria-label="Close Expand view"
        title='Close Expand view'
        className='w-10 h-10 rounded-full absolute top-4 right-4 z-10'
      /> */}

      <motion.div
        className="relative h-full w-full p-4 md:p-8 bg-neutral-50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ModalCarouselArtifacts