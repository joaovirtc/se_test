import Link from "next/link";
import Image from "next/image";

import { RiArrowRightSLine } from "@remixicon/react";


interface CardBigNumberProps {
    number : string,
    label : string,
}

export default function CardIndustrie ({number, label} : CardBigNumberProps) {

    return (
        <>
            <div className="w-full rounded-lg py-3 lg:py-5 2xl:py-7 grid place-items-center gap-0 2xl:gap-2 border border-blue-500/30 ">
                <h2 className="text-[22px] xl:text-3xl text-coreBlue500 font-medium text-center">{number}</h2>
                <span className="text-sm md:text-base text-gray-500 text-center">{label}</span>
            </div>
        </>
    )
}