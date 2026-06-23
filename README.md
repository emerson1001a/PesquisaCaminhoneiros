# Pesquisa com Caminhoneiros

Pagina simples para coletar respostas de caminhoneiros sobre calculadora de frete, custos, diesel e recebimento de fretes.

## Arquivos

- `index.html`: pagina da pesquisa
- `admin.html`: painel simples para acompanhar respostas
- `styles.css`: visual da pesquisa
- `app.js`: perguntas, navegacao e envio para o Supabase
- `admin.js`: listagem, busca e exportacao CSV do painel
- `supabase.sql`: tabela e seguranca no Supabase

## Configurar Supabase

1. Crie um projeto no Supabase.
2. Abra `SQL Editor`.
3. Cole e execute o conteudo de `supabase.sql`.
4. Copie o `Project URL`.
5. Copie uma chave para a Vercel:
   - preferencial: `service_role`, por ficar apenas no servidor da Vercel
   - alternativa: `anon/public`

## Publicar na Vercel

Pode subir a pasta `PesquisaCaminhoneiros` para um repositorio novo no GitHub e importar na Vercel.

Configuracao:

```txt
Framework Preset: Other
Root Directory: ./
Build Command: vazio
Output Directory: vazio
```

Variaveis de ambiente na Vercel:

```txt
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ADMIN_TOKEN=uma-senha-forte-para-o-painel
```

Para o envio publico da pesquisa, se nao usar `service_role`, configure:

```txt
SUPABASE_ANON_KEY=sua-chave-anon-ou-publishable
```

O painel `/admin.html` precisa de `SUPABASE_SERVICE_ROLE_KEY`, porque a leitura publica das respostas fica bloqueada no Supabase.

## Teste local

Abrir `index.html` no navegador ja funciona para ver a tela.
Para salvar no banco, publique na Vercel e configure as variaveis de ambiente.
