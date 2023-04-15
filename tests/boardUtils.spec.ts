import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { checkHorizontal } from '../src/boardUtils'
import { createGame } from '../src/GameLogic'

test('Horizontal checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId

  const wins = checkHorizontal(game.board, game.winLength)

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 0))
})

test("Horizontal doesn't find winning row", () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[1][0].playerId = playerId
  game.board.board[2][0].playerId = playerId

  const wins = checkHorizontal(game.board, game.winLength)

  assert.is(wins.length, 0)
})

test.run()
