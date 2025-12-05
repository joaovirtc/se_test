import { Solution } from "@/app/types/solution";
import fetchData from "@/app/utils/fetch";
import UpdateLocalizationsData from "@/app/utils/localization-lang-data";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { RiPlayCircleLine, RiCloseLine, RiStarSFill, RiArrowRightLine } from "@remixicon/react";
import convertYouTubeToEmbed from "@/app/utils/convert-to-youtube-embed"
import certificateCapterra from "@/public/certfications/capterra.svg"
import certificateAWS from "@/public/certfications/aws.png"
import certificateSoftwareAdvice from "@/public/certfications/software-adivice.png"
import certificateGetApp1 from "@/public/certfications/getapp.png"
import { Metadata } from "next";
import Link from "next/link";
import LoadingError from "@/app/components/modules/feedback/loading-error-fallback";

interface Props {
    locale: string
    slug: string
}

export async function generateMetadata(props: { params: Promise<Props> }): Promise<Metadata> {
    const { slug, locale } = await props.params
    const [metadata] = await Promise.all([
        fetchData<Solution>(`produtos/${slug}`, locale, {
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
    const t = await getTranslations('otherTranslations');

    let solution: Solution | undefined;
    let languageSelector: Solution | undefined;

    try {
        [solution, languageSelector] = await Promise.all([
            fetchData<Solution>(`produtos/${slug}`, locale, {
                populate: [
                    "icon", 
                    "title", 
                    "banner_desc", 
                    "action_link", 
                    "sections_demo"
                ]
            }),
            fetchData<Solution>(`produtos/${slug}`, locale, {
                fields: ["titlepage", "title", "slug", "locale"],
                populate: {
                    localizations: {
                        fields: ["titlepage", "title", "slug", "locale"],
                    },
                },
            }),
        ]);
    } catch (error) {
        console.error("Erro ao buscar dados de SOLUTION:", error);
    }

    let sectionMeetTheSolution = solution?.attributes.sections_demo.
        find((section) => section.show_in_demo_light === true);

    async function getFrameworkImage(sigla: string, locale: string) {
        const localizedImageUrl = `https://demo-softexpert.s3.amazonaws.com/public/framework/${sigla}-${locale}.png`;
        const fallbackImageUrl = `https://demo-softexpert.s3.amazonaws.com/public/framework/${sigla}-en.png`;
        
        try {
                const res = await fetch(localizedImageUrl, { method: 'HEAD' });
                if (res.ok) {
                    return localizedImageUrl;
                } else {
                    //console.warn(`Localized image not found: ${localizedImageUrl}. Using fallback image.`);
                    return fallbackImageUrl;
                }
            } catch (error) {
                console.error(`Error checking image existence: ${error}`);
                return fallbackImageUrl;
            }
    }

    let frameworkImage = await getFrameworkImage(
        solution?.attributes.acronym?.toLocaleLowerCase() || "",
        locale
      );

    if (!solution) {
        return <LoadingError/>
    }

    return (
        <>
            <UpdateLocalizationsData data={languageSelector} path={"/our-products/[slug]"} catSlug="" />
            <div className='w-full mt-14 xl:mt-10 mx-auto max-w-4xl 2xl:max-w-6xl flex gap-y-7 items-center flex-col xl:flex-row min-h-[80vh]'>
                <div className='w-full xl:w-1/2 grid gap-4'>
                    <Image className='w-[50%] max-w-[60px] md:w-full md:max-w-[80px] h-auto textGradient' src={`${solution?.attributes.icon.data.attributes.url}`} alt={""} width={80} height={80} />
                    <h1 className='text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tighter pb-1 text-zinc-900'>{solution?.attributes.title}</h1>
                    <p className='text-sm 2xl:text-base text-gray-600 font-normal'>{solution?.attributes.banner_desc}</p>
                    <div className="flex gap-8 mb-4">
                        {sectionMeetTheSolution &&
                            <Link
                                href={`${solution?.attributes.slug}/${sectionMeetTheSolution.slug}`}
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
                                src={`${convertYouTubeToEmbed(`${solution?.attributes.action_link}`)}`}
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
                            <Image src={certificateAWS} alt="certification AWS" className='w-[55px] 2xl:w-[77px]' width={80} height={20} />
                        </div>
                    </div>
                </div>
                <div className='w-full xl:w-1/2 grid place-items-center'>
                    <Image
                        src={frameworkImage}
                        className='object-cover w-[60%] sm:w-[60%] 2xl:w-[70%]'
                        alt={`Framework ${solution?.attributes.title}`}
                        width={380}
                        height={380}
                        loading='eager'
                    />
                </div>
            </div>
        </>
    )
}