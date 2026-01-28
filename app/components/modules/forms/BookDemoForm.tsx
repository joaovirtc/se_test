'use client'

import { useState, FormEvent, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Input from "@/app/components/system/input/input";
import countriesData from "./json-selects/countries.json"
import departamentsData from "./json-selects/departments.json"
import { getUTM } from "@/app/utils/get-utm";
import PhoneField from "@/app/components/system/input/input-phone";
import { isValidPhoneNumber } from 'libphonenumber-js';

interface FormData {
    fonte_do_lead?: string
    nome: string
    email: string
    segmento: string,
    departamento: string,
    senioridade: string,
    telefone: any,
    nome_da_empresa: string,
    qtd_funcionarios: string,
    pais: string,
    origin_page: string;
    tempo_de_compra: string,
    descriçao?: string,
    utm?: string,
    locale?: string
    pagina_anterior_a_conversao?: string | null;

}

const BookDemoForm = ({ formType = "Form Site Header" }) => {
    const locale = useLocale()
    const UTM = getUTM();

    // ✅ SOLUÇÃO: Calcular dentro do componente com useEffect
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        fonte_do_lead: "Demo",
        nome: "",
        email: "",
        segmento: "",
        departamento: "",
        senioridade: "",
        telefone: "",
        nome_da_empresa: "",
        qtd_funcionarios: "",
        pais: "",
        tempo_de_compra: "",
        origin_page: typeof window !== "undefined" ? `${formType} > Presentation Request > ${document?.title} - ${window.location.origin}${window.location.pathname}` : "",
        utm: `${UTM}`,
        locale: locale,
        pagina_anterior_a_conversao: null // Será atualizado pelo useEffect
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const history = JSON.parse(sessionStorage.getItem("history") || "[]");

        let prevPage = null;
        if (history.length > 1) {
            prevPage = history[history.length - 2];
        } else if (history.length === 1) {
            prevPage = history[0];
        }

        setPreviousPage(prevPage);

        setFormData(prev => ({
            ...prev,
            pagina_anterior_a_conversao: prevPage
        }));

        // console.log("📍 Previous page atualizada:", prevPage);
    }, []);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (value: string) => {
        setFormData({ ...formData, telefone: value });
    };


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            nome: "",
            email: "",
            segmento: "",
            departamento: "",
            senioridade: "",
            telefone: "",
            nome_da_empresa: "",
            qtd_funcionarios: "",
            pais: "",
            tempo_de_compra: "",
            origin_page: "",
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.telefone && !formData.telefone.startsWith("+")) {
            formData.telefone = `+${formData.telefone}`;
        }

        try {
            const webhookResponse = await fetch("/api/hubspot-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData }),
            });

            if (!webhookResponse.ok) {
                const errorBody = await webhookResponse.json();
                console.error("HubSpot Error Details:", errorBody);
            }

            const emailResponse = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData }),
            });

            if (!emailResponse.ok) {
                console.error("Erro ao enviar e-mail (FORM)");
            }

            if (webhookResponse.ok && emailResponse.ok) {
                setIsSubmitted(true);
                resetForm();
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
                if (typeof window !== "undefined") {
                    const dataLayerFormObject = {
                        event: "form_submit",
                        form_name: "ContactForm",
                        fields: {
                            name: formData.nome,
                            email: formData.email,
                            phone: formData.telefone,
                            company: formData.nome_da_empresa,
                            seniority: formData.senioridade,
                            department: formData.departamento,
                            industry: formData.segmento,
                            country: formData.pais,
                            company_size: formData.qtd_funcionarios,
                            necessity: formData.tempo_de_compra,
                            origin_page: `${formType} > Presentation Request > ${document?.title} - ${window.location.href}`,
                            lead_source: 174,
                            pagina_anterior_a_conversao: previousPage
                        },
                    };

                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push(dataLayerFormObject);
                }

            } else {
                console.error('Erro ao enviar dados');
                resetForm();
            }


        } catch (error) {
            console.error('Erro ao enviar dados', error);
        } finally {
            setIsLoading(false);
        }
    };


    const t = useTranslations('FormBookDemo');
    const t_industrie = useTranslations('IndustriesPage');

    const countryOptions = countriesData[locale as keyof typeof countriesData]?.[0]?.['select-country']
        ?? countriesData['en'][0]['select-country'];

    const countryOptionsEnglish = countriesData['en'][0]['select-country'];

    const departmentsOptions = departamentsData[locale as keyof typeof departamentsData]?.[0]?.['select-department']
        ?? departamentsData['en'][0]['select-department'];

    const departmentsOptionsEnglish = departamentsData['en'][0]['select-department'];

    return (
        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-2 2xl:space-y-3">
            <div className="height-calc-form overflow-y-scroll space-y-2">
                <div className="space-y-2">
                    <Input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder={t('labelFullName')}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('labelBusinessEmail')}
                        required
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2 ">
                    <div className="space-y-0 w-full md:w-1/2 relative">
                        <PhoneField
                            placeholder={t("labelPhone")}
                            value={formData.telefone}
                            name="phone"
                            onChange={handlePhoneChange}
                            className="!py-[22px]"
                        />
                        {/* Input camuflado (não hidden) para ativar validação nativa */}
                        <input
                            type="text"
                            name="phone"
                            value={formData.telefone}
                            required
                            onChange={() => { }}
                            className="absolute opacity-0 h-[1px] w-full pointer-events-none top-[90%]"
                            tabIndex={-1}
                        />

                    </div>
                    <div className="space-y-2 w-full md:w-1/2">
                        <Input
                            type="text"
                            name="nome_da_empresa"
                            value={formData.nome_da_empresa}
                            onChange={handleInputChange}
                            placeholder={t('labelCompany')}
                            required
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2">
                    <div className="space-y-2 w-full md:w-1/2">
                        <select required name="senioridade" onChange={handleSelectChange} id="" className="border cursor-pointer w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500">
                            <option disabled selected value="" >{t('labelPosition')}</option>
                            <option value="8396">{t('ceo_clevel')}</option>
                            <option value="8392">{t('director')}</option>
                            <option value="8390">{t('manager')}</option>
                            <option value="28170">{t('coordinator_supervisor')}</option>
                            <option value="8388">{t('analyst_specialist')}</option>
                            <option value="28168">{t('engineer_individual_contributor')}</option>
                            <option value="8386">{t('assistant')}</option>
                            <option value="8382">{t('student_teacher')}</option>
                            <option value="28172">{t('consultant')}</option>
                        </select>
                    </div>
                    <div className="space-y-2 w-full md:w-1/2">
                        <select required name="departamento" onChange={handleSelectChange} id="" className="border cursor-pointer w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500">
                            <option disabled selected value="">{t('labelDepartament')}</option>
                            {departmentsOptions?.map((departament, index) => (
                                <option key={index} value={departmentsOptionsEnglish![index].value}>
                                    {departament.title}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2 ">
                    <div className="space-y-2 w-full md:w-1/2">
                        <select required name="segmento" onChange={handleSelectChange} id="" className="border cursor-pointer w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500">
                            <option disabled selected value="">{t('labelIndustrie')}</option>
                            <option value="100000001">{t_industrie('aerospaceDefense')}</option>
                            <option value="100000004">{t_industrie('agribusiness')}</option>
                            <option value="200003">{t_industrie('automotive')}</option>
                            <option value="200016">{t_industrie('cheminicals')}</option>
                            <option value="200002">{t_industrie('architecture')}</option>
                            <option value="100000006">{t_industrie('consumer')}</option>
                            <option value="200015">{t_industrie('education')}</option>
                            <option value="200004">{t_industrie('energy')}</option>
                            <option value="200010">{t_industrie('financial')}</option>
                            <option value="200001">{t_industrie('foodBbeverages')}</option>
                            <option value="200007">{t_industrie('healthCare')}</option>
                            <option value="28310">{t_industrie('oil_gas')}</option>
                            <option value="200005">{t_industrie('phamaceuticalsBiotechnology')}</option>
                            <option value="200008">{t_industrie('manufacture')}</option>
                            <option value="200009">{t_industrie('miningMetals')}</option>
                            <option value="28312">{t_industrie('medical')}</option>
                            <option value="200011">{t_industrie('publicSector')}</option>
                            <option value="200014">{t_industrie('retail')}</option>
                            <option value="200020">{t_industrie('servicesConsulting')}</option>
                            <option value="200012">{t_industrie('highTech')}</option>
                            <option value="200013">{t_industrie('transpotion')}</option>
                            <option value="100000005">{t('others')}</option>

                        </select>
                    </div>
                    <div className="space-y-2 w-full md:w-1/2">
                        <select required name="pais" onChange={handleSelectChange} id="" className="border cursor-pointer w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500">
                            <option disabled selected value="">{t('labelCountrie')}</option>
                            {countryOptions?.map((country, index) => (
                                <option key={index} value={countryOptionsEnglish![index].title}>
                                    {country.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <select required name="qtd_funcionarios" onChange={handleSelectChange} id="" className="border cursor-pointer w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500">
                        <option disabled selected value="">{t('labelEmployess')}</option>
                        <option value="1">{t('0To10')}</option>
                        <option value="2">{t('11To49')}</option>
                        <option value="100000000">{t('50To149')}</option>
                        <option value="3">{t('150To499')}</option>
                        <option value="4">{t('500To999')}</option>
                        <option value="5">{t('more1000')}</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <select required name="tempo_de_compra" onChange={handleSelectChange} id="" className="border cursor-pointer w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500">
                        <option disabled selected value="">{t('labelImplementation')}</option>
                        <option value="1">{t('immediately')}</option>
                        <option value="2">{t('1To3Months')}</option>
                        <option value="3">{t('4To6Months')}</option>
                        <option value="4">{t('7To12Months')}</option>
                        <option value="5">{t('12Months')}</option>
                        <option value="6">{t('justResearching')}</option>
                    </select>
                </div>
                <div className="flex gap-x-2">
                    <input type="checkbox" required name="privacy_policy" />
                    <p className="text-xs text-neutral-600">{t("accept_privacy_policy")}
                        <a href="https://www.softexpert.com/en/information-security-policy/" target="_blank" rel="noopener noreferrer" className="underline text-black ml-[4px]">
                            {t("privacy_policy")}
                        </a>
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    type="submit"
                    className="plus-jakarta-sans w-full sm:w-fit grid place-items-center cursor-pointer rounded-xl p-3 text-sm md:text-base text-white font-semibold transition-colors bg-coreBlue500 hover:bg-coreBlue800"
                    disabled={isLoading}
                >
                    {isLoading ? <svg className="text-white animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="opacity-25" d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3Z"></path>
                        <path stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="bg-white opacity-75" d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"></path>
                    </svg> : t('send')}
                </button>
            </div>
            {isSubmitted && <div className="w-full border-green-700 border bg-green-100 rounded-xl p-3 text-green-700 font-medium text-sm">
                {t('successMessage')}
            </div>}
        </form>
    );
};

export default BookDemoForm;
