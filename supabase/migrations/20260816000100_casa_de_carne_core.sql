create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  price numeric(12,2) not null check (price >= 0),
  sale_unit text not null default 'un' check (sale_unit in ('un','kg')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'open',
  customer_name text,
  total numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  sale_unit text not null check (sale_unit in ('un','kg')),
  quantity numeric(12,3) not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) generated always as (round(quantity * unit_price, 2)) stored,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_active on public.products(active);
create index if not exists idx_order_items_order_id on public.order_items(order_id);

comment on column public.products.sale_unit is 'un = unidade; kg = venda por peso';
comment on column public.order_items.quantity is 'Para kg aceita até 3 casas decimais, ex.: 0.350 = 350 g';
