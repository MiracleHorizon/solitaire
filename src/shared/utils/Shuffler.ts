export class Shuffler {
  public shuffle<T>(payload: T[]): T[] {
    const shuffled = [...payload]
    const length = shuffled.length

    for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    const swapRounds = Math.floor(Math.random() * (length * 2))

    for (let round = 0; round < swapRounds; round++) {
      const indexA = Math.floor(Math.random() * length)
      const indexB = (indexA + 1) % length
      ;[shuffled[indexA], shuffled[indexB]] = [
        shuffled[indexB],
        shuffled[indexA]
      ]
    }

    return shuffled
  }
}
