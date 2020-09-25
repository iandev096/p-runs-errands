export function arrToStrList(arr: string[]) {
  return arr.reduce((acc, cur, idx) =>
    acc + (`${idx + 1}. ${cur}` + '\n'),
    '').trim();
}