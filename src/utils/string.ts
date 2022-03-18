export const isNullOrEmpty = (val: string | undefined | null) => {
  if (val === undefined || val === null || !val) return true;
  return false;
};
