import Link from "next/link";
import type { Solution } from "@/app/types/solution";
import type { Industry } from "@/app/types/industry";
import type { SectionsDemo } from "@/app/types/sections_demo";
import { useTranslations } from "next-intl"; 

interface Props {
  query: string;
  locale: string;
  results: {
    artifacts: SectionsDemo["artifacts"];
    sections: SectionsDemo[];
    products: Solution[];
    industries: Industry[];
  };
  onItemClick?: () => void;
}

export default function ResultBlocks({ query, locale, results, onItemClick}: Props) {
  const { artifacts, sections, products, industries } = results;
  const t = useTranslations("otherTranslations");

  return (
    <>
      {/* {artifacts.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {t("preview")}
          </p>
          {artifacts.map((artifact) => (
            <Link
              key={artifact.id}
              href={`/${locale}/${artifact.parentType}/${artifact.parentSlug}/${artifact.sectionSlug}#${artifact.id}`}
              onClick={onItemClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
            >
              {artifact.title} <br/>
              <span className="text-xs text-gray-500">
                {artifact.parentTitle}
              </span>
            </Link>
          ))}
        </div>
      )} */}

      {products.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {t("products")}
          </p>
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/our-products/${p.attributes.slug}`}
              onClick={onItemClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
            >
              {p.attributes.title}
            </Link>
          ))}
        </div>
      )}

      {(sections.length > 0 || artifacts.length > 0) && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {t("section")}
          </p>

          {/* SEÇÕES */}
          {sections.map((section, index) => (
            <Link
              key={`${section.id}-${index}`}
              href={`/${locale}/our-products/${section.parentSlug}/${section.slug}`}
              onClick={onItemClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
            >
              {section.title}
              <br />
              <span className="text-xs text-gray-500">{section.parentTitle}</span>
            </Link>
          ))}

          {/* ARTIFACTS */}
          {artifacts.map((artifact) => (
            <Link
              key={artifact.id}
              href={`/${locale}/${artifact.parentType}/${artifact.parentSlug}/${artifact.sectionSlug}#${artifact.id}`}
              onClick={onItemClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
            >
              {artifact.title}
              <br />
              <span className="text-xs text-gray-500">{artifact.parentTitle}</span>
            </Link>
          ))}
        </div>
      )}


      {industries.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {t("industries")}
          </p>
          {industries.map((i) => (
            <Link
              key={i.id}
               href={`/${locale}/industries/${i.attributes.slug}`}
              onClick={onItemClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
            >
              {i.attributes.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
