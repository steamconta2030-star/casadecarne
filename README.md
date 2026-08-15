# Casa de Carne

Aplicação white-label de delivery e gestão para açougues e pequenos mercados, derivada da arquitetura do DistribuIA.

## Estratégia

- Projeto independente do repositório `DistribuIa`.
- O DistribuIA é usado apenas como referência/base de código.
- Alterações feitas aqui não modificam o projeto original.
- Credenciais e arquivos `.env` do projeto-base não são copiados.

## Primeira fase

Implementar venda por peso usando `unit === "kg"` como regra, sem migration desnecessária:

- catálogo público com peso estimado e quantidades decimais;
- PDV com entrada de peso real;
- preço exibido por kg;
- aviso de peso aproximado no pedido;
- backend mantendo validação e cálculo server-side;
- preparação para uma fase posterior de confirmação do peso real antes do despacho.

## Origem técnica

Base arquitetural: TanStack Start + React + TypeScript + Supabase, seguindo os módulos já validados no DistribuIA.
