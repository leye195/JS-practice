const local = localStorage;

export const getItems = (key, defaultValue) => {
  try {
    const value = local.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const saveItem = (key, value) => {
  try {
    local.setItem(key, JSON.stringify(value));
  } catch (e) {
    return;
  }
};

export const removeItem = (key) => {
  try {
    local.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const convertFormat = (number) =>
  new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
    number
  );
