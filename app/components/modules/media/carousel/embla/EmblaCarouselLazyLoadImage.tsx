import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import CarouselSkeleton from '@/app/components/modules/media/carousel/embla/CarouselSkeleton'

type PropType = {
  imgSrc: string
  imgAlt: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView, imgAlt } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView])

  return (
    <div
      className={'embla__lazy-load'.concat(
        hasLoaded ? ' embla__lazy-load--has-loaded' : ''
      )}
    >
      {!hasLoaded && (
        <div className="absolute inset-0 flex flex-col mt-10 items-center justify-center">
          <CarouselSkeleton />
        </div>
      )}
      
      {inView && (
        <Image
          className="embla__slide__img embla__lazy-load__img"
          onLoad={setLoaded}
          src={imgSrc}
          alt={imgAlt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          quality={90}
          priority={true}
        />
      )}
    </div>
  )
}