export const getSizeByScale = (
  scaleHeight: number,
  scaleWidth: number,
  height?: number,
  width?: number,
) => {
  if (height) {
    return (height / scaleHeight) * scaleWidth;
  } else if (width) {
    return (width / scaleWidth) * scaleHeight;
  } else {
    return 0;
  }
};
