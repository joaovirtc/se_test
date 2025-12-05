'use client'

import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "../tooltip";
import { motion } from "framer-motion";

interface Props {
  slug: string;
  acronym: string;
  name: string;
  icon?:any;
}

export default function Hexagon({ slug, acronym, name, icon }: Props) {

  return (
    <Link href={`our-products/${slug}`} target="_blank" referrerPolicy="no-referrer">
      <Tooltip content={name}>
        <motion.div
          className="hexagon-container group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
        >
          <div className="vertical">
            {/* {icon} */}
            <Image 
              src={`${icon}`} 
              alt={`icon-${acronym}`} 
              width={70} height={70} 
              className="group-hover:invert filter group-hover:brightness-0 brightness-85"
              />

            <span>{acronym}</span>
          </div>
          <div className="horizontal"></div>
          <div className="diagonal"></div>
        </motion.div>
      </Tooltip>
    </Link>
  );
}
