"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useData } from "@/app/api/context/languageSelectorAPI";

export default function UpdateLocalizationsData({ data, path, catSlug }) {
  const { setData, setPath, setcatSlug } = useData();
  const routepathname = usePathname();

  useEffect(() => {
    setData(data);
    setPath(path || routepathname);
    setcatSlug(catSlug);
    
  }, [data, path, catSlug, routepathname, setData, setPath, setcatSlug]);

  return null;
}
