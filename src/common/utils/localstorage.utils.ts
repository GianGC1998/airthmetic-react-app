export const getItem = <T>(key: string, initialValue: T) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item).value as T) : initialValue;
  } catch (error) {
    return initialValue;
  }
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
export const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ value }));
};
