export default function errorAppearance(object) {
  return object
    .toString()
    .replace(/Error:|Type|Syntax|Reference/g, '')
    .split(',')
    .map((el) => el.trim())
}
