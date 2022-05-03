const getFromLocalStorage = (key, defaultValue) => {
  let get = JSON.parse(localStorage.getItem(key));
  if (!get) {
    get = defaultValue;
  }
  return get;
};

export default getFromLocalStorage;
