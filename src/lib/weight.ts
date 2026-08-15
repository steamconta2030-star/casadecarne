export type SaleUnit = "un" | "kg";

export function normalizeWeightKg(value: number): number {
  if (!Number.isFinite(value) || value <= 0) throw new Error("Peso inválido");
  return Math.round(value * 1000) / 1000;
}

export function calculateLineTotal(unit: SaleUnit, quantity: number, unitPrice: number): number {
  const normalizedQuantity = unit === "kg" ? normalizeWeightKg(quantity) : Math.max(1, Math.trunc(quantity));
  return Math.round(normalizedQuantity * unitPrice * 100) / 100;
}

export function formatQuantity(unit: SaleUnit, quantity: number): string {
  return unit === "kg"
    ? `${normalizeWeightKg(quantity).toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} kg`
    : `${Math.trunc(quantity)} un`;
}
