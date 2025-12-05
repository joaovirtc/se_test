import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { headers } from 'next/headers';

export default async function HomePage() {
  const locale = await getLocale();
  const headersList = await headers();

  const currentPath = headersList.get('x-invoke-path') || '/';
  const pathname = currentPath.split('?')[0]; // apenas path, sem query
  const queryString = currentPath.includes('?') ? '?' + currentPath.split('?')[1] : '';

  // 🚫 Redireciona "pt-br" para "pt-BR", sempre
  if (locale === 'pt-br') {
    const correctedPath = pathname.replace(/^\/pt-br/, '') || '';
    redirect(`/pt-BR${correctedPath}${queryString}`);
  }

  // 🔁 Redireciona para rota padronizada se estiver fora do padrão
  if (!pathname.startsWith(`/${locale}`)) {
    redirect(`/${locale}/about`);
  }

  // Redireciona para a rota inicial padrão
  redirect(`/${locale}/about`);
}
