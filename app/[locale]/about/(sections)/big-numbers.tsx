'use client'

import { RiArrowRightLine } from '@remixicon/react'
import { useTranslations } from 'next-intl';
import CardBigNumber from "@/app/components/system/cards/card-big-number"
import Link from 'next/link'
import Image from 'next/image'
import AWS from "@/public/certfications/aws-certifate.png"
import iso from "@/public/certfications/iso27001.png"
import certificateCapterra from "@/public/certfications/capterra.svg"
import certificateSoftwareAdvice from "@/public/certfications/software-adivice.png"
import certificateGetApp1 from "@/public/certfications/getapp.png"
import { RiStarSFill } from '@remixicon/react';
import useIsMobile from '@/app/utils/useIsMobile';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

export default function SliderBigNumbers() {
    const [shine, setShine] = useState(true);

    useEffect(() => {
        if (shine) {
            const timer = setTimeout(() => setShine(false), 1200); // tempo da animação
            return () => clearTimeout(timer);
        }
    }, [shine]);
    const t = useTranslations('AboutPage');
    const certificates = [
        { src: AWS },
        { src: iso },
        { src: "https://assets.softexpert.com/software_advice_2025_badge_359d0c3b3f.svg" },
        { src: "https://assets.softexpert.com/getapp_2025_badge_27fac46917.svg" },
        { src: "https://assets.softexpert.com/capterra_2025_badge_738d4beb98.svg" },
        { src: certificateCapterra },
        { src: certificateGetApp1 },
        { src: certificateSoftwareAdvice },
    ];
    const isMobile = useIsMobile();

    return (
        <>
            <h1 className='tracking-tighter text-2xl xl:text-3xl font-bold'>{t('aboutSoftExpert')}</h1>
            <div className="w-full grid place-items-center">
                <div className="w-full flex flex-col overflow-hidden pb-2 md:py-3 justify-center items-center gap-y-4 relative mt-4">
                    <div className='w-[94%] lg:w-full grid grid-cols-2 lg:grid-cols-3 gap-1 mb-0 md:mb-2 place-items-center'>
                        <CardBigNumber number={t('3,000')} label={t('customers')} />
                        <CardBigNumber number={t('600k')} label={t('users')} />
                        <CardBigNumber number={"50"} label={t('countries')} />
                        <CardBigNumber number={"300"} label={t('partners')} />
                        <CardBigNumber number={"1995"} label={t('emerged')} />
                        <CardBigNumber number={"+900"} label={t('employees')} />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-2 3xl:mt-10 gap-y-2 2xl:gap-y-4 custom-zoom'>
                        <div className='flex gap-x-3 relative'>
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={shine ? { scale: [1, 1.2, 1] } : false}
                                    transition={{
                                        duration: 1.2,
                                        delay: i * 0.15,
                                    }}
                                    className="relative"
                                >
                                    <RiStarSFill
                                        color={
                                            i === 0
                                                ? "#9ce000"
                                                : i === 3
                                                    ? "#95e200"
                                                    : i === 4
                                                        ? "#98e106"
                                                        : "#99e100"
                                        }
                                        size={isMobile ? 33 : 40}
                                    />
                                    {shine && (
                                        <motion.span
                                            initial={{ left: "-60%" }}
                                            animate={{ left: "120%" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2 + i * 0.12,
                                                ease: "easeInOut",
                                            }}
                                            className="absolute top-0 left-0 w-2/3 h-full pointer-events-none"
                                            style={{
                                                background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                                                filter: "blur(1px)",
                                            }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        <h2 className={`text-xl 2xl:text-3xl max-w-[400px] text-center font-semibold`}>
                            {t('recognition')}
                        </h2>


                        <div className="w-full flex flex-wrap justify-center lg:justify-between gap-4 mt-4 sm:mt-0">
                            {certificates.map((certifate, index) => (
                                <div className="relative h-[70px] w-[80px] md:h-[100px] 2xl:w-[110px]" key={index}>
                                    <Image fill={true} className="object-contain" src={certifate.src} alt="" />
                                </div>
                            ))}
                        </div>

                    </div>



                </div>

                <div className='w-full flex mt-3 justify-center lg:justify-end items-center'>
                    <Link href={t('linkCompany')} rel="noopener noreferrer" target='_blank' className="text-base flex mr-3 justify-center items-center gap-2 text-coreBlue500 hover:underline">
                        {t('moreAbout')}
                        <RiArrowRightLine size={20} />
                    </Link>
                </div>
            </div>
        </>
    )

}