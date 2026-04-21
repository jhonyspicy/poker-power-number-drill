export function generateChoices(correct: number, count = 4): number[] {
  const choices = new Set<number>([correct])
  while (choices.size < count) {
    const offset = Math.floor(Math.random() * 10) - 5
    const val = correct + offset
    if (val > 0 && val !== correct) {
      choices.add(val)
    }
  }
  return shuffle([...choices])
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
