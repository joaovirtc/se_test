import { getLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import SearchResultBlockSkeleton from "@/app/components/modules/feedback/skeletons/search-result-block";
import { Solution } from "@/app/types/solution";
import { Industry } from "@/app/types/industry";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import SectionsResult from "./(components)/sections-results";
import ResultBlock from "./(components)/result-block";
import type { Metadata } from 'next';


// export async function generateMetadata(): Promise<Metadata> {
//   const t = await getTranslations('otherTranslations');

//   return {
//     title: ` SoftExpert Demo | ${t('search_placeholder')}`,
//     openGraph: {
//       title: `SoftExpert Demo | ${t('search_placeholder')}`,
//       images: [
//         {
//           url: "https://demo-softexpert.s3.us-east-1.amazonaws.com/public/open-graph.png",
//           alt: 'open-graph-image',
//         },
//       ],
//     },
//   };
// }


export default async function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const locale = await getLocale();
  const t = await getTranslations("otherTranslations");
  const param = searchParams;
  const searchTerm = param.s || "";
  const cookieStore = await cookies();
  const appVersion = cookieStore.get(COOKIE_KEYS.VERSION)?.value
  const API_URL = process.env.STRAPI_API ?? process.env.NEXT_PUBLIC_STRAPI_API;
  const APP_URL = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;

  const removeHtmlTags = (htmlString: string): string => {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  };

  if (!searchTerm.trim()) {
    return (
      <div className="p-6">
        <p className="text-2xl font-normal">{t("search_placeholder_info")}</p>
      </div>
    );
  }

  // Função para criar dinamicamente a query para múltiplos termos e campos
  const buildQuery = (searchquery: string, fields: string[]): string => {
    const searchTerms = searchquery.split(' ');
    return searchTerms.map((term, index) =>
      fields.map((field, fieldIndex) => `filters[$and][${index}][$or][${fieldIndex}][${field}][$containsi]=${term}`)
    ).flat().join('&');
  };

  const FetchProducts = async (locale: string, searchquery: string): Promise<Solution[]> => {
    const query = buildQuery(searchquery, ['title', 'subtitle', 'banner_desc']);
    const res = await fetch(`${API_URL}/produtos?locale=${locale}&pagination[page]=1&pagination[pageSize]=100&${query}`,
      { next: { revalidate: 1200 } }
    );
    const data = await res.json();
    return data.data;
  };

  const FetchIndustries = async (locale: string, searchquery: string): Promise<Industry[]> => {
    const query = buildQuery(searchquery, ['title', 'banner_desc', 'menu_description']);
    const res = await fetch(`${API_URL}/industries?locale=${locale}&pagination[page]=1&pagination[pageSize]=100&${query}`,
      { next: { revalidate: 1200 } }
    );
    const data = await res.json();
    return data.data;
  };

  const FetchSectionWithArtifacts = async (locale: string, search_term: string) => {
    const res = await fetch(`${APP_URL}/api/search/strapi?s=${encodeURIComponent(search_term)}&locale=${locale}`);
    const data = await res.json();
    return data
  }

  const products = await FetchProducts(locale, searchTerm);
  const industries = await FetchIndustries(locale, searchTerm);
  const sectionWithArtifacts = await FetchSectionWithArtifacts(locale, searchTerm);


  const safeSectionData = sectionWithArtifacts || {};
  const artifactsCount = Array.isArray(safeSectionData.artifacts) ? safeSectionData.artifacts.length : 0;
  const sectionsCount = Array.isArray(safeSectionData.sections) ? safeSectionData.sections.length : 0;

  const hasNoResult =
    products.length === 0 &&
    industries.length === 0 &&
    artifactsCount === 0 &&
    sectionsCount === 0;

  return (
    <div className="w-full max-w-6xl mx-auto my-10">
      <div className="pb-4">
        <h1 className="text-xl">
          {hasNoResult ?
            <>
              {t("no_results_for")} <b>{searchTerm}</b>
            </>
            :
            <>
              {t("results_for")} <b>{searchTerm}</b>
            </>
          }
        </h1>
      </div>
      {products && products.length > 0 && (
        <>
          <p className="block text-black font-semibold mt-4 mb-2 p-4 rounded-lg bg-gray-200">
            {t("products")}
          </p>
          {products.map((product, index) => (
            <ResultBlock
              key={index}
              title={product.attributes.title}
              url={`/${locale}/our-products/${product.attributes.slug}`}
              parentTitle={product.attributes.subtitle}
            />
          ))}
        </>
      )}

      <SectionsResult
        locale={locale}
        results={sectionWithArtifacts}
        searchTerm={searchTerm}
        appVersion={appVersion}
      />

      {industries && industries.length > 0 && (
        <>
          <p className="block text-black font-semibold mt-4 mb-2 p-4 rounded-lg bg-gray-200">
            {t("industries")}
          </p>
          {industries.map((industry, index) => (
            <ResultBlock
              key={index}
              title={industry.attributes.title}
              url={`/${locale}/industries/${industry.attributes.slug}`}
              parentTitle={removeHtmlTags(industry.attributes.menu_description)}
            />
          ))}
        </>
      )}
    </div>
  );
}
