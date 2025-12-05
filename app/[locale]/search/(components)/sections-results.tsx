"use client"

import { useMemo, useState, useEffect } from "react";
import { Industry } from "@/app/types/industry"
import { Solution } from "@/app/types/solution"
import { SectionsDemo } from "@/app/types/sections_demo"
import { Artifact } from "@/app/types/artifact"
import { getCookie } from "cookies-next"
import { COOKIE_KEYS } from "@/app/constants/cookies"
import ResultBlock from "./result-block"
import { useTranslations } from "next-intl"

interface Props {
  locale: string;
  searchTerm: string;
  appVersion:any
  results: {
    products: {
      data: Solution[];
    };
    industries: {
      data: Industry[];
    };
    sections: SectionsDemo[];
    artifacts: Artifact[];
  };
}

export default function Result({ locale, searchTerm, results, appVersion }: Props) {
  const isVersionLight = appVersion === "true";
  const searchTermNormalize = searchTerm.toLowerCase().trim();
  const t = useTranslations("otherTranslations");

  const processedResults = useMemo(() => {
    const artifacts = [
      ...results.products.data.flatMap((p) =>
        (p.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isVersionLight)
          .flatMap((s) =>
            (s.artifacts || [])
              .filter((a) => 
                a.title.toLowerCase().includes(searchTermNormalize))
              .map((a) => ({
                ...a,
                sectionSlug: s.slug,
                parentTitle: p.attributes.title,
                parentSlug: p.attributes.slug,
                parentType: "our-products" as const,
              }))
          )
      ),
      ...results.industries.data.flatMap((i) =>
        (i.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isVersionLight)
          .flatMap((s) =>
            (s.artifacts || [])
              .filter((a) => 
                a.title.toLowerCase().includes(searchTermNormalize))
              .map((a) => ({
                ...a,
                sectionSlug: s.slug,
                parentTitle: i.attributes.title,
                parentSlug: i.attributes.slug,
                parentType: "industries" as const,
              }))
          )
      ),
    ].slice(0, 10);

    const sections = isVersionLight ? [] : [
      ...results.products.data.flatMap((p) =>
        (p.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isVersionLight)
          .filter((s) => 
            s.title.toLowerCase().includes(searchTermNormalize))
          .map((s) => ({
            ...s,
            parentTitle: p.attributes.title,
            parentSlug: p.attributes.slug,
            parentType: "our-products" as const,
          }))
      ),
      ...results.industries.data.flatMap((i) =>
        (i.attributes.sections_demo || [])
          .filter((s) => s.show_in_demo_light === isVersionLight)
          .filter((s) => 
            s.title.toLowerCase().includes(searchTermNormalize))
          .map((s) => ({
            ...s,
            parentTitle: i.attributes.title,
            parentSlug: i.attributes.slug,
            parentType: "industries" as const,
          }))
      ),
    ].slice(0, 10);

    const products = results.products.data
      .filter((p) => 
        p.attributes.title.toLowerCase().includes(searchTermNormalize) ||
        p.attributes.banner_desc.toLowerCase().includes(searchTermNormalize) ||
        p.attributes.subtitle.toLowerCase().includes(searchTermNormalize))
      .slice(0, 10);

    const industries = results.industries.data
      .filter((i) => 
        i.attributes.title.toLowerCase().includes(searchTermNormalize) || 
        i.attributes.banner_desc.toLowerCase().includes(searchTermNormalize))
      .slice(0, 10);

    return { 
      artifacts, 
      sections, 
      products, 
      industries 
    };
  }, [results, isVersionLight, searchTermNormalize]);

  return (
    <div className="">
      {/* {processedResults.artifacts.length > 0 && (
        <>
            <p className="block text-black font-semibold mt-4 mb-2 p-4 rounded-lg bg-gray-200">
              {t("preview")}
              
            </p>
            {processedResults.artifacts.map((artifact, index) => (
              <ResultBlock 
                key={index} 
                title={artifact.title} 
                url={`/${locale}/${artifact.parentType}/${artifact.parentSlug}/${artifact.sectionSlug}#${artifact.id}`}
                parentTitle={artifact.parentTitle}
              />
            ))}
        </>
      )} */}
      {(processedResults.sections.length > 0 || processedResults.artifacts.length > 0) && (
        <>
          <p className="block text-black font-semibold mt-4 mb-2 p-4 rounded-lg bg-gray-200">
            {t("section")}
          </p>

          {/* SEÇÕES */}
          {processedResults.sections.map((section, index) => (
            <ResultBlock 
              key={`sec-${index}`} 
              title={section.title} 
              url={`/${locale}/${section.parentType}/${section.parentSlug}/${section.slug}`}
              parentTitle={section.parentTitle}
            />
          ))}

          {/* ARTIFACTS */}
          {processedResults.artifacts.map((artifact, index) => (
            <ResultBlock 
              key={`art-${index}`} 
              title={artifact.title} 
              url={`/${locale}/${artifact.parentType}/${artifact.parentSlug}/${artifact.sectionSlug}#${artifact.id}`}
              parentTitle={artifact.parentTitle}
            />
          ))}
        </>
      )}
    </div>
  );
}