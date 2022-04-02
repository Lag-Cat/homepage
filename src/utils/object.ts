const equals = (value: Object, diffValue: Object) => {
  const valueName = Object.getOwnPropertyNames(value);
  const diffValueName = Object.getOwnPropertyNames(diffValue);
  console.log(1);
  if (valueName.length !== diffValueName.length) return false;
  for (let i = 0, j = valueName.length; i < j; i++) {
    let item = valueName[i];
    if (!(item in diffValue)) return false;
    if (
      typeof (value as any)[item] !== 'object' &&
      typeof (diffValue as any)[item] !== 'object'
    ) {
      if ((value as any)[item] !== (diffValue as any)[item]) return false;
    } else if (
      typeof (value as any)[item] === 'object' &&
      typeof (diffValue as any)[item] === 'object'
    ) {
      if (!equals((value as any)[item], (diffValue as any)[item])) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

export default { equals };
