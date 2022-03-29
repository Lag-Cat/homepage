export const getElementByClassName = (className: string, position?: number) => {
  let elements = document.getElementsByClassName(className);
  if (elements && elements.length > 0) {
    return elements[position || 0];
  }
  return null;
};
