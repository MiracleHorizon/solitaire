export class StringTransformer {
  public static capitalize(string: string): string {
    return string
      .split(' ')
      .map(word => this.capitalizeWord(word))
      .join(' ')
  }

  public static capitalizeFirstWord(string: string): string {
    return string
      .split(' ')
      .map((word, i) => (i === 0 ? this.capitalizeWord(word) : word))
      .join(' ')
  }

  public static capitalizeWord(word: string): string {
    return word
      .split('')
      .map((char, i) => (i === 0 ? char.toUpperCase() : char))
      .join('')
  }
}
