import { createClient } from "@supabase/supabase-js";

function readClientEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase não configurado. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.");
  return { url, key };
}

let instance: ReturnType<typeof createClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop, receiver) {
    if (!instance) {
      const { url, key } = readClientEnv();
      instance = createClient(url, key, {
        auth: {
          storage: typeof window !== "undefined" ? localStorage : undefined,
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
    return Reflect.get(instance, prop, receiver);
  },
});
