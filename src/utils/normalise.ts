import { comparator } from "./comparator";

export function normalise<T extends Record<string, S>, S extends Record<string, any>>(data: T, sortKey?: string): S[] {
  const result: S[] = Object.keys(data).map((id) => ({ ...data[id], id }));
  if (sortKey) {
    result.sort(comparator<S>(sortKey));
  }
  return result;
}
