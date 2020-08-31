export const EnumToArrayTransformer = type => {
  if (!type) {
    return;
  }
  console.log(type);
  const map: { value: string; key: string }[] = [];

  for (const n in type) {
    if (typeof type[n] === 'string') {
      map.push({ value: type[n] as string, key: n });
    }
  }

  return map;
};
