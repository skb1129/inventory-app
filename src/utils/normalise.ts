export function normalise<T extends Record<string, S>, S>(data: T): S[] {
  return Object.keys(data).map(id => ({ ...data[id], id }));
}
