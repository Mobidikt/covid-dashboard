export default function calculateTotalRadius(count) {
  if (count === 0) return 0
  const dividedByThousand = count / 1000
  return dividedByThousand <= 1
    ? Math.sqrt(dividedByThousand) / 1000
    : Math.log(dividedByThousand)
}
