import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { LazyLoadImage } from '../EmblaCarouselLazyLoadImage'
import { NextButton, PrevButton, usePrevNextButtons } from '../EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from '../EmblaCarouselDotButton'
import type { Artifact } from '@/app/types/artifact'
import type { Case } from '@/app/types/case'
import GuideFlow from '@/app/components/modules/media/carousel/guideflow/GuideFlow'
import VideoPlayer from '@/app/components/modules/media/carousel/Video'
import { COOKIE_KEYS } from "@/app/constants/cookies"
import ToggleFormCarousel from "@/app/components/modules/forms/Modals/BookDemoSlideModal"
import { getCookie } from 'cookies-next'
import CaseCard from "@/app/components/system/cards/card-case"
import { useTranslations } from "next-intl"
import useIsMobile from "@/app/utils/useIsMobile"
import BookDemoForm from '../../../../forms/BookDemoForm'
import { RiExpandDiagonalLine, RiCollapseDiagonalLine } from '@remixicon/react'
import Button from '@/app/components/system/Button'

type Props = {
  slides?: Artifact[]
  options?: EmblaOptionsType
  cases?: Case[]
  className?:string;
  isFullscreen?: boolean
  onExpandClick?: () => void;
  initialSlide?: number;
  onSlideChange?: (index: number) => void;
}

const EmblaCarouselArtifacts: React.FC<Props> = (props) => {
  const { slides, options, cases, className, onExpandClick, initialSlide, onSlideChange, isFullscreen } = props
  const [emblaRed, emblaApi] = useEmblaCarousel(options)
  const [slidesInView, setSlidesInView] = useState<number[]>([])
  const appVersion = getCookie(COOKIE_KEYS.VERSION)
  const isVersionLight = appVersion === "true"
  const t_cases = useTranslations("AboutPage")
  const t_form = useTranslations("FormBookDemo")
  const isMobile = useIsMobile()

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);
 
  useEffect(() => {
    if (!emblaApi || !onSlideChange) return

    const handleSelect = () => {
      onSlideChange(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', handleSelect)
    return () => {
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi, onSlideChange])

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView)
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index))
      return slidesInView.concat(inView)
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateSlidesInView(emblaApi)
    emblaApi.on('slidesInView', updateSlidesInView)
    emblaApi.on('reInit', updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

  useEffect(() => {
    if (!emblaApi) return

    const onInit = () => {
      const currentHash = window.location.hash.replace("#", "")

      if (currentHash) {
        const slideNodes = emblaApi.slideNodes()
        const index = slideNodes.findIndex(
          (node) => node.dataset.hash === currentHash
        )

        if (index !== -1) {
          emblaApi.scrollTo(index, true)
        }
      }
    }

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap()
      const slideNode = emblaApi.slideNodes()[index]
      const hash = slideNode?.dataset.hash

      if (hash) {
        window.location.hash = hash
      }
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
    <div className={`embla ${className}`}>
      <div className="embla__viewport" ref={emblaRed}>
        <div className="embla__container">
          {slides?.map((artifact, index) => (
            <React.Fragment key={index}>
              {/* SLIDES DAS IMAGENS */}
              {artifact.media.data &&
                artifact.media.data.map((media, mIndex) => {
                  const isVideo = media.attributes.url.endsWith(".mp4")
                  return (
                    <div className="embla__slide" key={mIndex} data-hash={artifact.id}>
                      <p className="embla__slide__title">{artifact.title}</p>
                      {isVideo
                        ? <VideoPlayer src={media.attributes.url} />
                        : <LazyLoadImage
                          index={index}
                          imgSrc={media.attributes.url}
                          inView={slidesInView.includes(mIndex)}
                          imgAlt={artifact.title}
                        />
                      }
                    </div>
                  )
                })
              }

              {/* SLIDE DO GUIDEFLOW */}
              {artifact.guideflow_id && (
                <div className="embla__slide" data-hash={artifact.id}>
                  <p className="embla__slide__title">{artifact.title}</p>
                  <GuideFlow flowId={artifact.guideflow_id} />
                </div>
              )}

              {/* SLIDE DO YOUTUBE */}
              {artifact.youtube_id &&
                <div className="embla__slide" data-hash={artifact.id}>
                  <p className="embla__slide__title">{artifact.title}</p>
                  <VideoPlayer src={`https://www.youtube.com/watch?v=${artifact.youtube_id}`} />
                </div>
              }
            </React.Fragment>
          ))}

          {/* SLIDE DE CASES */}
          {isVersionLight && !isMobile &&
            <div className="embla__slide" data-hash="success-cases">
              <h2 className="embla__slide__title">
                {t_cases("success-cases")}
              </h2>
              <div className='h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center mt-5 px-5 w-full custom_zoom_form'>
                {cases?.slice(0, 3).map((item, index) => (
                  <CaseCard key={item.id} item={item} index={index} />
                ))}
              </div>
              <ul className="hidden lg:flex w-full mx-auto justify-between flex-col gap-8 lg:flex-row mt-6 max-w-6xl">
                <li className="flex flex-col flex-1 justify-center items-center">
                  <p className="text-coreBlue500 text-2xl 3xl:text-4xl font-semibold">
                    +3.000.000
                  </p>
                  <span className="text-coreBlue500 mt-2">{t_cases("users")}</span>
                </li>
                <li className="flex flex-col flex-1 justify-center items-center">
                  <p className="text-coreBlue500 text-2xl 3xl:text-4xl font-semibold">
                    +300
                  </p>
                  <span className="text-coreBlue500 mt-2">{t_cases("partners")}</span>
                </li>
                <li className="flex flex-col flex-1 justify-center items-center">
                  <p className="text-coreBlue500 text-2xl 3xl:text-4xl font-semibold">
                    +50
                  </p>
                  <span className="text-coreBlue500 mt-2">{t_cases("countries")}</span>
                </li>
              </ul>
            </div>
          }

          {/* SLIDE FORM */}
          {isVersionLight &&
            <div className='embla__slide' data-hash="book-a-demo">
              <div className="w-full mx-auto flex flex-col md:flex-col justify-between items-center pb-10 custom_zoom_form">
                <div className="w-full max-w-xl grid gap-2 lg:mt-7">
                  <h2 className="text-coreBlue500 font-semibold text-2xl 2xl:text-4xl">
                    {t_form("title_slide_book_demo")}
                    <span className="text-white bg-transparent">&#128512;</span>
                  </h2>
                  <p className="text-sm 2xl:text-base text-neutral-700">
                    {t_form("desc_slide_book_demo")}
                  </p>
                </div>
                <div className="hidden sm:block w-full max-w-xl">
                  <BookDemoForm />
                </div>
                <div className="block sm:hidden w-full">
                  <ToggleFormCarousel />
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>

        <div className="embla__buttons">
          {onExpandClick && (
            <Button 
              onClick={onExpandClick} 
              icon={isFullscreen ? <RiCollapseDiagonalLine size={20}/> : <RiExpandDiagonalLine size={20}/>}
              variant='tertiary_button'
              aria-label={isFullscreen ? "Close expand view" : "Expand view"}
              title={isFullscreen ? "Close expand view" : "Expand view"}
              className='w-10 h-full rounded-full'
            />
          )}
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarouselArtifacts