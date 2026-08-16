export type DemoProduct = { id: string; name: string; category: string; price: number; unit: "kg" | "un"; emoji: string };

export const demoProducts: DemoProduct[] = [
  { id: "1", name: "Picanha Bovina", category: "Carnes bovinas", price: 69.9, unit: "kg", emoji: "🥩" },
  { id: "2", name: "Contra-filé", category: "Carnes bovinas", price: 44.9, unit: "kg", emoji: "🥩" },
  { id: "3", name: "Patinho", category: "Carnes bovinas", price: 39.9, unit: "kg", emoji: "🥩" },
  { id: "4", name: "Linguiça artesanal", category: "Linguiças", price: 24.9, unit: "kg", emoji: "🌭" },
  { id: "5", name: "Coxa e sobrecoxa", category: "Aves", price: 13.9, unit: "kg", emoji: "🍗" },
  { id: "6", name: "Carvão 3 kg", category: "Churrasco", price: 18.9, unit: "un", emoji: "🔥" },
];
