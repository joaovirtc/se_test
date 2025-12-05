'use client'

import React, { useCallback, useEffect, useState, ReactNode } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'


type Props = {
  options?: EmblaOptionsType;
  children: ReactNode;
}

const EmblaCarouselBase: React.FC<Props> = ({ options, children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [slidesInView, setSlidesInView] = useState<number[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const updateSlidesInView = useCallback((embla: EmblaCarouselType) => {
    setSlidesInView((prev) => {
      if (prev.length === embla.slideNodes().length) {
        embla.off("slidesInView", updateSlidesInView)
      }
      const newlyVisible = embla
        .slidesInView()
        .filter((i) => !prev.includes(i))
      return prev.concat(newlyVisible)
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    updateSlidesInView(emblaApi)
    emblaApi.on("slidesInView", updateSlidesInView)
    emblaApi.on("reInit", updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

  /**
   * HASH SYNC
   */
  useEffect(() => {
    if (!emblaApi) return

    const onInit = () => {
      const hash = window.location.hash.replace("#", "")
      if (!hash) return

      const index = emblaApi
        .slideNodes()
        .findIndex((node) => node.dataset.hash === hash)

      if (index !== -1) emblaApi.scrollTo(index, true)
    }

    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap()
      const node = emblaApi.slideNodes()[idx]
      const hash = node?.dataset.hash

      if (hash) window.location.hash = hash
    }

    emblaApi.on("init", onInit)
    emblaApi.on("select", onSelect)

    onInit()
    onSelect()

    return () => {
      emblaApi.off("init", onInit)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {children}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot' + (index === selectedIndex ? ' embla__dot--selected' : '')}
            />
          ))}
        </div>

        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarouselBase
