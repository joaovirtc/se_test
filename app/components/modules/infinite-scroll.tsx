import Image from "next/image"

import customer1 from "@/public/customers/Adma_biologics_29b18a07be.png"
import customer2 from "@/public/customers/Bosch_ac75fd8ffe.png"
import customer3 from "@/public/customers/Bridgestone_17e75de1a9.png"
import customer4 from "@/public/customers/Electrolux_53d0cef3d0.png"
import customer5 from "@/public/customers/Lala_ee0ce0301a.png"
import customer6 from "@/public/customers/Naturgy_2ac972d9bc.png"
import customer7 from "@/public/customers/Nidec_044cb3486e.png"
import customer8 from "@/public/customers/Pepsico_d28b3e8d3e.png"
import customer9 from "@/public/customers/aeromexico_596d910c66.png"
import customer10 from "@/public/customers/engie_df5b206558.png"
import customer11 from "@/public/customers/hyundai_6e1d27197f.png"
import customer12 from "@/public/customers/raizen_22fe4fd46a.png"
import customer13 from "@/public/customers/sonda_5465ea81dc.png"
import customer14 from "@/public/customers/vertex_895ffa0abf.png"
import customer15 from "@/public/customers/vodafone_194bfdb7f7.png"
import customer16 from "@/public/customers/yorozu_1bfd0b958b.png"

export default function LogoCarousel() {

    const logos = [
      { src: customer1, alt: 'Cliente=Arca Continental' },
      { src: customer2, alt: 'Cliente=Biosev' },
      { src: customer3, alt: 'Cliente=BRF' },
      { src: customer4, alt: 'Cliente=Carrier' },
      { src: customer5, alt: 'Cliente=Engie' },
      { src: customer6, alt: 'Cliente=Farmindustria' },
      { src: customer7, alt: 'Cliente=Hermes Pardini' },
      { src: customer8, alt: 'Cliente=Hyundai' },
      { src: customer9, alt: 'Cliente=MRN' },
      { src: customer10, alt: 'Cliente=Nidec' },
      { src: customer11, alt: 'Cliente=Raízen' },
      { src: customer12, alt: 'Cliente=Sicredi' },
      { src: customer13, alt: 'Cliente=Simoldes' },
      { src: customer14, alt: 'Cliente=Sismex' },
      { src: customer15, alt: 'Cliente=Unimed' },
      { src: customer16, alt: 'Cliente=Unimed' },
     
    ]
  
    return (
      <div className="w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] hover:[animation-play-state:paused]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll select-none">
          {logos.map((logo, index) => (
            <li key={index} className="">
              <Image src={logo.src} alt={logo.alt} width={114} height={30} />
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll select-none" aria-hidden="true">
          {logos.map((logo, index) => (
            <li key={index}>
              <Image src={logo.src} alt={logo.alt} width={114} height={30} />
            </li>
          ))}
        </ul>
      </div>
    )
}