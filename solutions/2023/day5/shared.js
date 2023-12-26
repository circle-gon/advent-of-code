export function mapTo(num, arr) {
  for (const data of arr) {
    if (num >= data[1] && num < data[1] + data[2]) {
      return num - data[1] + data[0];
    }
  }
  return num;
}
