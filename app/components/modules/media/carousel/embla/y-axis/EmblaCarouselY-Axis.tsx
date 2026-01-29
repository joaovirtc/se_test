import React, { useEffect, useCallback, useRef } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from '../EmblaCarouselDotButton'
import "./style.css"

type Section = {
  id: string;
  component: React.ReactNode;
};

type PropType = {
  slides: Section[]
  children?: React.ReactNode
  options?: EmblaOptionsType
  scrollDelay?: number
}

const EmblaCarousel = (props: PropType) => {
  const { children, slides, options, scrollDelay = 300 } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const isScrolling = useRef(false)
  
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)
  
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!emblaApi || isScrolling.current) return
    e.preventDefault()

    isScrolling.current = true


    if (e.deltaY > 0) {
      emblaApi.scrollNext()
    } else if (e.deltaY < 0) {
      emblaApi.scrollPrev()
    }

    setTimeout(() => {
      isScrolling.current = false
    }, scrollDelay)
  }, [emblaApi, scrollDelay])

  useEffect(() => {
    const viewport = emblaApi?.rootNode()
    if (!viewport) return

    viewport.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      viewport.removeEventListener('wheel', handleWheel)
    }
  }, [emblaApi, handleWheel])

  return (
    <div className="embla-y">
      <div className="embla__viewport-y" ref={emblaRef}>
        <div className="embla__container-y">
          {/* {slides.map((slide) => (
            <div className="embla__slide-y overflow-hidden" key={slide.id}>
              {slide.component}
            </div>
          ))} */}
          {children}
        </div>
      </div>
      <div className="embla__controls-y">
        <div className="embla__buttons-y">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla__dots-y">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot-y'.concat(
                index === selectedIndex ? ' embla__dot--selected-y' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel