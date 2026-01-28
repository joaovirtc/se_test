'use client'

import { useTranslations, useLocale } from 'next-intl';
import Customers from './(sections)/customers/customers'
import Regulations from './(sections)/regulations'
import Industries from './(sections)/industries'
import BigNumbers from './(sections)/big-numbers'
import MapSection from './(sections)/map'
import ExtendERP from './(sections)/erp'
import Services from './(sections)/services'
import EmblaCarousel from '@/app/components/modules/media/carousel/embla/y-axis/EmblaCarouselY-Axis'
import { EmblaOptionsType } from 'embla-carousel'


export default function About() {

  const SLIDES = [
    { id: "big-numbers", component: <BigNumbers /> },
    { id: "customers", component: <Customers /> },
    { id: "map", component : <MapSection /> },
    { id : "industries", component: <Industries /> },
    { id : "extend-your-ERP", component: <ExtendERP />},
    { id : "regulations", component: <Regulations/>},
    { id: "services", component: <Services /> }
  ]

  const t = useTranslations('AboutPage');
  const locale = useLocale();
  const OPTIONS: EmblaOptionsType = { axis: 'y' }


  return (
    <div className='relative'>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} scrollDelay={350}>
          {SLIDES.map((slide) => (
            <div className="embla__slide-y" key={slide.id}>
              {slide.component}
            </div>
          ))}
        </EmblaCarousel>
    </div>
  );
}
