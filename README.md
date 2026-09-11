# Klaro — guia de deploy

Este projeto tem duas partes:
- `public/index.html` — o site que o usuário vê
- `api/ask.js` — o backend que guarda sua chave de API em segredo e fala com a IA

## Passo 1 — Pegar uma chave de API (Groq, gratuita)

1. Crie uma conta em https://console.groq.com
2. Vá em "API Keys" e clique em "Create API Key"
3. Copie a chave na hora — ela só aparece uma vez

## Passo 2 — Criar uma conta na Vercel

1. Acesse https://vercel.com e crie uma conta (pode entrar com GitHub)

## Passo 3 — Importar o projeto

1. Na Vercel, clique em "Add New Project" e importe o repositório `klaro-app`
2. Antes de finalizar, vá em "Environment Variables" e adicione:
   - Nome: `GROQ_API_KEY`
   - Valor: a chave que você pegou no passo 1
3. Clique em "Deploy"

## Passo 4 — Testar

A Vercel vai te dar uma URL tipo `klaro-app.vercel.app`. Abra e teste uma pergunta.

## Passo 5 — Domínio próprio (opcional)

1. Compre um domínio (Registro.br para `.com.br`, ou Namecheap/GoDaddy para `.com`)
2. No painel da Vercel: seu projeto → Settings → Domains → adicione o domínio
3. A Vercel mostra os registros DNS para configurar no site onde comprou o domínio

## Custos

- Vercel: grátis no plano hobby
- Groq: camada gratuita com limite de requisições por minuto
- Domínio: geralmente R$ 40–100/ano
