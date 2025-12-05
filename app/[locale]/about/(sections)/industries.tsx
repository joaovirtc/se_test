import { useTranslations } from "next-intl";
import AeroespaceIcon from "@/public/icons-industries/Industry=Aerospace-and-Defense.svg";
import AgribusinessIcon from "@/public/icons-industries/Industry=Agribusiness.svg";
import ArchitectureIcon from "@/public/icons-industries/Industry=Architecture-Construction.svg";
import AutomotiveIcon from "@/public/icons-industries/Industry=Automotive.svg";
import ChemicalsIcon from "@/public/icons-industries/Industry=Chemicals.svg";
import ConsumerIcon from "@/public/icons-industries/Industry=Consumer-Goods.svg";
import EducationIcon from "@/public/icons-industries/Industry=Education.svg";
import EnergyIcon from "@/public/icons-industries/Industry=Energy-Utilities.svg";
import FinancialIcon from "@/public/icons-industries/Industry=Financial-Services.svg";
import FoodIcon from "@/public/icons-industries/Industry=Food-Beverage.svg";
import HealthcareIcon from "@/public/icons-industries/Industry=Healthcare.svg";
import HightTechIcon from "@/public/icons-industries/Industry=Hight-tech.svg";
import MedicalIcon from "@/public/icons-industries/Industry=Medical-Devices.svg";
import MiningIcon from "@/public/icons-industries/Industry=Mining-Metals.svg";
import PharmaceuticalsIcon from "@/public/icons-industries/Industry=Pharmaceuticals-Biotechnology.svg";
import PublicSectorIcon from "@/public/icons-industries/Industry=Public-Sector.svg";
import RetailIcon from "@/public/icons-industries/Industry=Retail.svg";
import TransportationIcon from "@/public/icons-industries/Industry=Transportation-Logistics.svg";
import ManufaturingIcon from "@/public/icons-industries/Manufatura.svg";
import ServicesIcon from "@/public/icons-industries/Servicos_e_Consultoria.svg";

import CardIndustrie from "@/app/components/system/cards/card-industrie";

export default function Industries() {
  const t = useTranslations("IndustriesPage");

  return (
    <>
      <h1 className="tracking-tighter text-2xl lg:text-3xl font-bold">
        {t("industries")}
      </h1>
      <p className="text-sm md:text-base text-gray-500 leading-[22px] lg:leading-6 font-normal mb-3 mt-2">
        {t("description")}
      </p>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
        <CardIndustrie
          link={t("linkAgribusiness")}
          label={t("agribusiness")}
          color="blueSolid"
          bgColor="blue"
          bgColorSolid="blueSolid"
          icon={AgribusinessIcon}
          labelLink={t("moreInfo")}
          className="snap-center"
        />
        <CardIndustrie
          link={t("linkFoodBeverages")}
          label={t("foodBbeverages")}
          color="redSolid"
          bgColor="red"
          bgColorSolid="redSolid"
          icon={FoodIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkArchitecture")}
          label={t("architecture")}
          color="yellowSolid"
          bgColor="yellow"
          bgColorSolid="yellowSolid"
          icon={ArchitectureIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkAutomotive")}
          label={t("automotive")}
          color="orangeSolid"
          bgColor="orange"
          bgColorSolid="orangeSolid"
          icon={AutomotiveIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkAerospaceDefense")}
          label={t("aerospaceDefense")}
          color="greenSolid"
          bgColor="green"
          bgColorSolid="greenSolid"
          icon={AeroespaceIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkEnergy")}
          label={t("energy")}
          color="roseSolid"
          bgColor="rose"
          bgColorSolid="roseSolid"
          icon={EnergyIcon}
          labelLink={t("moreInfo")}
        />
        {/* <CardIndustrie 
                  link={t('linkMedical')}
                  label={t('medical')}
                  color="skySolid"
                  bgColor="sky"
                  bgColorSolid ="skySolid"
                  icon={MedicalIcon}
                  labelLink={t('moreInfo')}
              /> */}
        {/* REPEAT COLORS */}

        <CardIndustrie
          link={t("linkFinancial")}
          label={t("financial")}
          color="blueSolid"
          bgColor="blue"
          bgColorSolid="blueSolid"
          icon={FinancialIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkCheminicals")}
          label={t("cheminicals")}
          color="redSolid"
          bgColor="red"
          bgColorSolid="redSolid"
          icon={ChemicalsIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkConsumer")}
          label={t("consumer")}
          color="yellowSolid"
          bgColor="yellow"
          bgColorSolid="yellowSolid"
          icon={ConsumerIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkEducation")}
          label={t("education")}
          color="orangeSolid"
          bgColor="orange"
          bgColorSolid="orangeSolid"
          icon={EducationIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkMiningMetals")}
          label={t("miningMetals")}
          color="greenSolid"
          bgColor="green"
          bgColorSolid="greenSolid"
          icon={MiningIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkPharmaceuticalsBiotechnology")}
          label={t("phamaceuticalsBiotechnology")}
          color="roseSolid"
          bgColor="rose"
          bgColorSolid="roseSolid"
          icon={PharmaceuticalsIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkServicesConsulting")}
          label={t("servicesConsulting")}
          color="skySolid"
          bgColor="sky"
          bgColorSolid="skySolid"
          icon={ServicesIcon}
          labelLink={t("moreInfo")}
        />

        {/* REAPET COLORS */}

        <CardIndustrie
          link={t("linkPublicSector")}
          label={t("publicSector")}
          color="blueSolid"
          bgColor="blue"
          bgColorSolid="blueSolid"
          icon={PublicSectorIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkTransportation")}
          label={t("transpotion")}
          color="redSolid"
          bgColor="red"
          bgColorSolid="redSolid"
          icon={TransportationIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkHealthcare")}
          label={t("healthCare")}
          color="yellowSolid"
          bgColor="yellow"
          bgColorSolid="yellowSolid"
          icon={HealthcareIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkHighTech")}
          label={t("highTech")}
          color="orangeSolid"
          bgColor="orange"
          bgColorSolid="orangeSolid"
          icon={HightTechIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkManafacture")}
          label={t("manufacture")}
          color="greenSolid"
          bgColor="green"
          bgColorSolid="greenSolid"
          icon={ManufaturingIcon}
          labelLink={t("moreInfo")}
        />
        <CardIndustrie
          link={t("linkRetail")}
          label={t("retail")}
          color="roseSolid"
          bgColor="rose"
          bgColorSolid="roseSolid"
          icon={RetailIcon}
          labelLink={t("moreInfo")}
        />
      </div>
    </>
  );
}
