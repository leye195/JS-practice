export const checkIsObjectEqual = (x, y) => {
  const xProps = Object.getOwnPropertyNames(x);
  const yProps = Object.getOwnPropertyNames(y);

  if (xProps.length !== yProps.length) return false;

  for (let i = 0; i < xProps.length; i++) {
    const propName = xProps[i];
    if (
      !Array.isArray(x[propName]) &&
      !Array.isArray(y[propName]) &&
      x[propName] !== y[propName]
    )
      return false;

    if (
      Array.isArray(x[propName]) &&
      Array.isArray(y[propName]) &&
      x[propName].length !== y[propName].length
    )
      return false;
  }

  return true;
};
