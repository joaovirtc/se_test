import { getTranslations, getLocale } from "next-intl/server";
import LogoColorida from "@/public/logo-colorida.png";
import Image from "next/image";
import {
  RiInfinityLine,
  RiBuildingLine,
  RiGitForkLine,
  RiArrowRightLine,
  RiMenuLine,
  RiCloseLine,
} from "@remixicon/react";
import { TabSidebar } from "@/app/components/system/tabs/tab";
import Products from "./get-products";
import Industries from "./get-industries";
import ModalBookDemo from "@/app/components/modules/forms/Modals/BookDemoModal";
import Link from "next/link";

export default async function Sidebar() {
  const locale = await getLocale();
  const t = await getTranslations("Sidebar");

  return (
    <>
      <div className="relative w-[1px]">
        <input
          type="checkbox"
          id="sidebar-toggle"
          className="sidebar-toggle invisible"
        />
        <div className="relative-sidebar-toggle relative">
          <label
            htmlFor="sidebar-toggle"
            className="cursor-pointer fixed top-4 left-4 p-2 bg-white border rounded-lg text-zinc-950 z-50 block lg:hidden"
          >
            <div className="icon-container">
              <RiMenuLine size={21} className="menu-icon" />
              <RiCloseLine size={21} className="close-icon hidden" />
            </div>
          </label>
        </div>
        <label
          htmlFor="sidebar-toggle"
          className={` overlay-sidebar fixed inset-0 bg-linear-to-b from-black/58 to-black/73 backdrop-blur-xs bg-opacity-50 z-10 transition-opacity`}
        ></label>
        <div
          className={`sidebar h-screen top-0 fixed z-40 w-[290px] md:w-[350px] 2xl:w-[387px] h-full bg-[#f5f5f7] p-4 transition-transform transform `}
        >
          <div className="w-full grid place-items-center py-6">
            <Link href={`/`}>
              <Image
                src={LogoColorida}
                alt="logo-softexpert"
                width={164}
                className=""
              />
            </Link>
          </div>

          <div className="flex flex-col gap-1 height-calc-sidebar overflow-y-auto overflow-y-auto pr-2">
                <TabSidebar
                  link="/about"
                  icon={<RiBuildingLine size={20} />}
                  label={t("about")}
                />
                  <TabSidebar
                    link="/industries"
                    icon={<RiGitForkLine size={20} />}
                    label={t("industries")}
                    isDropdown
                  >
                      <Industries locale={locale} /> 
                  </TabSidebar>
                
                  <TabSidebar
                    link="/our-products"
                    iconSvg="https://assets.softexpert.com/Soft_Expert_Suite_branco_6fd43429a1.svg"
                    label={t("ourProducts")}
                    isDropdown
                    defaultOpen
                  >
                      <Products locale={locale} /> 
                  </TabSidebar>
                
          </div>

          <ModalBookDemo />
        </div>
      </div>
    </>
  );
}
