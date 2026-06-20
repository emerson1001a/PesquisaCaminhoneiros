create table if not exists public.respostas_pesquisa_caminhoneiros (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  origem text not null default 'link_publico',
  nome text,
  whatsapp text,
  comentario text,
  respostas jsonb not null
);

alter table public.respostas_pesquisa_caminhoneiros enable row level security;

drop policy if exists "Permitir envio publico da pesquisa" on public.respostas_pesquisa_caminhoneiros;
create policy "Permitir envio publico da pesquisa"
on public.respostas_pesquisa_caminhoneiros
for insert
to anon
with check (true);

drop policy if exists "Bloquear leitura publica da pesquisa" on public.respostas_pesquisa_caminhoneiros;
create policy "Bloquear leitura publica da pesquisa"
on public.respostas_pesquisa_caminhoneiros
for select
to anon
using (false);
