export function buildOrderBy<T>(sort: string | undefined, defaultOrder: T): T {
  if (!sort) return defaultOrder;

  const [field, direction] = sort.split("_");

  if (!field || !direction) return defaultOrder;

  return {
    [field]: direction,
  } as T;
}
