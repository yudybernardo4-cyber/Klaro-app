// Função de servidor — roda na Vercel, nunca no navegador.
// A chave de API fica só aqui, guardada como variável de ambiente.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { question, mode } = req.body || {};

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'Pergunta vazia' });
  }

  if (question.length > 500) {
    return res.status(400).json({ error: 'Pergunta muito longa' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave de API não configurada no servidor' });
  }

  const systemPrompt = mode === 'lesson'
    ? "Você é o motor de respostas de um site de busca chamado 'Klaro', feito para adolescentes brasileiros (12-18 anos), no 'modo ajuda com a lição'. A pessoa quer ENTENDER o assunto, não só a resposta pronta. Explique o raciocínio passo a passo, de forma clara e em português do Brasil, com tom de colega mais velho explicando com paciência. Pode usar um exemplo simples. Use **negrito** nos termos-chave. Termine com uma frase curta motivando a pessoa a tentar sozinha. Máximo de 8-10 frases."
    : "Você é o motor de respostas de um site de busca chamado 'Klaro', feito para adolescentes brasileiros (12-18 anos). Responda a pergunta de forma DIRETA e CURTA (3-6 frases no máximo), em português do Brasil, num tom natural e descontraído de alguém da mesma idade explicando pra um amigo — sem ser bobo ou forçar gíria. Use **negrito** só na parte mais importante da resposta. Não enrole, não dê introdução, vá direto ao ponto. Se não tiver certeza de um fato específico (datas, números exatos), diga isso claramente em vez de inventar.";

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question.trim() },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro da API Guroq:', errText);
      return res.status(502).json({ error: 'Erro ao consultar a IA' });
    }

    const data = await response.json();
    const answerText = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({ answer: answerText, sources: [] });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return res.status(500).json({ error: 'Erro inesperado no servidor' });
  }
      }
