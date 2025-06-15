export function sum(a, b) {
  if ([a, b].some((arg) => typeof arg !== 'number')) throw new TypeError('both arguments must be numbers');
  return a + b;
}
