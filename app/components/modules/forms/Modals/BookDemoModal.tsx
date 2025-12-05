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
      <button
        onClick={toggleShowForm}
        type="button"
        className="plus-jakarta-sans group absolute bottom-0 left-0 w-full bg-coreBlue500 cursor-pointer flex items-center gap-3 justify-start py-5 text-white text-xs md:text-sm pl-12 transition-colors"
      >
        {tr("connectExpert")}{" "}
        <RiArrowRightLine
          size={20}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      {isForm && (
        <div
          onClick={closeModalOnClickOutside}
          className="bg-linear-to-b from-black/48 to-black/73 backdrop-blur-xs fixed w-screen h-screen z-50 left-0 top-0 flex justify-center items-center"
        >
          <motion.div
            className="bg-white rounded-lg w-full max-w-[540px] p-6 m-4 relative"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="w-full flex justify-between items-center">
              <h2 className="tracking-tighter font-semibold text-xl 2xl:text-2xl">
                {tr("connectExpert")}
              </h2>
              <button
                onClick={toggleShowForm}
                type="button"
                className="p-1 rounded-full transition-colors hover:bg-slate-100 cursor-pointer"
              >
                <RiCloseLine size={22} />
              </button>
            </div>
            <p className="text-neutral-600 font-medium text-sm mt-2">
              {tr("description")}
            </p>

            <BookDemoForm />
          </motion.div>
        </div>
      )}
    </>
  );
}
