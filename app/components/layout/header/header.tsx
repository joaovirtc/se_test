import { getCookie } from "cookies-next";
import LangSwitch from "@/app/components/modules/lang-switch";
import ButtonAccess from "@/app/components/modules/forms/RequestAccessForm"
import ChangeVersionDemo from "@/app/components/modules/change-version-app";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import SearchBar from "../../modules/search/searchbar";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export default async function Header() {
  const locale = getLocale();
  const cookieStore = cookies();

  const isAuthenticated = (await cookieStore).get(COOKIE_KEYS.AUTH)?.value === 'true';
  const appVersion = (await cookieStore).get(COOKIE_KEYS.VERSION)?.value;

  if (isAuthenticated === null) return null; // evita piscar enquanto carrega

  return (
    <header className="w-full flex">
      <nav className="flex justify-end w-full gap-1 sm:gap-2 lg:gap-3 flex-wrap pt-3 pr-3">
        <SearchBar />
        {!isAuthenticated && <ButtonAccess />}
        <ChangeVersionDemo />
        <LangSwitch />
      </nav>
    </header>
  );
}
