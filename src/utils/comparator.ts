export function comparator<T extends Record<string, never>>(key: string, reverse?: boolean): (a: T, b: T) => number {
  return (a: T, b: T) => {
    if (a[key] < b[key]) return reverse ? 1 : -1;
    else if (a[key] > b[key]) return reverse ? -1 : 1;
    else return 0;
  };
}
