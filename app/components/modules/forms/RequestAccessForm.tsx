'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiCloseLine } from "@remixicon/react";
import BookDemoForm from "@/app/components/modules/forms/BookDemoForm";
import FormAccess from "@/app/components/modules/forms/AccessForm";
import { useTranslations } from "next-intl";

export default function ModalAccess() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleAccess, setIsVisibleAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleShowModal = () => {
        setIsVisible(!isVisible);
        if (!isVisible) setIsVisibleAccess(false);
    };

    const toggleShowAccess = () => {
        setIsVisibleAccess(!isVisibleAccess);
        if (!isVisibleAccess) setIsVisible(false);
    };

    const closeModalOnClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false);
        }
    };

    const closeAccessOnClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            setIsVisibleAccess(false);
        }
    };

    const t = useTranslations('otherTranslations');

    return (
        <div className="flex">
            <button
                onClick={toggleShowModal}
                disabled={isLoading}
                type="button"
                className={`rounded-lg flex gap-x-1 plus-jakarta-sans px-4 cursor-pointer py-[10px] bg-coreBlue500 hover:bg-coreBlue700 text-white text-xs 2xl:text-sm font-medium transition-colors flex items-center justify-center disabled:opacity-60`}>
                {t('fullDemo')}
            </button>

            {isVisible && (
                <div
                    onClick={closeModalOnClickOutside} // Fechar ao clicar fora do formulário
                    className="bg-linear-to-b from-black/48 to-black/73 backdrop-blur-xs fixed w-full h-screen z-50 left-0 top-0 flex justify-center items-center"
                >
                    <motion.div
                        className="bg-white rounded-lg w-full max-w-[540px] p-6 m-4 relative max-h-[98vh] overflow-y-scroll"
                        initial={{ y: 70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <div className="w-full flex justify-between items-center ">
                            <h2 className="tracking-tighter font-semibold text-xl 2xl:text-2xl">
                                {t('fullDemo')}
                            </h2>
                            <button onClick={toggleShowModal} type="button" className="p-1 rounded-full transition-colors hover:bg-slate-100 cursor-pointer">
                                <RiCloseLine size={22} />
                            </button>
                        </div>
                        {/* <div className="w-full h-[1px] bg-black/20 mt-4 absolute left-0"></div> */}
                        <div>
                            <p className="text-neutral-600 text-sm mt-0 font-medium mt-2">
                               {t('forCollaborators')} - <button onClick={toggleShowAccess} className="text-coreBlue500 cursor-pointer font-semibold hover:underline">{t('clickHere')}</button>
                            </p>
                        </div>
                        <p className="text-neutral-600 font-medium text-sm mt-2">
                            {t('descriptionAccessFullDemo')}
                        </p>

                        <BookDemoForm />
                    </motion.div>
                </div>
            )}

            {isVisibleAccess && (
                <div
                    onClick={closeAccessOnClickOutside}
                    className="bg-linear-to-b from-black/48 to-black/73 backdrop-blur-xs fixed w-full h-screen z-50 left-0 top-0 flex justify-center items-center"
                >
                    <motion.div
                        className="bg-white rounded-lg w-full max-w-[540px] p-6 m-4 relative"
                        initial={{ y: 70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <div className="w-full flex justify-between items-center">
                            <h2 className="tracking-tighter font-semibold text-xl 2xl:text-2xl">
                                {t('accessFullDemo')}
                            </h2>
                            <button onClick={toggleShowAccess} type="button" className="p-1 rounded-full transition-colors hover:bg-slate-100 cursor-pointer">
                                <RiCloseLine size={22} />
                            </button>
                        </div>
                        <FormAccess />
                    </motion.div>
                </div>
            )}
        </div>
    );
}