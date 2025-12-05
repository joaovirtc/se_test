"use client";
import Image from "next/image";
import VideoPlayer from "./video";
import CaseCard from "@/app/components/system/cards/card-case";
import { Industry } from "@/app/types/industry";
import { Case } from "@/app/types/case";
import BookDemoForm from "@/app/components/modules/forms/BookDemoForm";
import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import GuideFlow from "./guide-flow";
import useIsMobile from "@/app/utils/useIsMobile";
import useIsLaptop from "@/app/utils/useIsLaptop";
import { useCookie } from "@/app/utils/get-cookie/client";
import ModalBookDemo from "@/app/components/modules/forms/Modals/BookDemoSlideModal";
import LogoColorida from "@/public/logo-colorida.png";
import { RiCloseLine, RiExpandDiagonalLine } from "@remixicon/react";
import {
  Pagination,
  Navigation,
  Keyboard,
  Zoom,
  HashNavigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { COOKIE_KEYS } from "@/app/constants/cookies";



interface Props {
  artifacts: Industry["attributes"]["sections_demo"][number]["artifacts"];
  cases?: Case[];
}

export default function SlideArtifacts({ artifacts, cases }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();
  const cookieDemoValue = useCookie(COOKIE_KEYS.VERSION);
  const isDemoLight = cookieDemoValue === "true";

  const t = useTranslations("FormBookDemo");
  const tr = useTranslations("AboutPage");
  const traslates = useTranslations("otherTranslations");

  const toggleModalArtifacts = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleExpandClick = () => {
    toggleModalArtifacts();
    document.documentElement.requestFullscreen?.();
  };

  const handleCloseModal = () => {
    toggleModalArtifacts();
    document.exitFullscreen?.();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        document.exitFullscreen?.();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsModalOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isModalOpen]);


  const renderSlides = () => (
    <>
      {artifacts.map((artifact, index) => (
        <SwiperSlide key={index} data-hash={`${artifact.id}`}>
          <ArtifactSlide artifact={artifact} isMobile={isMobile} isLaptop={isLaptop} />
        </SwiperSlide>
      ))}
      {!isMobile && isDemoLight && (
        <SwiperSlide data-hash="success-cases">
          <SuccessCasesSlide cases={cases} tr={tr} />
        </SwiperSlide>
      )}
      {isDemoLight && (
        <SwiperSlide data-hash="book-a-demo">
          <BookDemoSlide t={t} isMobile={isMobile} />
        </SwiperSlide>
      )}
    </>
  );


  return (
    <>
      <Swiper
        spaceBetween={80}
        centeredSlides={true}
        grabCursor={false}
        zoom={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        hashNavigation={{
          watchState: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Keyboard, Zoom, HashNavigation]}
        className="slideArfact h-full"
      >
        <div className="relative">
          <div title={traslates("expand")} className="absolute w-fit bottom-6 left-0 2xl:-right-2 flex flex-col items-end z-10">
            <button
              onClick={handleExpandClick}
              type="button"
              className="hidden lg:grid outline-none rounded-full text-gray-700 p-2 place-items-center cursor-pointer transition-colors group"
            >
              <RiExpandDiagonalLine size={19} />
            </button>
          </div>
        </div>
        {renderSlides()}
      </Swiper>

      {isModalOpen && !isMobile &&
        <div className="fixed inset-0 bg-gray-100 z-50">
          <Image
            src={LogoColorida}
            alt="Logo softexpert"
            width={140}
            loading="eager"
            height={100}
            className="absolute top-0 left-0 m-4"
          />
          <motion.div
            className="w-full h-full mx-auto grid place-content-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.13 } }}
            exit={{ opacity: 0, scale: 0.75, transition: { ease: "easeIn", duration: 0.13 } }}
          >
            <div className="w-full max-w-xl md:max-w-3xl pt-10 lg:max-w-[1200px] 2xl:max-w-[1400px] flex justify-center items-center overflow-hidden gap-y-7 relative p-4">
              <div className="group">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="absolute top-0 right-1 rounded-full text-gray-700 p-2 grid place-items-center z-10 cursor-pointer transition-colors hover:bg-slate-200"
                >
                  <RiCloseLine size={25} />
                </button>
                <span className="absolute z-50 top-[41px] right-0 min-[600px]:right-0 bg-black text-white text-xs rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {traslates("closeExpand")}
                </span>
              </div>
              <Swiper
                initialSlide={currentSlide ?? 0}
                spaceBetween={80}
                centeredSlides={true}
                grabCursor={false}
                zoom={true}
                pagination={{ clickable: true, }}
                keyboard={{ enabled: true, }}
                hashNavigation={{ watchState: true, }}
                navigation={true}
                modules={[Pagination, Navigation, Keyboard, Zoom, HashNavigation]}
                className="slideArfact h-full"
              >
                {renderSlides()}
              </Swiper>
            </div>
          </motion.div>
        </div >
      }
    </>
  );
}

function ArtifactSlide({ artifact, isMobile, isLaptop }: { isMobile: boolean, isLaptop: boolean, artifact: Industry["attributes"]["sections_demo"][number]["artifacts"][number] }) {
  return (
    <div className="w-full mx-auto h-[80%] lg:h-full flex flex-col items-center justify-center">
      {isMobile &&
        <h2 className="text-xl 2xl:text-2xl tracking-tighter font-semibold mb-5 text-center">
          {artifact.title}
        </h2>
      }
      {Array.isArray(artifact.media?.data) &&
        artifact.media.data?.map((media, index) => {
          const url = media.attributes.url;
          const isMp4 = url.endsWith('.mp4');
          return (
            <div key={index} className="relative flex flex-col items-center">
              {isMp4 ? (
                <div className="rounded-lg w-full aspect-video border">
                  <VideoPlayer url={url} controls={true} />
                </div>
              ) : (
                <>
                  <Image
                    src={url}
                    alt={artifact.title}
                    width={800}
                    height={700}
                    className="rounded-lg w-full border"
                    unoptimized
                  />
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-black absolute"></div>
                </>
              )}
              {!isMobile &&
                <h2 title={artifact.title} className={`text-xl 2xl:text-[23px] tracking-tighter font-semibold mt-4 text-center`}>
                  {artifact.title}
                </h2>
              }
            </div>
          );
        })
      }

      {artifact.guideflow_id &&
        <>
          <div className="swiper-lazy-preloader swiper-lazy-preloader-black absolute"></div>
          <GuideFlow path={artifact.guideflow_id} />
          {!isMobile &&
            <h2 title={artifact.title} className={`text-xl 2xl:text-[23px] mb-8 tracking-tighter font-semibold mt-4 text-center`}>
              {artifact.title}
            </h2>
          }
        </>
      }
      {artifact.youtube_id &&
        <>
          <VideoPlayer url={`https://www.youtube.com/watch?v=${artifact.youtube_id}`} />
          {!isMobile &&
            <h2 title={artifact.title} className={`text-xl 2xl:text-[23px] mb-10 tracking-tighter font-semibold mt-4 text-center`}>
              {artifact.title}
            </h2>
          }
        </>
      }
    </div>
  );
}


// Componente para renderizar o slide de "Sucess cases"
function SuccessCasesSlide({ cases, tr }: { cases?: Case[]; tr: any }) {
  return (
    <div className="">
      <h2 className="text-xl lg:text-2xl 2xl:text-3xl tracking-tighter font-semibold text-center mb-4 lg:mb-0">
        {tr("success-cases")}
      </h2>
      <div className="lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 max-w-7xl mx-auto">
        {cases?.slice(0, 3).map((item, index) => (
          <CaseCard key={item.id} item={item} index={index} />
        ))}
      </div>
      <div className="hidden lg:block w-full py-[80px] rounded-lg -mt-12">
        <ul className="w-full mx-auto flex justify-between flex-col gap-8 lg:flex-row">
          <li className="flex flex-col flex-1 justify-center items-center">
            <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
              +3.000.000
            </p>
            <span className="text-coreBlue500 mt-2">{tr("users")}</span>
          </li>
          <li className="flex flex-col flex-1 justify-center items-center">
            <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
              +300
            </p>
            <span className="text-coreBlue500 mt-2">{tr("partners")}</span>
          </li>
          <li className="flex flex-col flex-1 justify-center items-center">
            <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
              +50
            </p>
            <span className="text-coreBlue500 mt-2">{tr("countries")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}


// Componente para renderizar o slide de "Book a Demo"
function BookDemoSlide({ t, isMobile }: { isMobile: boolean, t: any }) {
  return (
    <div className="w-full mx-auto flex flex-col md:flex-col justify-between items-center pb-20 ">
      <div className="w-full md:w-1/2 grid gap-2">
        <h2 className="bg-clip-text text-transparent bg-gradient-03 font-semibold text-2xl lg:text-3xl 2xl:text-4xl">
          {t("title_slide_book_demo")}
          <span className="text-white bg-transparent">&#128512;</span>
        </h2>
        <p className="text-sm lg:text-base text-neutral-700">
          {t("desc_slide_book_demo")}
        </p>
      </div>
      <div className="hidden sm:block w-full md:w-1/2">
        <BookDemoForm />
      </div>
      <div className="block sm:hidden w-full md:w-1/2">
        <ModalBookDemo />
      </div>
    </div>
  );
}
