export const isEmptyObject = (object) => {
  return (
    object === undefined || object === null || Object.keys(object).length === 0
  );
};

export const isEmptyArray = (value) => {
  return value === undefined || value === null || value.length === 0;
};

export const isEmptyString = (value) => {
  return value === undefined || value === null;
};
