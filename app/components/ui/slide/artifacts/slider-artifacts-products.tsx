"use client";
import Image from "next/image";
import VideoPlayer from "./video";
import LogoColorida from "@/public/logo-colorida.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, Zoom, HashNavigation } from "swiper/modules";
import GuideFlow from "./guide-flow";
import BookDemoForm from "@/app/components/modules/forms/BookDemoForm";
import ModalBookDemo from "@/app/components/modules/forms/Modals/BookDemoSlideModal";
import { SectionsDemo } from "@/app/types/sections_demo";
import { Case } from "@/app/types/case";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useIsMobile from "@/app/utils/useIsMobile";
import { useCookie } from "@/app/utils/get-cookie/client";
import { RiCloseLine, RiExpandDiagonalLine } from "@remixicon/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import CaseCard from "@/app/components/system/cards/card-case";

interface Props {
  artifacts: SectionsDemo["artifacts"];
  cases?: Case[];
}



export default function SlideComponent({ artifacts, cases }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  const t = useTranslations("otherTranslations");
  const tr = useTranslations("FormBookDemo");
  const cases_t = useTranslations("AboutPage")
  const isMobile = useIsMobile();

  const cookieDemoValue = useCookie(`${COOKIE_KEYS.VERSION}`);
  const isDemoLight = cookieDemoValue === "true"

  const toggleModalArtifacts = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleExpandClick = () => {
    toggleModalArtifacts();
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleCloseModal = () => {
    toggleModalArtifacts();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isModalOpen) {
          setIsModalOpen(false);
        }
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isModalOpen]);


  return (
    <>
      <Swiper
        spaceBetween={80}
        centeredSlides
        grabCursor={false}
        zoom
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        hashNavigation={{ watchState: true }}
        navigation
        modules={[Pagination, Navigation, Keyboard, Zoom, HashNavigation]}
        className="slideArfact h-full"
      >
        <div className="relative">
          <div title={t("expand")} className="absolute bottom-6 left-0 2xl:-left-2 flex flex-col items-end z-10">
            <button
              onClick={handleExpandClick}
              type="button"
              className="hidden lg:grid outline-none rounded-full text-gray-700 p-2 place-items-center cursor-pointer transition-colors group"
            >
              <RiExpandDiagonalLine size={19} />
            </button>
          </div>
        </div>
        {artifacts.map((artifact, i) => (
          <SwiperSlide key={i} data-hash={`${artifact.id}`}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full lg:w-[91%] 2xl:w-full mx-auto rounded-lg overflow-hidden grid place-items-center mb-8 lg:mb-4">
                {isMobile && (
                  <h2 className="text-xl 2xl:text-2xl tracking-tighter font-semibold mb-4 text-center">
                    {artifact.title}
                  </h2>
                )}
                {Array.isArray(artifact.media?.data) &&
                  artifact.media.data?.map((media, index) => {
                    const url = media.attributes.url;
                    const isMp4 = url.endsWith('.mp4');
                    return (
                      <div key={index} className="">
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
                          </>
                        )}
                      </div>
                    );
                  })
                }
                {artifact.guideflow_id && <GuideFlow path={artifact.guideflow_id} />}

                {artifact.youtube_id && <VideoPlayer url={`https://www.youtube.com/watch?v=${artifact.youtube_id}`} />}
                <div className="swiper-lazy-preloader swiper-lazy-preloader-black absolute"></div>
              </div>
              {!isMobile && (
                <h2 className="text-xl 2xl:text-[23px] tracking-tighter font-semibold lg:mb-8 2xl:mb-10 text-center">
                  {artifact.title}
                </h2>
              )}
            </div>
          </SwiperSlide>
        ))}
        {isDemoLight && (
          <SwiperSlide className="">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl tracking-tighter font-semibold text-center mb-4 lg:mb-0">
              {cases_t("success-cases")}
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
                  <span className="text-coreBlue500 mt-2">{cases_t("users")}</span>
                </li>
                <li className="flex flex-col flex-1 justify-center items-center">
                  <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
                    +300
                  </p>
                  <span className="text-coreBlue500 mt-2">{cases_t("partners")}</span>
                </li>
                <li className="flex flex-col flex-1 justify-center items-center">
                  <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
                    +50
                  </p>
                  <span className="text-coreBlue500 mt-2">{cases_t("countries")}</span>
                </li>
              </ul>
            </div>
          </SwiperSlide>
        )}
        {isDemoLight && (
          <SwiperSlide data-hash="book-a-demo">
            <div className="w-full mx-auto flex flex-col justify-between items-center pb-20">
              <div className="w-full md:w-1/2 grid gap-2">
                <h2 className="bg-clip-text text-transparent bg-gradient-03 font-semibold text-2xl lg:text-3xl 2xl:text-4xl">
                  {tr("title_slide_book_demo")}
                  <span className="text-white bg-transparent">&#128512;</span>
                </h2>
                <p className="text-sm lg:text-base text-neutral-700">
                  {tr("desc_slide_book_demo")}
                </p>
              </div>
              <div className="hidden sm:block w-full md:w-1/2">
                <BookDemoForm />
              </div>
              <div className="block sm:hidden w-full md:w-1/2">
                <ModalBookDemo />
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {isModalOpen && (
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
                  {t("closeExpand")}
                </span>
              </div>
              <Swiper
                initialSlide={currentSlide ?? 0}
                spaceBetween={80}
                centeredSlides
                grabCursor={false}
                zoom
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                hashNavigation={{ watchState: true }}
                navigation
                modules={[Pagination, Navigation, Keyboard, Zoom, HashNavigation]}
                className="slideArfact"
              >
                {artifacts.map((artifact, i) => (
                  <SwiperSlide key={i} data-hash={`${i}`}>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-full lg:w-[91%] 2xl:w-full mx-auto rounded-lg overflow-hidden grid place-items-center mb-2">
                        {isMobile && (
                          <h2 className="text-xl 2xl:text-2xl tracking-tighter font-semibold mb-4 text-center">
                            {artifact.title}
                          </h2>
                        )}

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
                              </div>
                            );
                          })
                        }
                        {artifact.guideflow_id && <GuideFlow path={artifact.guideflow_id} />}

                        {artifact.youtube_id && <VideoPlayer url={`https://www.youtube.com/watch?v=${artifact.youtube_id}`} />}
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-black absolute"></div>
                        {!isMobile && (
                          <h2 className="text-xl 2xl:text-[23px] tracking-tighter font-semibold lg:mb-6 2xl:mb-10 text-center mt-5">
                            {artifact.title}
                          </h2>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {isDemoLight && (
                  <SwiperSlide className="">
                    <h2 className="text-xl lg:text-2xl 2xl:text-3xl tracking-tighter font-semibold text-center mb-4 lg:mb-0">
                      {cases_t("success-cases")}
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
                          <span className="text-coreBlue500 mt-2">{cases_t("users")}</span>
                        </li>
                        <li className="flex flex-col flex-1 justify-center items-center">
                          <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
                            +300
                          </p>
                          <span className="text-coreBlue500 mt-2">{cases_t("partners")}</span>
                        </li>
                        <li className="flex flex-col flex-1 justify-center items-center">
                          <p className="text-coreBlue500 text-[28px] min-3xl:text-[40px] font-[700] plus-jakarta-sans">
                            +50
                          </p>
                          <span className="text-coreBlue500 mt-2">{cases_t("countries")}</span>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                )}
                {isDemoLight && (
                  <SwiperSlide data-hash="book-a-demo">
                    <div className="w-full mx-auto flex flex-col justify-between items-center pb-20">
                      <div className="w-full md:w-1/2 grid gap-2">
                        <h2 className="bg-clip-text text-transparent bg-gradient-03 font-semibold text-2xl lg:text-3xl 2xl:text-4xl">
                          {tr("title_slide_book_demo")}
                          <span className="text-white bg-transparent">&#128512;</span>
                        </h2>
                        <p className="text-sm lg:text-base text-neutral-700">
                          {tr("desc_slide_book_demo")}
                        </p>
                      </div>
                      <div className="hidden sm:block w-full md:w-1/2">
                        <BookDemoForm />
                      </div>
                      <div className="block sm:hidden w-full md:w-1/2">
                        <ModalBookDemo />
                      </div>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </motion.div >
        </div >
      )
      }
    </>
  )

}