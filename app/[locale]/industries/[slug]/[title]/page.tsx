import { Industry } from "@/app/types/industry";
import fetchData from "@/app/utils/fetch";
import UpdateLocalizationsData from "@/app/utils/localization-lang-data";
import { cookies } from "next/headers";
import { Metadata } from "next";
import useIsLaptop from "@/app/utils/useIsLaptop";
import LoadingError from '@/app/components/modules/feedback/loading-error-fallback';
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import CarouselArtifactsWrapper from "@/app/components/modules/media/carousel/embla/artifacts/EmblaCarouselArtifactsWrapper";
interface Props {
  slug: string
  locale: string
  title: string
}

export async function generateMetadata(props: { params: Promise<Props> }): Promise<Metadata> {
  const { slug, locale, title } = await props.params
  const [metadata] = await Promise.all([
      fetchData<Industry>(`industries/${slug}`, locale, {
          populate: {
            sections_demo: {
              filters: {
                slug: { $eq: title },
              },
            },
              SEO: {
                  populate: "*",
              },
          },

      }),
  ]);


  return {
      title: `${metadata.attributes.sections_demo?.[0]?.title ?? ""} | ${metadata.attributes.SEO?.title ?? metadata.attributes.title ?? ""}`,
      description: metadata?.attributes?.SEO?.description ?? metadata?.attributes?.banner_desc ?? "",
      robots: {
          index: metadata?.attributes?.SEO?.robots_index ?? true,
          follow: metadata?.attributes?.SEO?.robots_follow ?? true,
      },
      openGraph: {
          title: `${metadata.attributes.sections_demo?.[0]?.title ?? ""} | ${metadata.attributes.SEO?.title ?? metadata.attributes.title ?? ""}`,
          description: metadata?.attributes.SEO?.opengraph_description ?? metadata?.attributes?.SEO?.description ?? metadata?.attributes.banner_desc ?? "",
          siteName: "SoftExpert",
          images: {
              url: metadata?.attributes?.SEO?.opengraph_image?.data?.attributes?.url ?? "https://demo-softexpert.s3.us-east-1.amazonaws.com/public/open-graph.png",
              alt: metadata?.attributes?.SEO?.opengraph_image?.data?.attributes?.alternativeText ?? "SoftExpert",
          },
          locale: locale,
          type: "website",
      },


  }

}

export default async function Page(props: { params: Promise<Props> }) {
  const { slug, locale, title } = await props.params;
  const t = await getTranslations("otherTranslations");
  const cookieStore = await cookies();
  const isVersionLight = cookieStore.get("se_demo_site")?.value === "true";

  let industry: Industry | undefined;
  let languageSelector: Industry | undefined;

  try {
    [industry, languageSelector] = await Promise.all([
      fetchData<Industry>(`industries/${slug}`, locale, {
        populate: {
          sections_demo: {
            filters: {
              slug: { $eq: title },
            },
            populate: {
              artifacts: {
                populate: ["media"]
              }
            }
          },
          cases: {
            populate: ["icon"]
          }
        }
      }),
      fetchData<Industry>(`industries/${slug}`, locale, {
        fields: ["title", "slug", "locale"],
        populate: {
          sections_demo: {
            fields: ['slug', 'title']
          },
          localizations: {
            populate: {
              sections_demo: {
                fields: ['slug', 'title']
              }
            }
          }
        }
      }),
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados de INDUSTRY:", error);
  }

  const artifacts = industry?.attributes.sections_demo?.flatMap((item) => item.artifacts ?? []) ?? [];
  const cases = industry?.attributes.cases?.data ?? [];

  const localizationsData = languageSelector?.attributes?.localizations?.data.map(lang => {
    const sections = lang.attributes?.sections_demo || [];
    const sectionIndex = isVersionLight ? 0 : 1;
  
    const sectionSlug = sections[sectionIndex]?.slug;
  
    return {
      attributes: {
        locale: lang.attributes.locale,
        slug: `${lang.attributes.slug}/${sectionSlug ?? ''}`
      }
    };
  }).filter(Boolean);
  
  // Slug da seção atual com base na versão
  const sectionIndex = isVersionLight ? 0 : 1;
  const selectedSlug = languageSelector?.attributes?.sections_demo?.[sectionIndex]?.slug ?? '';
  
  const result = {
    attributes: {
      locale: languageSelector?.attributes.locale,
      slug: `${languageSelector?.attributes.slug}/${selectedSlug}`,
      localizations: {
        data: localizationsData
      }
    }
  };

  if (!artifacts?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] gap-2">
          <h1 className="text-6xl font-bold text-black mb-4 tracking-tighter">
              {t('titleNotFoundArtifact')} ):
          </h1>
          <p className="text-gray-500 mb-4">
              {t('descNotFoundArtifact')}
          </p>
          <Link href={`./`}>
              <span className="rounded-lg px-4 py-2 bg-blue-500 text-white text-sm md:text-base font-medium transition-colors hover:bg-blue-900 flex items-center justify-center">
                  {t('labelNotFound')}
              </span>
          </Link>
      </div>
  );
  }

  return (
    <>
      <UpdateLocalizationsData data={result} path={"/industries/[slug]"} catSlug={true} />
      <CarouselArtifactsWrapper slides={artifacts} cases={cases} />
    </>
  );
}