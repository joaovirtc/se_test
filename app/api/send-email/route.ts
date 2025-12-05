import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const EMAIL_WEBHOOK = "https://api-na1.hubapi.com/automation/v4/webhook-triggers/46246120/cnCzhf1";

    const response = await fetch( EMAIL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: formData.email,
            nome: formData.nome,
        }),
    });
    
    if (!response.ok) {
        const text = await response.text();
        console.error('Erro ao enviar para Hubspot:', text);
        return NextResponse.json(
            { message: 'Erro ao enviar para Hubspot', error: text },
            { status: response.status }
        );
    }

    return NextResponse.json({ message: 'Dados enviados com sucesso!' });
  } catch (error) {
        console.error('Erro interno ao enviar para Hubspot:', error);
        return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}