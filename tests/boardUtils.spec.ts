import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { checkLines } from '../src/boardUtils'
import { createGame } from '../src/GameLogic'

test('Horizontal checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'horizontal')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 0))
})

test("Horizontal checking doesn't find winning row", () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[1][0].playerId = playerId
  game.board.board[2][0].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'horizontal')

  assert.is(wins.length, 0)
})

test('Horizontal checking finds multiple winning rows', () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId
  game.board.board[2][0].playerId = playerId
  game.board.board[2][1].playerId = playerId
  game.board.board[2][2].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'horizontal')

  assert.is(wins.length, 2)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 0))

  assert.is(wins[1].playerId, playerId)
  assert.is(wins[1].positions.length, 3)
  assert.ok(wins[1].positions.some((position) => position.x === 0 && position.y === 2))
  assert.ok(wins[1].positions.some((position) => position.x === 1 && position.y === 2))
  assert.ok(wins[1].positions.some((position) => position.x === 2 && position.y === 2))
})

test('Horizontal checking finds long winning row', () => {
  const playerId = 'p1'
  const game = createGame({ x: 5, y: 5 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId
  game.board.board[0][3].playerId = playerId
  game.board.board[0][4].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'horizontal')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 5)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 3 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 4 && position.y === 0))
})

test('Vertical checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][1].playerId = playerId
  game.board.board[1][1].playerId = playerId
  game.board.board[2][1].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'vertical')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 1))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 2))
})

test("Vertical checking doesn't find winning row", () => {
  const playerId = 'p1'
  const game = createGame({ x: 3, y: 3 }, 3)
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'vertical')

  assert.is(wins.length, 0)
})

test.run()
