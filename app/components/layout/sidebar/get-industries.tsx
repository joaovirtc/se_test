import { TabDropdown } from "@/app/components/system/tabs/dropdown";
import { Industry } from "@/app/types/industry";
import { cookies } from "next/headers";
import LoadingError from "@/app/components/modules/feedback/loading-error-fallback";
import fetchData from "@/app/utils/fetch";
import { COOKIE_KEYS } from "@/app/constants/cookies";

interface Props {
  locale: string;
}

export default async function Get({ locale }: Props) {
  const cookieStore = await cookies();
  const isDemoLight = cookieStore.get(`${COOKIE_KEYS.VERSION}`)?.value === "true";

  let industriesResponse: Industry[] | undefined;

  try {
    [industriesResponse] = await Promise.all([
      fetchData<Industry[]>(`industries`, locale, {
        populate: [
          "sections_demo",
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

  const industries = industriesResponse.map((industry) => {
    let sections_demo = industry.attributes.sections_demo
      .filter((section) => section.show_in_demo_light === isDemoLight);

    return {
      ...industry,
      sections_demo,
      hasSections: sections_demo.length > 0   // Flag para verificar se há seção na industria
    }
  })
    .sort((a, b) => {
      if (a.hasSections !== b.hasSections) return a.hasSections ? -1 : 1;
      return a.attributes.title.localeCompare(b.attributes.title);
    });


  return (
    <>
      {industries.map((industry) => (
        <div key={industry.id}>
          <TabDropdown
            data={industry}
            sections={industry.sections_demo}
            isComingSoon={!industry.hasSections}
            route="industries"
          />
        </div>
      ))}
    </>
  );
}
