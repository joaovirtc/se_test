import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const locale = searchParams.get("locale");

    if (!url) {
        return new Response("URL não informada", { status: 400 });
    }

    const s3Response = await fetch(url);

    if (!s3Response.ok || !s3Response.body) {
        return new Response("Erro ao buscar arquivo", { status: 502 });
    }

    return new Response(s3Response.body, {
        headers: {
            "Content-Type":
                s3Response.headers.get("Content-Type") || "application/zip",
            "Content-Disposition":
                s3Response.headers.get("Content-Disposition") ||
                `attachment; filename="demo-offline-${locale}.zip"`,
            "Content-Length": s3Response.headers.get("Content-Length") || "",
        },
    });
}
