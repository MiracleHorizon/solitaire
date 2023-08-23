import { Board } from './Board.ts'

export class Game {
  public readonly board: Board

  constructor() {
    this.board = new Board()
  }

  public restart(): void {
    this.board.reset()
  }
}
