export const dynamic = 'force-dynamic';


import LangSwitch from "@/app/components/modules/lang-switch";
import ButtonAccess from "@/app/components/modules/forms/RequestAccessForm"
import ChangeVersionDemo from "@/app/components/modules/change-version-app";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import SearchBar from "../../modules/search/searchbar";
import { cookies } from "next/headers";
import OfflineDemo from "@/app/components/modules/offline-demo";

export default async function Header() {

  const cookieStore = cookies();

  const isAuthenticated = (await cookieStore).get(COOKIE_KEYS.AUTH)?.value === 'true';

  if (isAuthenticated === null) return null; // evita piscar enquanto carrega

  return (
    <header className="w-full flex">
      <nav className="flex justify-end w-full gap-1 sm:gap-2 lg:gap-3 flex-wrap pt-3 pr-3">
        <SearchBar />
        {!isAuthenticated && <ButtonAccess />}
        <ChangeVersionDemo />
        <OfflineDemo />
        <LangSwitch />
      </nav>
    </header>
  );
}
