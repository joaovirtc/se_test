import Map from "@/public/softexpert-global.svg"
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MapSection() {
  const t = useTranslations('AboutPage');
  return (
    <div className='w-full flex flex-col mt-4 h-full'>
      <h2 className='tracking-tighter text-2xl xl:text-3xl font-bold'>{t('worldwideOffice')}</h2>
      <p className='text-base text-gray-500 leading-[22px] lg:leading-6 font-normal my-3'>
        {t('worldwideOfficeDescription')}
      </p>
      <div className='w-full sm:w-[80%] mx-auto mt-10'>
        <Image
          src={Map}
          alt='Map'
          loading='eager'
          className='w-full'
        />
      </div>
    </div>
  )
}