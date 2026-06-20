# Pesquisa com Caminhoneiros

Pagina simples para coletar respostas de caminhoneiros sobre calculadora de frete, custos, diesel e recebimento de fretes.

## Arquivos

- `index.html`: pagina da pesquisa
- `styles.css`: visual da pesquisa
- `app.js`: perguntas, navegacao e envio para o Supabase
- `supabase.sql`: tabela e seguranca no Supabase

## Configurar Supabase

1. Crie um projeto no Supabase.
2. Abra `SQL Editor`.
3. Cole e execute o conteudo de `supabase.sql`.
4. Copie:
   - Project URL
   - anon/public key
5. Abra `app.js` e preencha:

```js
const SUPABASE_URL = "https://seu-projeto.supabase.co";
const SUPABASE_ANON_KEY = "sua-chave-anon";
```

## Publicar na Vercel

Pode subir a pasta `PesquisaCaminhoneiros` para um repositorio novo no GitHub e importar na Vercel.

Configuracao:

```txt
Framework Preset: Other
Root Directory: ./
Build Command: vazio
Output Directory: vazio
```

## Teste local

Abrir `index.html` no navegador ja funciona para ver a tela.
Para salvar no banco, precisa configurar Supabase em `app.js`.

Se o Supabase nao estiver configurado, a pagina salva a resposta no navegador apenas como fallback de teste local.
