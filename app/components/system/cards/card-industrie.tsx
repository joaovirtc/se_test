import Link from "next/link";
import Image from "next/image";

import { RiArrowRightSLine } from "@remixicon/react";
import { Tooltip } from "@/app/components/system/tooltip";


const bgColorMap: { [key: string]: string } = {
    'red': 'bg-red-500/5',
    'blue': 'bg-blue-500/5',
    'green': 'bg-teal-500/5',
    'yellow': 'bg-yellow-500/5',
    'orange': 'bg-orange-600/5',
    'rose': 'bg-fuchsia-500/5',
    'sky': 'bg-sky-500/5',
    // Cores solidas
    'redSolid': 'bg-red-700',
    'blueSolid': 'bg-blue-500',
    'greenSolid': 'bg-teal-500',
    'yellowSolid': 'bg-yellow-500',
    'orangeSolid': 'bg-orange-600',
    'roseSolid': 'bg-fuchsia-500',
    'skySolid': 'bg-sky-500',

};

const colorMap: { [key: string]: string } = {
    'redSolid': 'text-red-700',
    'blueSolid': 'text-blue-500',
    'greenSolid': 'text-teal-500',
    'yellowSolid': 'text-yellow-500',
    'orangeSolid': 'text-orange-600',
    'roseSolid': 'text-fuchsia-500',
    'skySolid': 'text-sky-500',
};

interface CardIndutrieProps {
    link: string;
    label: string;
    color: string;
    bgColor: string;
    bgColorSolid: string;
    icon?: any;
    labelLink: string
    className?: string
}

export default function CardIndustrie({ link, label, color, bgColor, bgColorSolid, icon, labelLink = "More info", className }: CardIndutrieProps) {
    const bgColorClass ='bg-expertHorizon100';
    const bgColorClassSolid = 'bg-expertHorizon500';
    const colorClass = 'text-expertHorizon500';

    return (
        <Link href={link} target="_blank" referrerPolicy="no-referrer">
                <div className={`w-full h-full p-2 3xl:p-3 rounded-xl gap-y-1 flex flex-col justify-between border border-transparent ${bgColorClass} ${className} hover:border hover:border-expertHorizon500`}>
                    <div className="flex gap-x-2">
                        <div className={`hidden md:grid place-items-center rounded-lg w-9 h-9 shrink-0 ${bgColorClassSolid} text-white`}>
                            <Image src={icon} alt={label} sizes="100%" className="brightness-0 invert" />
                        </div>
                        <div className="flex w-fit gap-x-2 items-center">
                            <h2 title={label} className={`text-base ${colorClass} font-semibold`}>{label}</h2>
                            <RiArrowRightSLine size={14} className={`${colorClass}`}/>
                        </div>
                    </div>
                </div>
        </Link>
    )
}