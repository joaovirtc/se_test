"use client";

import { useState, useEffect } from "react";
import { RiLoopRightLine, RiCheckboxCircleLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import { setVersionApp } from "@/app/server-actions/change-version-app";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { COOKIE_KEYS } from "@/app/constants/cookies";

let toastId = 0;

const ChangeVersionDemo = () => {
  const [authCookie, setAuthCookie] = useState<boolean | null>(null);
  const [isVersionLight, setIsVersionLight] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const router = useRouter();
  const t = useTranslations("otherTranslations");

  // ⭐ Mover leitura dos cookies para o client para evitar hydration mismatch
  useEffect(() => {
    const auth = getCookie(COOKIE_KEYS.AUTH) === "true";
    const version = getCookie(COOKIE_KEYS.VERSION) === "true";

    setAuthCookie(auth);
    setIsVersionLight(version);
  }, []);

  const toggleSwitch = async () => {
    setLoading(true);

    const newValue = !isVersionLight;
    const success = await setVersionApp(newValue);

    if (success) {
      setIsVersionLight(newValue);

      const message = newValue
        ? t("you_are_light_demo")
        : t("you_are_full_demo");

      const id = toastId++;
      setToasts((prev) => [...prev, { id, message }]);

      setTimeout(
        () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
        3000
      );
    }

    setLoading(false);
  };

  // Antes a variável era lida via SSR → causava mismatch
  if (authCookie === null) return null; // Só mostra após o cookie carregar no client

  if (!authCookie) return null;

  return (
    <>
      <button
        onClick={toggleSwitch}
        disabled={loading}
        className="rounded-lg h-full flex gap-x-1 plus-jakarta-sans px-4 cursor-pointer py-[11px] bg-coreBlue500 hover:bg-coreBlue700 text-white text-xs 2xl:text-sm font-medium transition-colors flex items-center justify-center disabled:opacity-60"
      >
        <RiLoopRightLine
          size={17}
          className={`transition-transform ${
            loading ? "animate-spin" : ""
          }`}
        />
        <span>{isVersionLight ? "Full Demo" : "Light Demo"}</span>
      </button>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 items-end">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-x-2 min-w-[300px] bg-emerald-500 text-white p-4 rounded-lg shadow-xl plus-jakarta-sans text-sm"
            >
              <RiCheckboxCircleLine size={20} />
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChangeVersionDemo;
