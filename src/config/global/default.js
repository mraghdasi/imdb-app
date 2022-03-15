export const addToArray = (arr, watchList) => {
  const found = arr.some((el) => el.id === watchList.id);
  if (!found) arr.push(watchList);
  return arr;
};

export const deleteFromArray = (watchLists, arrayItem) => {
  const newArray = watchLists.filter((item) => item.id !== arrayItem.id);
  return newArray;
};
