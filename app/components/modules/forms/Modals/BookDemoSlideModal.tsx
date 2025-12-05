"use client";

import BookDemoForm from "@/app/components/modules/forms/BookDemoForm";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RiCloseLine, RiArrowRightLine } from "@remixicon/react";

export default function ModalBookDemo() {
    const [isForm, setIsForm] = useState(false);

    const toggleShowForm = () => {
        setIsForm(!isForm);
    };

    const closeModalOnClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            setIsForm(false);
        }
    };

    const t = useTranslations("Sidebar");
    const tr = useTranslations("FormBookDemo");

    return (
        <>
            {!isForm && (
                <button
                    onClick={toggleShowForm}
                    type="button"
                    className=" mt-5 w-full rounded-lg flex gap-x-1 plus-jakarta-sans px-4 cursor-pointer py-[10px] bg-coreBlue500 hover:bg-coreBlue700 text-white text-xs 2xl:text-sm font-medium transition-colors flex items-center justify-center disabled:opacity-60"
                >
                    {tr("connectExpert")}{" "}
                </button>
            )}

            {isForm && (
                <div
                    onClick={closeModalOnClickOutside}
                    className="w-full h-full z-50 left-0 top-0 flex justify-center items-center"
                >
                    <motion.div
                        className="bg-white rounded-lg w-full max-w-[540px] relative"
                        initial={{ y: 70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <div className="w-full flex justify-end items-center">
                            <button
                                onClick={toggleShowForm}
                                type="button"
                                className="p-1 rounded-full flex items-center transition-colors hover:bg-slate-100 cursor-pointer"
                            >
                                <RiCloseLine size={22} />
                            </button>
                        </div>


                        <BookDemoForm />
                    </motion.div>
                </div>
            )}
        </>
    );
}
