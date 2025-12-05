'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import { useState, useEffect, useRef } from 'react';
import { Industry } from '@/app/types/industry';
import { SectionsDemo } from '@/app/types/sections_demo';
import { useCookie } from '@/app/utils/get-cookie/client';
import useIsMobile from '@/app/utils/useIsMobile';
import { COOKIE_KEYS } from '@/app/constants/cookies';
import { Solution } from '@/app/types/solution';

interface Props {
    data: Industry | Solution;
    sections: SectionsDemo[];
    defaultActive?: boolean;
    isComingSoon?: boolean;
    route:string;
}

export const TabDropdown = ({ data, sections, defaultActive = false, isComingSoon = false, route }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const localizedLink = `/${locale}/${route}/${data.attributes.slug}`;
    const isActive = pathname.startsWith(localizedLink) || (pathname === `/${locale}/` && defaultActive);
    const CookieVersionDemoValue = useCookie(`${COOKIE_KEYS.VERSION}`) || 'true';
    const isMobile = useIsMobile();

    const [isDropdownOpen, setIsDropdownOpen] = useState(defaultActive || isActive);

    const sidebarContainerRef = useRef<HTMLUListElement | null>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const closeSidebar = () => {
        const sidebarToggle = document.getElementById("sidebar-toggle") as HTMLInputElement | null;
        if (sidebarToggle) {
            sidebarToggle.checked = false;
        }
    };

    useEffect(() => {
        setIsDropdownOpen(isActive);
    }, [pathname, localizedLink]);

    useEffect(() => {
        if (isActive && sidebarContainerRef.current) {
            setTimeout(() => {
                sidebarContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 200);
        }
    }, [isActive, isDropdownOpen]);

    const t = useTranslations('IndustriesPage');

    return (
        <nav ref={sidebarContainerRef} className="overflow-hidden">
            <div title={data.attributes.title} className="flex flex-col">
                <Link
                    href={isComingSoon ? "#" : localizedLink}
                    onClick={(e) => {
                        if (isMobile && CookieVersionDemoValue === 'true' && sections.length > 0) {
                            e.preventDefault();
                            router.push(`${localizedLink}/${sections[0].slug}`);
                            closeSidebar();
                        } else {
                            toggleDropdown();
                        }
                    }}
                    className={`md:pl-12 w-full flex justify-between text-xs md:text-sm px-4 py-[11px] font-medium items-center gap-2 rounded-lg transition-colors  
                            ${isComingSoon ? "opacity-40 cursor-not-allowed" 
                                : isActive ? "bg-coreBlue500 text-white hover:bg-coreBlue500" : "bg-[#f5f5f7] text-black hover:bg-gray-200"
                        }`}
                >
                    <div className="flex gap-1 overflow-hidden items-center">
                        <p className="plus-jakarta-sans">
                            {data.attributes.title}{isComingSoon &&<span className="text-xs text-black ml-2"> <br/>{t('coming_soon')}</span>}
                        </p>
                    </div>

                    {!isComingSoon && (
                        <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center"
                        >
                            <RiArrowDownSLine size={19} />
                        </motion.div>
                    )}
                </Link>

                {!isComingSoon && (
                    <AnimatePresence initial={false}>
                        {isDropdownOpen && (
                            <motion.ul
                                key="dropdown-list"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="ml-5 md:ml-12 pl-4 my-3 border-l-2 border-neutral-300 flex flex-col space-y-2 overflow-hidden"
                            >
                                {sections.map((section) => {
                                    const slug = `${localizedLink}/${section.slug}`;
                                    const isSectionActive = pathname === slug;

                                    return (
                                        <motion.li
                                            key={section.id}
                                            title={section.title}
                                            className="relative pl-1 flex items-center before:content-[''] before:absolute before:left-[-1.124rem] before:top-[5px] before:translate-y-[-50%] before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-neutral-300 before:rounded-bl-lg"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.1, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={slug}
                                                onClick={closeSidebar}
                                                className={`plus-jakarta-sans relative group text-xs md:text-sm text-black font-medium transition-all hover:text-coreBlue500 hover:font-semibold ${isSectionActive ? "text-coreBlue500 font-semibold" : ""
                                                    }`}
                                            >
                                                {section.title}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </nav>
    );
};
