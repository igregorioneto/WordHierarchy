export function loaderParameters(delay: number) {
  for (let i = 0; i < delay * 1e4; i++) {}
}