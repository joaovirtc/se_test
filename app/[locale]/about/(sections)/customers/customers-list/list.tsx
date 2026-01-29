import { Case } from '@/app/types/case';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface CustomerListProps {
  customers: Case[];
}

export default function CustomerList({ customers }: CustomerListProps) {
  const locale = useLocale();

  return (
    <ul
      className={`w-full mt-0 md:mt-2 h-fit overflow-y-auto grid grid-cols-3 place-items-stretch md:grid-cols-4 lg:grid-cols-5 gap-0 md:gap-4`}
    >
      {customers.map((customer) => {
        const fileUrl = customer.attributes.file?.data?.attributes?.url;
        const isDemoOnly = customer.attributes.show_in_demo_only === true;
        const linkUrl = isDemoOnly
          ? "#" 
          : fileUrl
            ? fileUrl
            : `https://softexpert.com/${locale}/success-cases/${customer.attributes.slug || "#"}`;

        return (
          <li
            key={customer.id}
            className="flex items-center justify-center h-full"
          >
            <Link
              target="_blank"
              href={linkUrl}
              referrerPolicy="no-referrer"
              className={`${isDemoOnly ? "cursor-default" : "" }`}
              onClick={(e) => {
                if (isDemoOnly) {
                  e.preventDefault();
                }
              }}
            >
              {customer.attributes.icon?.data?.attributes?.url ? (
                <Image
                  src={customer.attributes.icon.data.attributes.url}
                  alt={customer.attributes.title}
                  width={100}
                  height={100}
                  loading="eager"
                  className="w-[90px] 2xl:w-[120px] h-[87px] object-contain grayscale brightness-0"
                />
              ) : (
                <h3 className="text-coreBlue500 text-center plus-jakarta-sans text-sm md:text-lg font-semibold">
                  {customer.attributes.title}
                </h3>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
