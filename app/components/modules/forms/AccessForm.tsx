'use client'

import { useState, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { setCookie } from 'cookies-next';
import { COOKIE_KEYS } from "@/app/constants/cookies";
import { RiExternalLinkLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

const TOKEN_USD24K = process.env.NEXT_PUBLIC_FULL_ACCESS_TOKEN_USD24K;

const AccessForm = () => {
    const [formData, setFormData] = useState({ token: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const router = useRouter();
    const locale = useLocale();

    const t = useTranslations('otherTranslations');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage(false);

        try {
            if (formData.token === TOKEN_USD24K) {
                setCookie(COOKIE_KEYS.AUTH, 'true', {
                    httpOnly: false,
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 4 * 30 * 24 * 60 * 60,  // 4 months
                });
                setCookie(COOKIE_KEYS.VERSION, "false", {
                    httpOnly: false,
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 4 * 30 * 24 * 60 * 60,  // 4 months
                });
                
                setSuccessMessage(true);
                setTimeout(() => {
                    router.refresh();
                }, 1500);
            } else {
                setErrorMessage('Invalid token');
            }
        } catch (error) {
            setErrorMessage('Error validating token, try again later');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mt-2 space-y-4">
            <p className="text-neutral-500 text-sm flex items-center gap-1">
                {t('fill_token')} 
                <a 
                    className="flex gap-1 items-center text-coreBlue500 cursor-pointer font-semibold hover:underline" 
                    href="https://sesuite.softexpert.com/softexpert/workspace?page=dashboard,8a6e952899e22fe10199e244d33b02b8,8a6e952899e22fe10199e244d3fb02bc&taskCenter=false" target="_blank" rel="noopener noreferrer">
                    {t('portal')} <RiExternalLinkLine size={18} className="text-coreBlue500" />
                </a>
            </p>
            <div>
                <input
                    type="text"
                    name="token"
                    value={formData.token}
                    onChange={handleInputChange}
                    className="border w-full outline-hidden border-slate-300 rounded-xl p-3 text-sm md:text-base font-normal transition-colors hover:border-blue-200 focus:border-coreBlue500"
                    placeholder=""
                    required
                    autoComplete="off"
                />
                {errorMessage &&
                    <div className="w-full mt-3 pl-1 text-red-500 font-medium text-sm">
                        {errorMessage}
                    </div>
                }
                {successMessage &&
                    <div className="w-full mt-3 border-green-700 border bg-green-100 rounded-xl p-3 text-green-700 font-medium text-sm">
                        {t('validade_token')}
                    </div>
                }
            </div>
            <div className="w-full flex justify-end">
                <button
                    type="submit"
                    className={`${isLoading ? "disabled:cursor-not-allowed disabled:opacity-70" : "cursor-pointer"} plus-jakarta-sans grid place-items-center rounded-xl p-3 text-sm md:text-base text-white font-semibold transition-colors bg-coreBlue500 hover:bg-coreBlue700`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="text-white animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                            <path stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="opacity-25" d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3Z"></path>
                            <path stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="bg-white opacity-75" d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"></path>
                        </svg>
                    ) : (
                        t("label_token")
                    )}
                </button>
            </div>
        </form>
    );
};

export default AccessForm;