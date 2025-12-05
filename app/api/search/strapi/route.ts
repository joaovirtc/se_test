
import { NextResponse } from "next/server";
import { Solution } from "@/app/types/solution";
import { Industry } from "@/app/types/industry";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("s") || "";
  const locale = searchParams.get("locale") || "en";
  const STRAPI_API = process.env.STRAPI_API;

  if (!query) {
    return NextResponse.json(
      { error: "O parâmetro 'query' é obrigatório." },
      { status: 400 }
    );
  }
  
  if (!locale) {
    return NextResponse.json(
      { error: "O parâmetro 'locale' é obrigatório." },
      { status: 400 }
    );
  }

 
  const productQuery = new URLSearchParams({
    locale,
    "pagination[page]": "1",
    "pagination[pageSize]": "300",
    "fields[0]": "title",
    "fields[1]": "banner_desc",
    "fields[2]": "slug",
    "fields[3]" : "subtitle",
    "filters[$or][0][title][$containsi]": query,
    // "filters[$or][1][banner_desc][$containsi]": query,
    "filters[$or][2][subtitle][$containsi]": query,
    "filters[$or][3][sections_demo][title][$containsi]": query,
    "filters[$or][4][sections_demo][artifacts][title][$containsi]": query,
    "populate[sections_demo][fields][0]": "title",
    "populate[sections_demo][fields][1]": "slug",
    "populate[sections_demo][fields][2]": "show_in_demo_light",
    "populate[sections_demo][populate][artifacts][fields][0]": "id",
    "populate[sections_demo][populate][artifacts][fields][1]": "title",
  });

  const industryQuery = new URLSearchParams({
    locale,
    "pagination[page]": "1",
    "pagination[pageSize]": "300",
    "fields[0]": "title",
    "fields[1]": "banner_desc",
    "fields[2]": "slug",
    "fields[3]" : "description",
    "filters[$or][0][title][$containsi]": query,
    "filters[$or][1][banner_desc][$containsi]": query,
    "filters[$or][2][description][$containsi]": query,
    "filters[$or][3][sections_demo][title][$containsi]": query,
    "filters[$or][4][sections_demo][artifacts][title][$containsi]": query,
    "populate[sections_demo][fields][0]": "title",
    "populate[sections_demo][fields][1]": "slug",
    "populate[sections_demo][fields][2]": "show_in_demo_light",
    "populate[sections_demo][populate][artifacts][fields][0]": "id",
    "populate[sections_demo][populate][artifacts][fields][1]": "title",
  });

  try {
    const [productsRes, industriesRes] = await Promise.all([
      fetch(`${STRAPI_API}/produtos?${productQuery.toString()}`, {
        next: { revalidate: 60 },
      }),
      fetch(`${STRAPI_API}/industries?${industryQuery.toString()}`, {
        next: { revalidate: 60 },
      }),
    ]);

    if (!productsRes.ok) {
      console.error("Erro ao buscar produtos:", await productsRes.text());
      throw new Error("Erro ao buscar produtos.");
    }

    if (!industriesRes.ok) {
      console.error("Erro ao buscar indústrias:", await industriesRes.text());
      throw new Error("Erro ao buscar indústrias.");
    }

    const products: { data: Solution[] } = await productsRes.json();
    const industries: { data: Industry[] } = await industriesRes.json();

    return NextResponse.json({ products, industries });
  } catch (error) {
    console.error("Erro na busca:", error);
    return new Response("Erro ao buscar dados no Strapi", { status: 500 });
  }
}
