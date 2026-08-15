// Configuração TanStack Start herdada da base DistribuIA.
// O pacote @lovable.dev/vite-tanstack-config já inclui React, Tailwind,
// TanStack Start, aliases e configuração Nitro.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
