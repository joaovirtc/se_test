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
    const bgColorClass = bgColorMap[bgColor] || 'bg-blue-500';
    const bgColorClassSolid = bgColorMap[bgColorSolid] || 'bg-blue-500';
    const colorClass = colorMap[color] || 'text-white';

    return (
        <Link href={link} target="_blank" referrerPolicy="no-referrer">
                <div className={`w-full h-full p-4 rounded-xl gap-y-1 flex flex-col justify-between ${bgColorClass} ${className}`}>
                    <div className="">
                        <div className={`hidden md:grid place-items-center rounded-lg w-9 h-9 ${bgColorClassSolid} text-white`}>
                            <Image src={icon} alt={label} sizes="100%" className="brightness-0 invert" />
                        </div>
                    <div className="flex gap-x-2 items-center sm:mt-2">
                            <h2 title={label} className={`text-sm ${colorClass} font-semibold`}>{label}</h2>
                            <RiArrowRightSLine size={14} className={`${colorClass}`}/>
                        </div>
                    </div>
                    {/* <p className=" hidden 2xl:flex w-fit font-normal text-xs md:text-sm flex items-center justify-center hover:underline">
                        {labelLink} <RiArrowRightSLine size={14} />
                    </p> */}
                </div>
        </Link>
    )
}