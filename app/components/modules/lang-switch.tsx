"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { RiGlobalLine, RiArrowDropDownLine } from "@remixicon/react";
import { motion } from "framer-motion";
import { useData } from "@/app/api/context/languageSelectorAPI";
import Link from "next/link";


export default function LangSwitch() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentRoute = pathname.split("/")[2] || "";
  const localeActive = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("HomePage");

  const options = [
    { value: "en", label: t("english") },
    { value: "pt-BR", label: t("portuguese") },
    { value: "es", label: t("spanish") },
    { value: "fr", label: t("french") },
    { value: "it", label: t("italian") },
    { value: "de", label: t("german") },
  ];


  const selectedOption = options.find((option) => option.value === localeActive);

  const { data } = useData();
  //console.log(JSON.stringify(data, null, 2)) 

  // Filtra os idiomas vindos da API para manter apenas os suportados
  const localizations = data?.attributes?.localizations?.data.filter((item: any) =>
    options.some((opt) => opt.value === item.attributes.locale)
  ) || [];

  const localeList = options.map((option) => {
    const apiItem = localizations.find((item:any) => item.attributes.locale === option.value);
    return apiItem
      ? { locale: apiItem.attributes.locale, slug: apiItem.attributes.slug, label: option.label }
      : { locale: option.value, slug: data?.attributes?.slug, label: option.label };
  });
  //console.log(localeList)


  const changeLocale = (nextLocale: string) => {
    const currentPath = window.location.pathname;
    const strippedPath = currentPath.replace(`/${localeActive}`, "");

    const newPath = `/${nextLocale}${strippedPath}`;
    
    setIsOpen(false);
    window.location.href = newPath; // navega e força o reload da página
  };


  return (
    <div className="relative inline-block text-left">
      <label className="rounded-lg border flex items-center cursor-pointer p-2 bg-white plus-jakarta-sans">
        <RiGlobalLine size={18} className="mr-0 sm:mr-2" color="#040713" />
        <button
          type="button"
          className="bg-transparent cursor-pointer outline-hidden flex items-center text-xs 2xl:text-sm font-medium"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
        >
          <span className="hidden sm:block">{selectedOption?.label}</span>
          <RiArrowDropDownLine size={24} className="ml-0 sm:ml-1" color="#C1C1C5" />
        </button>
      </label>

      {isOpen && (
        <motion.ul
          className="absolute right-0 mt-1 w-[140px] bg-white border rounded-lg shadow-lg shadow-blue-100 z-5"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {data ? (
            localeList.map((option) => (
              <a key={option.locale} href={`/${option.locale}/${currentRoute}/${option.slug}`}>
                <li
                  className={`plus-jakarta-sans z-10 p-3 cursor-pointer hover:bg-gray-100 border-b text-xs 2xl:text-sm ${
                    localeActive === option.locale ? "font-bold" : ""
                  }`}
                >
                  {option.label}
                </li>
              </a>
            ))
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                className={`plus-jakarta-sans z-10 p-3 cursor-pointer hover:bg-gray-100 border-b text-xs 2xl:text-sm ${
                  localeActive === option.value ? "font-bold" : ""
                }`}
                onClick={() => changeLocale(option.value)}
              >
                {option.label}
              </li>
            ))
          )}
        </motion.ul>
      )}
    </div>
  );
}
