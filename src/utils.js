export const once = (func) => {
  let hasHappened = false;

  return function(...args) {
    if (hasHappened) { return; }

    hasHappened = true;
    return func(...args);
  }
}