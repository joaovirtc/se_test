import { getTranslations, getLocale } from 'next-intl/server';
import { RiArrowRightSLine } from '@remixicon/react';
import { Industry } from '@/app/types/industry';
import LoadingError from '@/app/components/modules/feedback/loading-error-fallback';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import fetchData from '@/app/utils/fetch';
import { COOKIE_KEYS } from '@/app/constants/cookies';

interface Props {
  locale: string;
}

export default async function Page( props: { params: Promise<Props> }) {
  const t = await getTranslations('IndustriesPage');
  const { locale } = await props.params;
  const cookieStore = await cookies();
  const isDemoLight = cookieStore.get(`${COOKIE_KEYS.VERSION}`)?.value === "true";

  let industriesResponse: Industry[] | undefined;

  try {
    [industriesResponse] = await Promise.all([
      fetchData<Industry[]>(`industries`, locale, {
        populate: [
          "sections_demo",
          "icon"
        ]
      })
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados da indústria:", error);
    return <LoadingError />;
  }

  if (!industriesResponse || industriesResponse.length === 0) {
    return <LoadingError />;
  }

  const industries = industriesResponse
    .map((industry) => {
      const sections_demo = industry.attributes.sections_demo.filter(
        (section) => section.show_in_demo_light === isDemoLight
      );

      return {
        ...industry,
        sections_demo,
        hasSections: sections_demo.length > 0,
      };
    })
    .sort((a, b) => {
      if (a.hasSections !== b.hasSections) return a.hasSections ? -1 : 1;
      return a.attributes.title.localeCompare(b.attributes.title);
    });

  return (
    <div className="w-full mt-14">
      <div className="grid place-items-center w-full max-w-[760px] gap-2 mx-auto">
        <h1 className="text-3xl lg:text-4xl 2xl:text-5xl text-center font-bold tracking-tighter textGradient p-2">
          {t('title_industries')}
        </h1>
        <p className="text-center text-neutral-500 text-sm 2xl:text-base">
          {t('description')}
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {industries.map((industry) => {
          const isComingSoon = !industry.hasSections;
          return (
            <Link
              key={industry.id}
              href={isComingSoon ? "#" : `industries/${industry.attributes.slug}`}
              target="_blank" 
              referrerPolicy="no-referrer"
            >
              <div
                className={`${isComingSoon ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  } w-full group flex gap-x-3 items-center transition-colors hover:bg-expertHorizon100/50 rounded-xl p-2`}
              >
                <div className="flex gap-x-2 items-center">
                  <div className="w-11 h-11 rounded-xl linear-gradient-2 grid place-items-center">
                    {industry.attributes.icon?.data?.attributes?.url && (
                      <Image
                        src={industry.attributes.icon.data.attributes.url}
                        alt={industry.attributes.title}
                        className="brightness-0 invert"
                        width={23}
                        height={23}
                      />
                    )}
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className="font-medium text-sm lg:text-base plus-jakarta-sans text-coreBlue500">
                      {industry.attributes.title}
                    </p>
                    {isComingSoon && (
                      <span className="text-xs text-black font-medium">
                        {t("coming_soon")}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-neutral-400 transition-colors group-hover:text-coreBlue500">
                  <RiArrowRightSLine size={18} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
