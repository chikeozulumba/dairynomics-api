export const formatDateToTimestamp = (date: Date): string => {
  const pad2 = (n: number): string | number => (n < 10 ? '0' : '') + n
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}${pad2(date.getHours())}${pad2(
    date.getMinutes(),
  )}${pad2(date.getSeconds())}`
}
