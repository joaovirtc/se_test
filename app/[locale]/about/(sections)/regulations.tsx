import Image from "next/image"

import regulation1 from "@/public/regulations/AS-9100.jpg"
import regulation2 from "@/public/regulations/bpmn.jpg"
import regulation3 from "@/public/regulations/bsc.jpg"
import regulation4 from "@/public/regulations/cobit.jpg"
import regulation5 from "@/public/regulations/fssc-22000.jpg"
import regulation6 from "@/public/regulations/iatf-16949.jpg"
import regulation7 from "@/public/regulations/iso-10015.jpg"
import regulation8 from "@/public/regulations/iso-13485.jpg"
import regulation9 from "@/public/regulations/iso-14001.jpg"
import regulation10 from "@/public/regulations/iso-14971.jpg"
import regulation11 from "@/public/regulations/iso-15189.jpg"
import regulation12 from "@/public/regulations/iso-20000.jpg"
import regulation13 from "@/public/regulations/iso-22000.jpg"
import regulation14 from "@/public/regulations/iso-22301.jpg"
import regulation15 from "@/public/regulations/iso-26000.jpg"
import regulation16 from "@/public/regulations/iso-27001.jpg"
import regulation17 from "@/public/regulations/iso-31000.jpg"
import regulation18 from "@/public/regulations/iso-37001.jpg"
import regulation19 from "@/public/regulations/iso-45001.jpg"
import regulation20 from "@/public/regulations/iso-50001.jpg"
import regulation21 from "@/public/regulations/iso-55000.jpg"
import regulation22 from "@/public/regulations/iso-9001.jpg"
import regulation23 from "@/public/regulations/itil.jpg"
import regulation24 from "@/public/regulations/pmbok.jpg"
import regulation25 from "@/public/regulations/sixsigma.jpg";
import { useTranslations } from "next-intl";

export default function LogoCarousel() {
  const t = useTranslations('AboutPage');
  const logos = [
    { src: regulation1, alt: "AS-9100" },
    { src: regulation2, alt: "bpmn" },
    { src: regulation3, alt: "bsc" },
    { src: regulation4, alt: "cobit" },
    { src: regulation5, alt: "fssc-22000" },
    { src: regulation6, alt: "iatf-16949" },
    { src: regulation7, alt: "iso-10015" },
    { src: regulation8, alt: "iso-13485" },
    { src: regulation9, alt: "iso-14001" },
    { src: regulation10, alt: "iso-14971" },
    { src: regulation11, alt: "iso-15189" },
    { src: regulation12, alt: "iso-20000" },
    { src: regulation13, alt: "iso-22000" },
    { src: regulation14, alt: "iso-22301" },
    { src: regulation15, alt: "iso-26000" },
    { src: regulation16, alt: "iso-27001" },
    { src: regulation17, alt: "iso-31000" },
    { src: regulation18, alt: "iso-37001" },
    { src: regulation19, alt: "iso-45001" },
    { src: regulation20, alt: "iso-50001" },
    { src: regulation21, alt: "iso-55000" },
    { src: regulation22, alt: "iso-9001" },
    { src: regulation23, alt: "itil" },
    { src: regulation24, alt: "pmbok" },
    { src: regulation25, alt: "sixsigma" },

  ]

  return (
    <div className="">
      <h2 className='tracking-tighter text-2xl 2xl:text-3xl font-bold'>{t('regulations')}</h2>
      <div className="w-full grid grid-cols-4 lg:grid-cols-5 gap-8 mt-7 2xl:mt-14">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              className="w-16 sm:w-20 md:w-24 lg:w-26"
            />
          </div>
        ))}
      </div>
    </div>
  )
}