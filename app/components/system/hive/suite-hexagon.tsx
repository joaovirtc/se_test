"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { RiCloseLine } from "@remixicon/react";
import { Tooltip } from "@/app/components/system/tooltip";
import VideoPlayer from "@/app/components/ui/slide/artifacts/video";
import iconeSuite from "@/public/icon-suite.png";

export default function SuiteHexagon() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const langVideoSuite = () => {
    let linkSuite = "";
    if (locale === "pt-BR") {
      linkSuite = "vNm9Rno8wns";
    } else if (locale === "es") {
      linkSuite = "7oSp3HW2Wk8";
    } else {
      linkSuite = "SHS9pX_EOjE";
    }
    return linkSuite;
  };

  const toggleShowVideoModal = () => {
    setIsVisible(!isVisible);
  };

  const tr = useTranslations("otherTranslations");
  return (
    <>
      {isVisible && (
        <div
          onClick={toggleShowVideoModal}
          className="bg-linear-to-b from-black/48 to-black/73 backdrop-blur-xs fixed w-full h-svh z-50 p-4 left-0 top-0 flex flex-col justify-center items-center"
        >
          <div className="max-w-[1210px] w-full flex items-center justify-end">
            <button
              onClick={toggleShowVideoModal}
              className="z-10 -top-12 -right-16 text-white cursor-pointer transition-colors hover:bg-zinc-950/50 rounded-full p-1"
            >
              <RiCloseLine size={32} />
            </button>
          </div>
          <motion.div
            className="bg-black rounded-lg max-w-[1140px] w-[90%] sm:w-3/4 lg:w-2/3 h-fit md:h-[70%] flex items-center justify-center"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="w-full h-full overflow-hidden rounded-lg aspect-video">
              <VideoPlayer
                url={`https://www.youtube.com/watch?v=${langVideoSuite()}`}
                playing={false}
                controls={true}
                loop={false}
                volume={0.2}
              />
            </div>
          </motion.div>
        </div>
      )}
      <Tooltip content={tr("suite")}>
        <motion.div
          className="hexagon-container suite"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
          onClick={toggleShowVideoModal}
        >
          <div className="vertical suite" data-solucao="suite">
            <span>
              <Image 
                src={"https://assets.softexpert.com/Soft_Expert_Suite_branco_6fd43429a1.svg"} 
                alt="logo-softexpert-suite" 
                width={60} 
                height={60}
                className="mt-1"
              />
            </span>
            <span className="mt-1">SUITE</span>
          </div>
          <div className="horizontal suite" data-solucao="suite"></div>
          <div className="diagonal suite" data-solucao="suite"></div>
        </motion.div>
      </Tooltip>
    </>
  );
}
