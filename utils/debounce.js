export function debounce(fn, wait = 500, immediate = true, timer) {
  let result;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      if (!timer) {
        result = fn.apply(this, args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    }
    return result;
  };
}
