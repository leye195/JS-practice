const local = localStorage;

export const debounce = (fn, delay) => {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

export const throttle = (fn, delay) => {
  let timer = null;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn();
      }, delay);
    }
  };
};

export const classNames = (...classnames) => {
  return classnames.join(" ");
};

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
