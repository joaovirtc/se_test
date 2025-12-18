import { Industry } from "@/app/types/industry";
import fetchData from "@/app/utils/fetch";
import UpdateLocalizationsData from "@/app/utils/localization-lang-data";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { RiPlayCircleLine, RiCloseLine, RiStarSFill, RiArrowRightLine } from "@remixicon/react";
import convertYouTubeToEmbed from "@/app/utils/convert-to-youtube-embed"
import certificateCapterra from "@/public/certfications/capterra.svg"
import certificateAWS from "@/public/certfications/aws.png"
import certificateGetApp from "@/public/certfications/getapp-leaders.png"
import certificateSoftwareAdvice from "@/public/certfications/software-adivice.png"
import certificateGetApp1 from "@/public/certfications/getapp.png"
import certificateSoftwareAdvice2 from "@/public/certfications/software-advice-frontrunners.png"
import certificateAWSLifeScience from "@/public/certfications/selo-aws-life-sciences.svg"
import { Metadata } from "next";
import Link from "next/link";
import LoadingErrorFallback from "@/app/components/modules/feedback/loading-error-fallback";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/app/constants/cookies";
import { Artifact } from "@/app/types/artifact";
import GuideFlow from "@/app/components/modules/media/carousel/guideflow/GuideFlow";

interface Props {
    locale: string
    slug: string
}

