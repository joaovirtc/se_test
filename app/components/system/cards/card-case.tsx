"use client";

import { Case } from "@/app/types/case";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Props {
  item: Case;
  index?: number;
}



export default function CaseCard({ item, index }: Props) {
  const t = useTranslations("otherTranslations");
  const locale = useLocale();

  const caseFileURL = item.attributes.file?.data?.attributes?.url;
  const caseSlug = item.attributes.slug;

  const caseLink = caseFileURL
  ? caseFileURL
  : caseSlug
  ? `https://softexpert.com/${locale}/${t("success-cases-route")}/${caseSlug}`
  : "#";

  return (
    <div
      key={index}
      className="flex flex-col justify-between h-full rounded-3xl border border-neutrals-100 p-6 bg-white "
    >

        <div className="md:mb-4">
          {item.attributes.icon?.data ? (
            <>
              <div className="relative w-[100px] mb-0 md:mb-2 grayscale brightness-0">
                <Image
                  width={100}
                  height={100}
                  src={`${item.attributes.icon.data.attributes.url}`}
                  alt={item.attributes.title}
                  className=""
                />
              </div>
            </>
          ) : (
            <h3 className="text-xl lg:text-lg font-semibold text-expertVision700 plus-jakarta-sans">
              {item.attributes.title}
            </h3>
          )}

        <div
          className="hidden md:flex text-neutral-600 text-sm text-[#040713] font-normal dangerously-html !line-clamp-4"
          dangerouslySetInnerHTML={{ __html: item.attributes.short_desc }}
        />
      </div>

      <Link
        href={caseLink}
        target="_blank"
        referrerPolicy="no-referrer"
        className="text-sm relative w-fit cursor-pointer flex gap-2 hover:underline plus-jakarta-sans"
      >
        {t("see-full-story")}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9996 19.625L11.1996 18.8L17.4246 12.575H4.37463V11.425H17.4246L11.1996 5.2L11.9996 4.375L19.6246 12L11.9996 19.625Z"
            fill="#040713"
          />
        </svg>
      </Link>
    </div>
  );
}
