import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useEffect, useState } from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder: string;
    name: string;
    error?: string;
    touched?: boolean;
    onBlur?: VoidFunction;
}

const PhoneField = ({
    value,
    onChange,
    className = '',
    placeholder,
    error,
    touched,
    onBlur,
}: Props) => {
    const hasError = touched && error;
    const [defaultCountry, setDefaultCountry] = useState<string>('');

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch('https://adm-site.softexpert.com/api/geoloc/');
                const data = await response.json();
                const isoCode = data?.country.iso_code.toLowerCase();
                if (data && isoCode) {
                    setDefaultCountry(isoCode);
                }
            } catch (error) {
                console.error('Error detect country in field phone', error);
            }
        };

        fetchCountry();
    }, []);

    return (
        <PhoneInput
            country={defaultCountry || "br"}
            enableSearch={true}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            inputClass={`!w-full !pl-12 font-open_sans !text-sm !text-primary-primary-950 !outline-none border-[1.5px] !rounded-xl transition-colors 
                            ${hasError ? 'error-phone-input' : ''} ${className}`}
            containerClass="w-full"
            searchClass="!p-2 !text-sm"
        />

    );
};

export default PhoneField;