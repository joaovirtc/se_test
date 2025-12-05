'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Case, CaseCategory } from '@/app/types/case';
import CustomerList from './customers-list/list';
import CustomersFilter from './filters/filters';
import useIsMobile from '@/app/utils/useIsMobile';
import useIsLaptop from '@/app/utils/useIsLaptop';
import { RiArrowLeftSLine } from '@remixicon/react';
import Loader from "@/app/components/modules/feedback/loader"

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CustomerSection() {
  const locale = useLocale();
  const t = useTranslations('AboutPage');

  const [page, setPage] = useState(1);
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>([]);
  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();
  const pageSize = isMobile ? 15 : isLaptop ? 16 :  25;

  const { data: casesData, error: casesError, isLoading: casesLoading } = useSWR<{
    data: Case[];
  }>(
    `https://adm-site.softexpert.com/api/cases?populate=icon,subcategories,file,show_in_demo_only&locale=${locale}&pagination[pageSize]=1000&sort=rank:asc`,
    fetcher,
    {
      revalidateOnReconnect: true,
      dedupingInterval: 2592000000, // Cache por 1 mês (em milissegundos)
    }
  );

  const { data: categoriesData, isLoading: categoriesLoading } = useSWR<{
    data: CaseCategory[];
  }>(
    `https://adm-site.softexpert.com/api/cases-categories?populate[subcategories][sort][0]=name:asc&locale=${locale}`,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 31536000000,
    }
  );

  if (casesLoading || categoriesLoading) return <Loader />;
  if (casesError) return <div>Error: {casesError.message}</div>;

  const allCases = casesData?.data || [];

  const filteredCases = selectedSubcategories.length
    ? allCases.filter((customer) =>
      customer.attributes.subcategories.data.some((subcategory) =>
        selectedSubcategories.includes(subcategory.id)
      )
    )
    : allCases;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCases = filteredCases.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCases.length / pageSize);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleFilterChange = (newSelection: number[]) => {
    setSelectedSubcategories(newSelection);
    setPage(1);
  };

  // Filtrar subcategorias que possuem cases
  const categoriesWithCases = categoriesData?.data.map((category) => ({
    ...category,
    attributes: {
      ...category.attributes,
      subcategories: {
        data: category.attributes.subcategories.data.filter((subcategory) =>
          allCases.some((customer) =>
            customer.attributes.subcategories.data.some((caseSubcategory) => caseSubcategory.id === subcategory.id)
          )
        ),
      },
    },
  }));

  return (
    <div className='h-full flex flex-col pb-10'>
      
      <CustomersFilter
          categories={categoriesWithCases || []}
          selectedSubcategories={selectedSubcategories}
          onChange={handleFilterChange}
        />
      
        <CustomerList customers={paginatedCases} />
        {filteredCases.length > pageSize && (
          <div className="flex justify-center items-center gap-4 mt-5">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="p-1 bg-transparent cursor-pointer rounded-lg disabled:opacity-50 border hover:border-slate-600"
            >
              <RiArrowLeftSLine color='#000'/>
            </button>
            <span className='plus-jakarta-sans'>
              {page} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              className="p-1 bg-transparent cursor-pointer rounded-lg disabled:opacity-50 border hover:border-slate-600"
            >
              <RiArrowLeftSLine className='rotate-180' color='#000' />
            </button>
          </div>
        )}
    </div>
  );
}
