"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import { RiDownloadCloud2Line } from "@remixicon/react";

const OfflineDemo = () => {
  const [authCookie, setAuthCookie] = useState<boolean | null>(null);
  const t = useTranslations("otherTranslations");
  const locale = useLocale()

  useEffect(() => {
    const auth = getCookie(COOKIE_KEYS.AUTH) === "true";
    setAuthCookie(auth);
  }, []);

  // Antes a variável era lida via SSR → causava mismatch
  if (authCookie === null) return null; // Só mostra após o cookie carregar no client

  if (!authCookie) return null;

  return (
    <a
      target="_blank"
      href={`/api/offline-demo?locale=${locale}&url=${encodeURIComponent(
        t("linkOfflineDemo")
      )}`}
      className="hidden lg:flex
                  rounded-lg h-full gap-x-1 plus-jakarta-sans
                  border hover:bg-coreBlue500 hover:text-white
                  px-4 cursor-pointer py-[11px] text-xs 2xl:text-sm
                  font-medium transition-colors flex items-center 
                  justify-center disabled:opacity-60"
    >
      <RiDownloadCloud2Line size={17} />
      <span>Offline Demo</span>
    </a>

  );
};

export default OfflineDemo;
