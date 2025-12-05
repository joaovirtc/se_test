'use client';

import { useState, useRef, useEffect, useMemo } from "react";
import { RiSearchLine, RiCloseLine } from "@remixicon/react";
import { getCookie } from "cookies-next";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import useIsMobile from "@/app/utils/useIsMobile";
import Image from "next/image";
import { Solution } from "@/app/types/solution";
import { Industry } from "@/app/types/industry";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ResultsBlocks from "./results-blocks";
import SearchResultBlockSkeleton from "../feedback/skeletons/searchbar-result-block";
import SearchIcon from "@/public/search.svg"
import Loader from "../feedback/loader-new";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const t = useTranslations("otherTranslations");
  const [results, setResults] = useState<{ products: Solution[]; industries: Industry[] }>({
    products: [],
    industries: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionLoading, setIsTransitionLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const appVersion = getCookie(COOKIE_KEYS.VERSION);
  const isDemoLight = appVersion === "true";
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    
    // Se clicou em qualquer elemento do Swiper, fecha o dropdown
    if (target.closest('.swiper') || target.closest('.swiper-slide')) {
      setIsOpen(false);
      return;
    }

    const isClickInsideDropdown = dropdownRef.current?.contains(target);
    const isClickInsideInput = inputRef.current?.contains(target);

    if (!isClickInsideDropdown && !isClickInsideInput) {
      setIsOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside, true);
  
  return () => {
    document.removeEventListener("click", handleClickOutside, true);
  };
}, []);

  const handleDropdownMouseDown = (e: React.MouseEvent) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const searchResults = async (query: string) => {
    try {
      const response = await fetch(`/api/search/strapi?s=${encodeURIComponent(query)}&locale=${locale}`);
      const data = await response.json();

      if (response.ok) {
          setResults({
            products: data.products?.data || [],
            industries: data.industries?.data || [],
          });
          setHasSearched(true);
      } else {
        console.error("Erro na API:", data.error);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (query: string) => {
    setQuery(query);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setResults({ products: [], industries: [] });
      setHasSearched(false);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);
    debounceRef.current = setTimeout(() => searchResults(trimmedQuery), 250);
  };

  const handleInputFocus = () => {
    // Delay de 300ms para mostrar o dropdown apenas se tiver conteúdo
    setTimeout(() => {
      if (hasQuery) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 250);
  };

  const handleSearch = () => {
    if (hasQuery) {
      inputRef.current?.blur();
      router.push(`/${locale}/search?s=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hasQuery) {
      handleSearch();
      setIsTransitionLoading(true);
    }
    setTimeout(() => {
      setIsTransitionLoading(false)
    },6000)

  };

  const processedResults = useMemo(() => {
    const searchTerm = query.toLowerCase().trim();

    const artifacts = [
      ...results.products.flatMap((p) =>
        (p.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isDemoLight)
          .flatMap((s) =>
            (s.artifacts || [])
              .filter((a) => 
                a.title.toLowerCase().includes(searchTerm))
              .map((a) => ({
                ...a,
                sectionSlug: s.slug,
                parentTitle: p.attributes.title,
                parentSlug: p.attributes.slug,
                parentType: "our-products" as const,
              }))
          )
      ),
      ...results.industries.flatMap((i) =>
        (i.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isDemoLight)
          .flatMap((s) =>
            (s.artifacts || [])
              .filter((a) => 
                a.title.toLowerCase().includes(searchTerm))
              .map((a) => ({
                ...a,
                sectionSlug: s.slug,
                parentTitle: i.attributes.title,
                parentSlug: i.attributes.slug,
                parentType: "industries" as const,
              }))
          )
      ),
    ].slice(0, 3);

    const sections = isDemoLight ? [] : [
      ...results.products.flatMap((p) =>
        (p.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isDemoLight)
          .filter((s) => 
            s.title.toLowerCase().includes(searchTerm))
          .map((s) => ({
            ...s,
            parentTitle: p.attributes.title,
            parentSlug: p.attributes.slug,
            parentType: "our-products" as const,
          }))
      ),
      ...results.industries.flatMap((i) =>
        (i.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isDemoLight)
          .filter((s) => 
            s.title.toLowerCase().includes(searchTerm))
          .map((s) => ({
            ...s,
            parentTitle: i.attributes.title,
            parentSlug: i.attributes.slug,
            parentType: "industries" as const,
          }))
      ),
    ].slice(0, 3);

    const products = results.products
      .filter((p) => 
        p.attributes.title.toLowerCase().includes(searchTerm) ||
        p.attributes.banner_desc.toLowerCase().includes(searchTerm) ||
        p.attributes.subtitle.toLowerCase().includes(searchTerm))
      .slice(0, 3);

    const industries = results.industries
      .filter((i) => 
        i.attributes.title.toLowerCase().includes(searchTerm) || 
        i.attributes.banner_desc.toLowerCase().includes(searchTerm))
      .slice(0, 3);

    return { 
      artifacts, 
      sections, 
      products, 
      industries 
    };
  }, [results, isDemoLight, query]);

  const shouldShowDropdown = hasQuery && isOpen;

  return (
    <div className="relative">
      {isMobile ? (
        <>
          {!isMobileSearchActive ? (
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchActive(true);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className="bg-coreBlue500 rounded-lg text-white h-full w-10 grid place-items-center cursor-pointer"
            >
              <Image src={SearchIcon} alt="Search" className="invert" width={18} height={18} />
            </button>
          ) : (
            <div className="fixed z-50 top-0 left-0 w-full h-fit bg-white flex flex-col shadow-md animate-slide-in">
              <div className="flex items-center gap-2 p-3 border-b border-gray-200 flex-shrink-0">
                <div className="flex-1 flex items-center border rounded-lg bg-gray-50">
                  <input
                    type="search"
                    ref={inputRef}
                    value={query}
                    placeholder={t("search_placeholder")}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full h-10 px-3 focus:outline-none bg-transparent text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!hasQuery}
                  className="bg-coreBlue500 rounded-lg text-white h-10 px-3 cursor-pointer grid place-items-center disabled:opacity-50"
                >
                  <Image src={SearchIcon} alt="Search" className="invert" width={18} height={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSearchActive(false);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={`relative flex items-center border rounded-lg h-full transition-all duration-200 bg-white overflow-hidden focus-within:w-72 ${hasQuery && "w-72"} focus-within:border-coreBlue500 border-gray-300 w-50`}>
            <input
              type="search"
              ref={inputRef}
              value={query}
              placeholder={t("search_placeholder")}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={handleInputFocus}
              className="w-full mr-10 h-full focus:outline-none text-sm rounded-lg pl-2 font-medium placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-[3px] bg-coreBlue500 rounded-md text-white h-5/6 w-8 grid place-items-center cursor-pointer"
            >
              {isTransitionLoading ? <Loader/> 
                : <Image src={SearchIcon} alt="Search" className="invert" width={18} height={18} />
              }
            </button>
          </div>

          {shouldShowDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute w-72 left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 flex flex-col p-2"
              onMouseDown={handleDropdownMouseDown}
            >
              <div className="border-b border-neutral-300 pb-2">
                <button
                  onClick={handleSearch}
                  className="w-full h-full cursor-pointer overflow-x-hidden rounded-md flex flex-wrap mx-auto items-center justify-center p-2 text-sm font-medium transition-colors hover:bg-neutral-200"
                >
                  <span className="text-coreBlue500">{t("view_all_results_for")}</span> <b>"{query}"</b>
                </button>
              </div>

              {isLoading ? (
                <SearchResultBlockSkeleton count={3}/>
              ) : (
                <div 
                  className="flex-1 overflow-auto py-3 px-1 space-y-3"
                  onMouseDown={handleDropdownMouseDown}
                >
                  <ResultsBlocks 
                    locale={locale} 
                    query={query} 
                    results={processedResults}
                    onItemClick={() => setIsOpen(false)}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}