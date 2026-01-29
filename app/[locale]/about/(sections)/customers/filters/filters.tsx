'use client';

import { CaseCategory } from '@/app/types/case';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { RiArrowUpSLine, RiFilter3Line, RiArrowDownSLine, RiCloseLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';

interface Props {
    categories: CaseCategory[];
    selectedSubcategories: number[];
    onChange: (newSelection: number[]) => void;
}

export default function SubcategoryFilter({ categories, selectedSubcategories, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState<number | null>(null); // Controla qual categoria está aberta
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleOpen = () => setIsOpen((prev) => !prev);
    const t = useTranslations('otherTranslations');

    const handleCheckboxChange = (subcategoryId: number) => {
        const isSelected = selectedSubcategories.includes(subcategoryId);
        const newSelection = isSelected
            ? selectedSubcategories.filter((id) => id !== subcategoryId)
            : [...selectedSubcategories, subcategoryId];
        onChange(newSelection);
    };

    const removeSubcategory = (subcategoryId: number) => {
        const newSelection = selectedSubcategories.filter((id) => id !== subcategoryId);
        onChange(newSelection);
    };

    const toggleCategory = (categoryId: number) => {
        setOpenCategory((prev) => (prev === categoryId ? null : categoryId)); // Alterna entre abrir/fechar a categoria
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setOpenCategory(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative mb-1 lg:mb-3 flex p-1 rounded-lg w-fit">

            {/* Dropdown de Categorias */}
            <AnimatePresence>
                <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 items-center flex-wrap"
                    ref={dropdownRef}
                >
                    {categories.map((category) => (
                        <div key={category.id} className="relative">
                            {/* Categoria como botão */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className={`rounded-lg flex items-center justify-between text-base cursor-pointer py-1 px-2 bg-white border hover:border-slate-600 
                                            ${openCategory === category.id ? "border-slate-600 text-black " : "text-neutral-500" } w-full`}
                            >
                                <span>{category.attributes.name}</span>
                                {openCategory === category.id ? (
                                    <RiArrowUpSLine size={20} color='#000'  />
                                ) : (
                                    <RiArrowDownSLine size={20} color='#757575' />
                                )}
                            </button>

                            {/* Dropdown de Subcategorias */}
                            <AnimatePresence>
                                {openCategory === category.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-20 p-1"
                                    >
                                        {category.attributes.subcategories.data.map((subcategory) => (
                                            <label
                                                key={subcategory.id}
                                                className={`flex items-center text-xs hover:bg-gray-100 p-1 rounded-lg cursor-pointer`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mr-2 accent-coreBlue500"
                                                    checked={selectedSubcategories.includes(subcategory.id)}
                                                    onChange={() => handleCheckboxChange(subcategory.id)}
                                                />
                                                {subcategory.attributes.name}
                                            </label>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    ))}

                    {/* Tags de Subcategorias Selecionadas */}
                    <div className="flex flex-wrap gap-2">
                        {selectedSubcategories.map((subcategoryId) => {
                            const subcategory = categories
                                .flatMap((category) => category.attributes.subcategories.data)
                                .find((sub) => sub.id === subcategoryId);

                            return (
                                subcategory && (
                                    <div
                                        key={subcategory.id}
                                        className="flex items-center gap-2 bg-blue-50/40 border border-coreBlue500 text-coreBlue500 plus-jakarta-sans text-xs md:text-sm py-1 px-2 rounded-full"
                                    >
                                        <button
                                            onClick={() => removeSubcategory(subcategory.id)}
                                            className="text-neutral-900 cursor-pointer"
                                        >
                                            <RiCloseLine size={16} />
                                        </button>
                                        <span>{subcategory.attributes.name}</span>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </motion.div>

            </AnimatePresence>
        </div>
    );
}