import { useTranslations } from "next-intl";
import ERP from "@/public/erp-suite-new.svg";
import Image from "next/image";

export default function ExtendERP() {

  const t = useTranslations('AboutPage');

  return (
    <div className="">
      <h2 className='tracking-tighter text-2xl xl:text-3xl font-bold'>{t('extendERP')}</h2>
      <div className='w-full mt-2 space-y-6'>
        <p className='text-xs md:text-base'>
          {t.rich('extendERPDesc_row1', {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </p>
        <p className='text-xs md:text-base'>
          {t.rich('extendERPDesc_row2', {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </p>

        <div className='w-full mx-auto max-w-[600px] mt-5'>
          <Image
            src={ERP}
            alt='ERP Image'
            className='mx-auto custom-zoom-mobile w-[87%] 3xl:w-[100%]'
          />
        </div>
      </div>
    </div>
  )


}