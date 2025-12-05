import { TabDropdown } from "@/app/components/system/tabs/dropdown";
import { Solution } from "@/app/types/solution";
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

  let solutionsResponse: Solution[] | undefined;

  try {
    [solutionsResponse] = await Promise.all([
      fetchData<Solution[]>(`produtos`, locale, {
        populate: [
          "sections_demo",
        ]
      })
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados de solution:", error);
    return <LoadingError />;
  }

  if (!solutionsResponse || solutionsResponse.length === 0) {
    return <LoadingError />;
  }

  const solutions = solutionsResponse
  .filter((solution) => {
    const sigla = solution.attributes.acronym;
    return sigla !== "ERM" && sigla !== "CWM";
  })
  .map((solution) => {
    let sections_demo = solution.attributes.sections_demo
      .filter((section) => section.show_in_demo_light === isDemoLight);

    return {
      ...solution,
      sections_demo,
    };
  })
  .sort((a, b) => {
    return a.attributes.acronym.localeCompare(b.attributes.acronym);
  });
  


  return (
    <>
      {solutions.map((solution) => (
        <div key={solution.id}>
          <TabDropdown
            data={solution}
            sections={solution.sections_demo}
            route="our-products"
          />
        </div>
      ))}
    </>
  );
}