export async function generateMetadata(props: { params: Promise<Props> }): Promise<Metadata> {
    const { slug, locale } = await props.params
    const [metadata] = await Promise.all([
        fetchData<Industry>(`industries/${slug}`, locale, {
            populate: {
                SEO: {
                    populate: "*",
                },
            },

        }),
    ]);

    return {
        title: metadata?.attributes?.SEO?.title ?? metadata?.attributes?.title ?? "",
        description: metadata?.attributes?.SEO?.description ?? metadata?.attributes?.banner_desc ?? "",
        robots: {
            index: metadata?.attributes?.SEO?.robots_index ?? true,
            follow: metadata?.attributes?.SEO?.robots_follow ?? true,
        },
        openGraph: {
            title: metadata?.attributes.SEO?.opengraph_title ?? metadata?.attributes.SEO?.title ?? metadata?.attributes.title ?? "",
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
    const { locale, slug } = await props.params
    const t_lifeScience = await getTranslations("IndustriesPage")
    const t = await getTranslations('otherTranslations');
    const cookieStore = await cookies();
    const appVersion = cookieStore.get(COOKIE_KEYS.VERSION)?.value;

    let industry: Industry | undefined;
    let languageSelector: Industry | undefined;

    try {
        [industry, languageSelector] = await Promise.all([
            fetchData<Industry>(`industries/${slug}`, locale, {
                populate: [
                    "icon",
                    "title",
                    "banner_desc",
                    "banner_video_link",
                    "industry_menu_image",
                    "sections_demo",
                    "sections_demo.artifacts.media",
                ]
            }),
            fetchData<Industry>(`industries/${slug}`, locale, {
                fields: ["titlepage", "title", "slug", "locale"],
                populate: {
                    localizations: {
                        fields: ["titlepage", "title", "slug", "locale"],
                    },
                },
            }),
        ]);
    } catch (error) {
        console.error("Erro ao buscar dados de INDUSTRY:", error);
    }

    let sectionMeetTheSolution = industry?.attributes.sections_demo.
        find((section) => section.show_in_demo_light === true);

    function getFirstImageArtifact(artifacts: Artifact[]) {
        if (!artifacts || artifacts.length === 0) return null;
        // Procura primeiro por artifacts que tenham media com imagens
        for (const artifact of artifacts) {
            // Verifica se tem media e se media.data existe
            if (artifact.media?.data && Array.isArray(artifact.media.data)) {
                // Procura na array de media por imagens
                const imageMedia = artifact.media.data.find(media => {
                    const mimeType = media.attributes?.mime?.toLowerCase() || '';
                    return mimeType.startsWith('image/') && (
                        mimeType.includes('png') ||
                        mimeType.includes('jpg') ||
                        mimeType.includes('jpeg') ||
                        mimeType.includes('gif') ||
                        mimeType.includes('webp') ||
                        mimeType.includes('svg')
                    );
                });
                if (imageMedia) {
                    return {
                        ...artifact,
                        media: {
                            data: [imageMedia]
                        }
                    };
                }
            }
        }
        return null;
    }

    function getFirstGuideFlowArtifact(artifacts: Artifact[]) {
        if (!artifacts || artifacts.length === 0) return null;
        // Procura por artifacts que tenham guideflow_id
        for (const artifact of artifacts) {
            if (artifact.guideflow_id) {
                return artifact;
            }
        }
        return null;
    }

    if (!industry) {
        return <LoadingErrorFallback />;
    }


    return (
        <>
            <UpdateLocalizationsData data={languageSelector} path={"/industries/[slug]"} catSlug="" />
            {appVersion === "true" ? (
                <div className='w-full mt-10 mx-auto max-w-4xl 2xl:max-w-6xl flex gap-7 items-center flex-col xl:flex-row min-h-[80vh]'>
                    <div className='w-full xl:w-1/2 grid gap-4'>
                        <Image className='max-w-[50px] lg:max-w-[60px]' src={`${industry?.attributes.icon.data.attributes.url}`} alt={""} width={80} height={80} />
                        <h1 className='text-xl md:text-2xl 2xl:text-4xl font-bold tracking-tighter text-zinc-900'>{industry?.attributes.title}</h1>
                        <p className='text-sm 2xl:text-base text-gray-600 font-normal'>{industry?.attributes.banner_desc}</p>
                        <div className="flex gap-8 mb-4">
                            {sectionMeetTheSolution &&
                                <Link
                                    href={`${industry?.attributes.slug}/${sectionMeetTheSolution.slug}`}
                                    className="primary-button plus-jakarta-sans"
                                >
                                    {sectionMeetTheSolution.title} <RiArrowRightLine size={21} />
                                </Link>
                            }
                            <label htmlFor="modal-toggle" className="third-button plus-jakarta-sans">
                                <RiPlayCircleLine size={30} className="animate-none" />
                                {t('watchVideo')}
                            </label>
                        </div>
                        <input type="checkbox" id="modal-toggle" className="modal-toggle hidden" />
                        <label htmlFor='modal-toggle' className="modal bg-linear-to-b from-black/48 to-black/73 backdrop-blur-xs fixed w-full h-svh z-50 left-0 top-0 grid place-items-center">
                            <div className="modal-content w-full h-full p-6 sm:w-3/4 lg:w-2/3 flex flex-col justify-center items-center relative mx-auto">
                                <div className="max-w-[1320px] w-full flex items-center justify-end mb-2 sm:mb-0">
                                    <label htmlFor="modal-toggle" className="top-20 -right-2 text-white cursor-pointer transition-colors hover:bg-zinc-950/50 rounded-full p-1">
                                        <RiCloseLine size={32} />
                                    </label>
                                </div>
                                <iframe
                                    className='rounded-lg w-full max-w-[1140px] aspect-video'
                                    src={`${convertYouTubeToEmbed(`${industry?.attributes.banner_video_link}`)}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                        </label>
                        <div className='space-y-3'>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className='flex'>
                                    <RiStarSFill color='#dde100' size={30} className='-ml-1' />
                                    <RiStarSFill color='#dde100' size={30} className='-ml-1' />
                                    <RiStarSFill color='#dde100' size={30} className='-ml-1' />
                                    <RiStarSFill color='#dde100' size={30} className='-ml-1' />
                                    <RiStarSFill color='#dde100' size={30} className='-ml-1' />
                                </div>
                                <p className='text-sm 2xl:text-base text-black font-medium'>{t('labelCertifications')}</p>
                            </div>
                            <div className='flex justify-start items-center gap-5 flex-wrap w-full'>
                                <Image src={"https://assets.softexpert.com/software_advice_2025_badge_359d0c3b3f.svg"} alt="certifications Front runners" className='w-[55px] 2xl:w-[85px]' width={60} height={20} />
                                <Image src={"https://assets.softexpert.com/getapp_2025_badge_27fac46917.svg"} alt="certifications GetApp leaders" className='w-[55px] 2xl:w-[85px]' width={70} height={20} />
                                <Image src={"https://assets.softexpert.com/capterra_2025_badge_738d4beb98.svg"} alt="certifications CapTerra Shortlist" className='w-[55px] 2xl:w-[85px]' width={90} height={0} />
                                <Image src={certificateCapterra} alt="certifications/capterra" className='w-[55px] 2xl:w-[85px]' width={77} height={10} />
                                <Image src={certificateGetApp1} alt="certifications/getapp" className='w-[55px] 2xl:w-[85px]' width={90} height={0} />
                                <Image src={certificateSoftwareAdvice} alt="certifications/software-advice" className='w-[55px] 2xl:w-[85px]' width={77} height={16} />
                                <Image src={certificateAWS} alt="certification AWS" className='w-[55px] 2xl:w-[67px]' width={80} height={20} />
                                {industry?.attributes.title === t_lifeScience("phamaceuticalsBiotechnology") &&
                                    <Image
                                        src={certificateAWSLifeScience}
                                        alt="certificate AWS Life Science"
                                        className='w-[55px] 2xl:w-[80px]'
                                        width={80}
                                        height={20}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full xl:w-1/2 grid place-items-center'>
                        <Image
                            src={`${industry?.attributes.industry_menu_image.data.attributes.url}`}
                            className='object-cover w-full max-w-[450px]'
                            alt={``}
                            width={380}
                            height={380}
                            loading='eager'
                        />
                    </div>
                </div>
            ) : (
                <section className='w-full mt-4 pb-10 space-y-4 mx-auto max-w-7xl'>
                    <div className="flex w-full items-center gap-x-4 flex-wrap">
                        <Image className='max-w-[50px] lg:max-w-[60px]' src={`${industry?.attributes.icon.data.attributes.url}`} alt={""} width={80} height={80} />
                        <h1 className='text-xl md:text-2xl 2xl:text-3xl font-bold tracking-tighter pb-1 text-zinc-900'>{industry?.attributes.title}</h1>
                        {/* <p>{solution?.attributes.banner_desc}</p> */}
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 place-items-center gap-4">
                        {industry.attributes.sections_demo
                            .filter((section) => section.show_in_demo_light !== true)
                            .map((section, index) => {
                                const imageArtifact = getFirstImageArtifact(section.artifacts);
                                const imageUrl = imageArtifact?.media?.data?.[0]?.attributes?.url;
                                const guideFlowArtifact = getFirstGuideFlowArtifact(section.artifacts);

                                return (
                                    <article key={index} className="w-full sm:max-w-[270px] h-full 2xl:max-w-[300px] space-y-2">
                                        {imageUrl ? (
                                            <Link
                                                href={`${industry.attributes.slug}/${section.slug}`}
                                                className="relative block w-full mx-auto justify-between aspect-video border overflow-hidden rounded-lg bg-neutral-100">
                                                <Image
                                                    src={imageUrl}
                                                    alt={section.title || 'Preview'}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 
                                                        (max-width: 768px) 50vw, 
                                                        (max-width: 1024px) 33vw, 
                                                        25vw"
                                                    className="object-contain transition-transform duration-200 hover:scale-105 z-10"
                                                    loading={index < 4 ? 'eager' : 'lazy'}
                                                    quality={85}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                                                />
                                            </Link>
                                        ) : guideFlowArtifact?.guideflow_id ? (
                                            <div className="relative w-full mx-auto justify-between aspect-video overflow-hidden ">
                                                <GuideFlow 
                                                    flowId={guideFlowArtifact.guideflow_id} 
                                                    className="border"
                                                />
                                                <Link
                                                    href={`${industry.attributes.slug}/${section.slug}`}
                                                    className="absolute inset-0 z-20 cursor-pointer"
                                                    aria-label={section.title}
                                                />
                                            </div>
                                        ) : null}
                                        <p className="text-sm 2xl:text-base font-medium text-center text-coreBlue500 ">
                                            {section.title}
                                        </p>
                                    </article>
                                );
                            })}
                    </div>

                </section>
            )}
        </>
    )
}