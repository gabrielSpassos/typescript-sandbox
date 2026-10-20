export type Operation = 'add' | 'subtract';

export function parseNumber(value: string): number | null {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function calculate(first: number, second: number, operation: Operation): number {
  return operation === 'add' ? first + second : first - second;
}
