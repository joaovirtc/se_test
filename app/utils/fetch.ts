import { notFound } from "next/navigation";
import qs from "qs";

type FetchDataParams = { [key: string]: any };

// cache simples em memória para deduplicar requisições repetidas em curto prazo
const cache = new Map<string, { data: any; timestamp: number }>();

async function fetchWithTimeout(url: string, options: RequestInit, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export default async function fetchData<T>(
  endpoint: string,
  locale?: string,
  additionalParams: FetchDataParams = {},
  returnFullResponse = false
): Promise<T> {
  const baseURL = process.env.STRAPI_API;
  if (!baseURL) {
    throw new Error("STRAPI_API is not defined in environment variables.");
  }

  const url = new URL(`${baseURL}/${endpoint}`);
  const query: FetchDataParams = { ...additionalParams };

  if (locale) query.locale = locale;
  url.search = qs.stringify(query, { encode: false });
  const urlKey = url.toString();

  // verifica cache de 30s
  const cached = cache.get(urlKey);
  if (cached && Date.now() - cached.timestamp < 30_000) {
    return cached.data;
  }

  // tenta 3 vezes com backoff exponencial
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetchWithTimeout(
        urlKey,
        { next: { revalidate: 100 } },
        5000
      );

      const textResponse = await response.text();
      const result = JSON.parse(textResponse);

      if (result?.error?.status === 404) {
        notFound();
      }

      const finalData = returnFullResponse ? result : result.data;

      // salva em cache para futuras chamadas próximas
      cache.set(urlKey, { data: finalData, timestamp: Date.now() });

      return finalData;
    } catch (err) {
      lastError = err;
      // espera um pouco antes de tentar novamente (backoff exponencial)
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }

  throw lastError;
}
