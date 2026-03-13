export function random(seed: string, min: number, max: number) {
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = (hash * 16777619) >>> 0; // FNV prime, keep uint32
  }
  return min + (hash % (max - min + 1));
}
