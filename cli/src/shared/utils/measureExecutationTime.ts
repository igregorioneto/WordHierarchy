export function measureExecutationTime(fn: () => void): number {
  const start = process.hrtime();
  fn();
  const end = process.hrtime(start);
  return end[0] * 1e3 + end[1] / 1e6; // tempo em milissegundos
}