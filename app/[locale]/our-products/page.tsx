import SuiteHex from "@/app/components/system/hive/suite-hexagon";
import Hex from "@/app/components/system/hive/hexagon"
import { getTranslations, getLocale } from "next-intl/server";
import fetchData from "@/app/utils/fetch";
import { Solution } from "@/app/types/solution";
import LoadingError from "@/app/components/modules/feedback/loading-error-fallback";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  let solutionsResponse: Solution[] | undefined;

  try {
    [solutionsResponse] = await Promise.all([
      fetchData<Solution[]>(`produtos`, locale, {
        populate: ["sections_demo", "icon"],
      }),
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados de SOLUTIONS:", error);   
    return <LoadingError />;
  }

  if (!solutionsResponse || solutionsResponse.length === 0) {
    return <LoadingError />;
  }

  // ordem da colmeia
  const solutionsColunms = [
    ["erm"],
    ["plm", "grc"],
    ["ecm", "qms", "cpm"],
    ["ehsm", "eam", "ppm"],
    ["icm", "esm", "slm"],
    ["bpm", "hdm"],
    ["esg"],
  ];

  return (
    <main className="flex flex-col items-center justify-between mt-14 w-full main-content overflow-x-hidden">
      <div className="grid place-items-center w-full max-w-[660px] gap-1">
        <h1 className="text-3xl lg:text-4xl 2xl:text-5xl text-center font-bold tracking-tighter textGradient p-2">
          {t("title")}
        </h1>
        <p className="text-center text-neutral-500 text-sm 2xl:text-base max-w-[590px]">
          {t("description")}
        </p>
      </div>

      <div className="content-hexagono mt-8">
        {solutionsColunms.map((colunms, colIndex) => (
          <div key={colIndex} className="column">
            {colunms.map((acronym) => {
              const solution = solutionsResponse.find(
                (a) => a.attributes.acronym.toLocaleLowerCase() === acronym
              );
              if (!solution) return null;
              return (
                <div key={solution.id}>
                  <Hex
                    slug={solution.attributes.slug}
                    acronym={solution.attributes.acronym}
                    name={
                      solution.attributes.product_name ??
                      solution.attributes.titlepage ??
                      solution.attributes.title
                    }
                    icon={solution.attributes.icon.data.attributes.url}
                  />
                  {acronym === "ehsm" && <SuiteHex />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="content-hexagono-mobile mt-8 custom-zoom">
        <div className="column">
          <SuiteHex />
          {solutionsResponse.map((solution) => (
            <div key={solution.id}>
              <Hex
                slug={solution.attributes.slug}
                acronym={solution.attributes.acronym}
                name={
                  solution.attributes.product_name ??
                  solution.attributes.titlepage ??
                  solution.attributes.title
                }
                icon={solution.attributes.icon.data.attributes.url}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
