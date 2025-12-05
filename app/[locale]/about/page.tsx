'use client'

import Image from 'next/image'
import Map from "@/public/softexpert-global.svg"
import ERP from "@/public/erp-suite-new.svg"
import ServiceImage from "@/public/services.png"
import { useTranslations, useLocale } from 'next-intl';
import Customers from './(sections)/customers/customers'
import Regulations from './(sections)/regulations'
import Industries from './(sections)/industries'
import SliderBigNumbers from './(sections)/big-numbers'
import ServiceImageFR from "@/public/services-fr.svg"


import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Mousewheel, Keyboard, HashNavigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function About() {

  const t = useTranslations('AboutPage');
  const locale = useLocale();


  return (
    <>
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        hashNavigation={{
          watchState: true,
        }}
        keyboard={true}
        modules={[Mousewheel, Pagination, Keyboard, HashNavigation]}
        className="mt-5 lg:mt-10 h-[110svh] min-[1400px]:h-[88svh] relative w-full custom-zoom swiper-vertical-about"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }}
      >
        <SwiperSlide className='flex w-full mx-auto max-w-[996px] 3xl:max-w-6xl overflow-hidden' >
          <SliderBigNumbers />
        </SwiperSlide>

        <SwiperSlide data-hash="customers" className='overflow-hidden max-w-[1000px] 3xl:max-w-6xl mx-auto'>
          <h2 className="tracking-tighter text-2xl 2xl:text-3xl font-bold mb-4">{t('someCustomers')}</h2>
          <Customers />
        </SwiperSlide>
        
        <SwiperSlide data-hash="map" className='overflow-hidden max-w-[1000px] 3xl:max-w-6xl mx-auto'>
          <div className='w-full flex flex-col mt-4 h-full'>
            <h2 className='tracking-tighter text-2xl xl:text-3xl font-bold'>{t('worldwideOffice')}</h2>
            <p className='text-sm md:text-base text-gray-500 leading-[22px] lg:leading-6 font-normal my-3'>
              {t('worldwideOfficeDescription')}
            </p>
            <div className='grid place-items-center w-full mt-0 h-[80%]'>
              <Image
                src={Map}
                alt='Map'
                loading='eager'
                className='mx-auto w-full'
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide data-hash="industries" className='overflow-hidden max-w-[1000px] 3xl:max-w-6xl mx-auto'>
          <Industries />
        </SwiperSlide>

        <SwiperSlide data-hash="extend-your-ERP" className='overflow-hidden max-w-6xl mx-auto'>
          <h2 className='tracking-tighter text-2xl 2xl:text-3xl font-bold'>{t('extendERP')}</h2>
          <div className='w-full mt-7 space-y-6'>
            <p className='text-sm md:text-base'>
              {t.rich('extendERPDesc_row1', {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <p className='text-sm md:text-base'>
              {t.rich('extendERPDesc_row2', {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>

            <div className='grid place-items-center w-full'>
              <Image
                src={ERP}
                alt='ERP'
                className='w-[90%] max-w-[650px] mx-auto'
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide data-hash="regulations" className='overflow-hidden max-w-6xl mx-auto'>
          <h2 className='tracking-tighter text-2xl 2xl:text-3xl font-bold'>{t("regulations")}</h2>
          <Regulations />
        </SwiperSlide>

        <SwiperSlide data-hash="services" className='overflow-hidden max-w-[1000px] 3xl:max-w-6xl mx-auto'>
          <h2 className='tracking-tighter text-2xl 2xl:text-3xl font-bold'>{t('services')}</h2>
          <div className='w-full flex flex-col md:flex-row justify-center items-start mt-2 lg:mt-7 gap-x-10 gap-y-5'>
            <div className='w-full xl:w-2/3'>
              <p className='text-sm md:text-base'>
                {t.rich('descServices_row1', {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </p>
              <br />
              <p className='text-sm md:text-base'>
                {t.rich('descServices_row2', {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </p>
            </div>
            <div className='w-full xl:w-3/3 flex items-center'>
              {locale === "fr" ? 
                <Image
                  src={ServiceImageFR}
                  alt=''
                  className='mx-auto custom-zoom w-[80%] 2xl:w-[90%]'
                />
              :
                <Image
                  src={ServiceImage}
                  alt=''
                  className='mx-auto custom-zoom w-[80%] 2xl:w-[90%]'
                />
              }
            </div>

          </div>
        </SwiperSlide>
      </Swiper >
    </>
  );
}
