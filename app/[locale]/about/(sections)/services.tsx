import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import ServiceImage from "@/public/services.png"
import ServiceImageFR from "@/public/services-fr.svg";

export default function ServicesSection () {

  const t = useTranslations('AboutPage');
  const locale = useLocale();

  return (
      <div className="">
          <h2 className='tracking-tighter text-2xl 2xl:text-3xl font-bold'>{t('services')}</h2>
          <div className='w-full flex flex-col md:flex-row justify-center items-start mt-2 lg:mt-7 gap-x-10 gap-y-5'>
            <div className='w-full xl:w-2/3'>
              <p className='text-xs md:text-base'>
                {t.rich('descServices_row1', {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </p>
              <br />
              <p className='text-xs md:text-base'>
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
                  className='mx-auto w-[80%] 2xl:w-[90%]'
                />
              :
                <Image
                  src={ServiceImage}
                  alt=''
                  className='mx-auto w-[80%] 2xl:w-[90%]'
                />
              }
            </div>

          </div>
        </div>
  )

}