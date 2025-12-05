import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NotFoundArtifacts = () => {
    const t = useTranslations("otherTranslations");

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] gap-2">
            <h1 className="text-6xl font-bold text-black mb-4 tracking-tighter">
                {t('titleNotFoundArtifact')}
            </h1>
            <p className="text-gray-500 mb-4">
                {t('descNotFoundArtifact')}
            </p>
            <Link href={`./`}>
                <span className="rounded-lg px-4 py-2 bg-blue-500 text-white text-sm md:text-base font-medium transition-colors hover:bg-blue-900 flex items-center justify-center">
                    {t('labelNotFound')}
                </span>
            </Link>
        </div>
    );
};

export default NotFoundArtifacts;