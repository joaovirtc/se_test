'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from '@remixicon/react';
import useIsMobile from '@/app/utils/useIsMobile';
import Image from 'next/image';

interface TabSidebarProps {
  link: string;
  icon?: React.ReactNode;
  iconSvg?:string;
  label: string;
  defaultActive?: boolean;
  isDropdown?: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const listVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.03, // Reduzido para uma transição mais rápida entre os itens
      ease: [0.25, 0.8, 0.25, 1], // Curva de animação suave
      duration: 0.25, // Duração mais curta para uma experiência rápida
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      when: 'afterChildren',
      ease: [0.25, 0.8, 0.25, 1], // Curva de animação suave
      duration: 0.25, // Duração mais curta para fechamento
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -10 }, // Começa invisível e levemente deslocado para cima
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }, // Aparece suavemente
};

export function TabSidebar({
  link,
  icon,
  iconSvg,
  label,
  defaultActive = false,
  isDropdown = false,
  children,
  defaultOpen = false,
}: TabSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const localizedLink = `/${locale}${link}`;
  const isActive = pathname === localizedLink || (pathname === `/${locale}/` && defaultActive);
  const hasInitialized = useRef(false);
  const [open, setOpen] = useState(() => (isDropdown && defaultOpen && !isMobile) ? defaultOpen : false);

  // Ouve mudanças de dropdown em outras instâncias
  useEffect(() => {
    if (!isDropdown) return;

    const handleToggle = (openedLabel: string) => {
      if (openedLabel !== label) {
        setOpen(false);
      }
    };

    window.addEventListener('tab-dropdown-toggle', (e: any) => handleToggle(e.detail));
    return () => {
      window.removeEventListener('tab-dropdown-toggle', (e: any) => handleToggle(e.detail));
    };
  }, [label, isDropdown]);

  // Atualiza estado se navegar para uma rota relacionada
  useEffect(() => {
    if (!isDropdown) return;

    const isOnRelatedPage = pathname.startsWith(localizedLink);
    const isOnAllowDefaultOpen = pathname === `/${locale}/about`;

    let timeoutId: NodeJS.Timeout;

    if (!hasInitialized.current) {
      hasInitialized.current = true;

      if (isOnRelatedPage) {
        timeoutId = setTimeout(() => setOpen(true), 300);
      } else if (isOnAllowDefaultOpen) {
        timeoutId = setTimeout(() => setOpen(defaultOpen), 300);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(isOnRelatedPage);
    }

    return () => clearTimeout(timeoutId);
  }, [pathname, localizedLink, isDropdown, defaultOpen, locale]);

  const closeSidebar = () => {
    const sidebarToggle = document.getElementById("sidebar-toggle") as HTMLInputElement | null;
    if (sidebarToggle?.type === "checkbox") {
      sidebarToggle.checked = false;
    }
  };

  useEffect(() => {
    if (isMobile && pathname === `/${locale}/about`) {
      closeSidebar();
    }
  }, [pathname, locale, isMobile]);


  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isMobile) {
      // Permite navegação apenas para a rota "about"
      if (!localizedLink.includes('/about')) {
        event.preventDefault(); // Impede a navegação para outras rotas no mobile
      }
    }

    if (isDropdown) {
      const nextOpen = !open;
      setOpen(nextOpen);

      if (nextOpen) {
        window.dispatchEvent(new CustomEvent('tab-dropdown-toggle', { detail: label }));
      }
    }
  };

  return (
    <ul>
      <li>
        <Link
          href={localizedLink}
          onClick={handleClick}
          className={`w-full h-[40px] flex justify-between text-xs md:text-sm p-5 font-medium items-center gap-2 rounded-lg transition-colors plus-jakarta-sans
            ${isActive ? 'bg-coreBlue500 text-white hover:bg-coreBlue500' : 'bg-transparent text-black hover:bg-gray-200 '}`}
        >
          <div className="flex items-center gap-2 filter">
            {iconSvg ? (
              <div className={`${isActive ? '' : 'invert'}`}>
                <Image src={iconSvg} alt={`${label}-icon`} width={20} height={20} />
              </div>
            ) : (
              icon
            )}
            {label}
          </div>
          {isDropdown && (
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <RiArrowDownSLine size={19} />
            </motion.div>
          )}
        </Link>

        {isDropdown && (
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                key="dropdown-list"
                initial="closed"
                animate="open"
                exit="closed"
                variants={listVariants}
                className="pl-4 py-2 space-y-2 pr-2 mask-gradient-vertical"
              >
                {React.Children.map(children, (child, index) => (
                  <motion.li
                    key={index}
                    variants={childVariants} // Aplica as variantes aos itens
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="w-full"
                  >
                    {child}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </li>
    </ul>
  );
}
