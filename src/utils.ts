export const removeUndefined = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

export const when = (value: any, trueValue?: string, falseValue?: string) => {
  if (trueValue && value === true) return trueValue;
  if (falseValue && value === false) return falseValue;
  return value;
};

export const match = (...values: any[]) => {
  for (let value of values) {
    if (value !== undefined) return value;
  }
};
