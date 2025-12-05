import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  const URL_WEBHOOK = 'https://api.hubapi.com/crm/v3/objects/contacts';
  const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

  try {
    let response = await fetch(URL_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
      },
      body: JSON.stringify({
        properties: {
          email: formData.email,
          firstname: formData.nome,
          company: formData.nome_da_empresa,
          soft_company_size: formData.qtd_funcionarios,
          hs_seniority: formData.senioridade,
          department: formData.departamento,
          soft_industry: formData.segmento,
          hs_country_region_code: formData.pais,
          origin_page: formData.origin_page,
          lead_source: '174',
          phone: formData.telefone,
          job_function: formData.senioridade,
          purchase_timeline: formData.tempo_de_compra,
          utm : formData.utm,
          bitrix: 'Não sincronizado',
          pagina_anterior_a_conversao : formData.pagina_anterior_a_conversao
        }
      })
    });

    if (response.status === 409) {
      // Conflito: o contato já existe, fazer uma requisição PATCH
      const contactId = await getContactIdByEmail(formData.email, HUBSPOT_TOKEN!);
      if (contactId) {
        response = await fetch(`${URL_WEBHOOK}/${contactId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
          },
          body: JSON.stringify({
            properties: {
              firstname: formData.nome,
              company: formData.nome_da_empresa,
              soft_company_size: formData.qtd_funcionarios,
              hs_seniority: formData.senioridade,
              department: formData.departamento,
              soft_industry: formData.segmento,
              hs_country_region_code: formData.pais,
              origin_page: formData.origin_page,
              lead_source: 174,
              phone: formData.telefone,
              job_function: formData.senioridade,
              purchase_timeline: formData.tempo_de_compra,
              utm : formData.utm,
              bitrix: 'Não sincronizado',
              pagina_anterior_a_conversao : formData.pagina_anterior_a_conversao
            }
          })
        });
      }
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('Erro ao enviar para Hubspot:', text);
      return NextResponse.json({ message: 'Erro ao enviar para Hubspot', error: text }, { status: response.status });
    }

    return NextResponse.json({ message: 'Dados enviados para o Hubspot com sucesso' });
  } catch (error) {
    console.error('Erro interno ao enviar para Hubspot:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

async function getContactIdByEmail(email: string, token: string): Promise<string | null> {
  const searchUrl = 'https://api.hubapi.com/crm/v3/objects/contacts/search';
  try {
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              }
            ]
          }
        ],
        properties: ['id'],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.results?.[0]?.id || null;
    } else {
      console.error('Erro ao buscar contato por email:', await response.text());
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar contato por email:', error);
    return null;
  }
}

export function GET() {
  return NextResponse.json({ message: "Método GET não permitido" }, { status: 405 });
}