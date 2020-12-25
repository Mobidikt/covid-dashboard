const baseValue = 10

export default function calculateTotalRadius(count) {
  if (count === 0) return 0
  const dividedByBase = count / baseValue
  return dividedByBase < baseValue
    ? Math.log(baseValue)
    : Math.log(dividedByBase)
}
