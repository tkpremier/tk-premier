/**
 * https://stackoverflow.com/questions/27699493/javascript-partially-applied-function-how-to-bind-only-the-2nd-parameter
 * @param {function} fn - function to bind additional arguments
 * @param  {...any} boundArgs - additional arguments
 */
const bindMoreArgs = (fn, ...boundArgs) => (...args) => fn(...args, ...boundArgs);

export default bindMoreArgs;