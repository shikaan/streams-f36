export default <T>(array: Array<T>, ...items: Array<T>) => {
  let result = [...array, ...items];

  if (result.length >= length) {
    result = result.slice(items.length)
  }

  return result;
}
