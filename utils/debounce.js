// export function debounce(fn, wait = 500, immediate = true) {
//   let timer, result;
//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     if (immediate) {
//       if (!timer) {
//         result = fn.apply(this, args);
//       }
//       timer = setTimeout(() => {
//         timer = null;
//       }, wait);
//     } else {
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//       }, wait);
//     }
//     return result;
//   };
// }
export function debounce(func, wait) {
  var timer;
  return function () {
    let context = this; // 注意 this 指向
    let args = arguments; // arguments中存着e
    console.log(0, timer);

    if (timer) {
      console.log(1, timer);
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      console.log(2, timer);

      func.apply(this, args);
    }, wait);
    console.log(3, timer);
  };
}
