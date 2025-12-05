'use client'

import React, { useState, useEffect } from 'react'
import type { EmblaOptionsType } from 'embla-carousel'
import type { Artifact } from '@/app/types/artifact'
import type { Case } from '@/app/types/case'
import EmblaCarouselArtifacts from './EmblaCarouselArtifacts'
import ModalCarouselArtifacts from './ModalCarouselArtifacts'

type Props = {
  slides?: Artifact[]
  cases?: Case[]
}

const EmblaCarouselWrapper: React.FC<Props> = ({ slides, cases }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleOpenModal = () => {
    if (isModalOpen) return
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
    document.documentElement.requestFullscreen?.()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''

    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    }
  }

  // Fecha modal quando sai do fullscreen (ESC incluso)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement
      if (!isFullscreen) {
        handleCloseModal()
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Abrir com tecla F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        if (isModalOpen) {
          handleCloseModal()
        } else {
          handleOpenModal()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen]);

  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: 1
  }

  return (
    <>
      <EmblaCarouselArtifacts
        slides={slides}
        options={OPTIONS}
        cases={cases}
        onExpandClick={handleOpenModal}
        isFullscreen={false}
        initialSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

      {isModalOpen && (
        <ModalCarouselArtifacts onClose={handleCloseModal}>
          <EmblaCarouselArtifacts
            slides={slides}
            className="embla__fullscreen"
            options={OPTIONS}
            cases={cases}
            isFullscreen={true}
            onExpandClick={handleCloseModal}
            initialSlide={currentSlide}
            onSlideChange={setCurrentSlide}
          />
        </ModalCarouselArtifacts>
      )}
    </>
  )
}

export default EmblaCarouselWrapper
