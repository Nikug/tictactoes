import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { checkBoard, checkDiagonals, checkLines } from '../src/boardUtils'
import { createGame } from '../src/GameLogic'

test('Horizontal checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
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
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
  game.board.board[0][0].playerId = playerId
  game.board.board[1][0].playerId = playerId
  game.board.board[2][0].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'horizontal')

  assert.is(wins.length, 0)
})

test('Horizontal checking finds multiple winning rows', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
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
  const game = createGame({ dimensions: { x: 5, y: 5 }, winLength: 3 })
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

test('Horizontal checking finds winning against other mark', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 5, y: 5 }, winLength: 3 })
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId
  game.board.board[0][3].playerId = 'p2'

  const wins = checkLines(game.board, game.winLength, 'horizontal')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 0))
})

test('Vertical checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
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
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId

  const wins = checkLines(game.board, game.winLength, 'vertical')

  assert.is(wins.length, 0)
})

test('Diagonal (\\) checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
  game.board.board[0][0].playerId = playerId
  game.board.board[1][1].playerId = playerId
  game.board.board[2][2].playerId = playerId

  const wins = checkDiagonals(game.board, game.winLength, 'topRightToBottomLeft')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 1))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 2))
})

test('Diagonal (\\) checking finds multiple winning rows for multiple players', () => {
  const playerId = 'p1'
  const player2Id = 'p2'
  const game = createGame({ dimensions: { x: 6, y: 6 }, winLength: 3 })
  game.board.board[0][0].playerId = playerId
  game.board.board[1][1].playerId = playerId
  game.board.board[2][2].playerId = playerId
  game.board.board[3][3].playerId = playerId
  game.board.board[3][0].playerId = player2Id
  game.board.board[4][1].playerId = player2Id
  game.board.board[5][2].playerId = player2Id

  const wins = checkDiagonals(game.board, game.winLength, 'topRightToBottomLeft')

  assert.is(wins.length, 2)
  const player1Win = wins.find((win) => win.playerId === playerId)
  const player2Win = wins.find((win) => win.playerId === player2Id)
  assert.ok(player1Win)
  assert.ok(player2Win)

  assert.ok(player1Win.positions.some((position) => position.x === 0 && position.y === 0))
  assert.ok(player1Win.positions.some((position) => position.x === 1 && position.y === 1))
  assert.ok(player1Win.positions.some((position) => position.x === 2 && position.y === 2))
  assert.ok(player1Win.positions.some((position) => position.x === 3 && position.y === 3))

  assert.ok(player2Win.positions.some((position) => position.x === 0 && position.y === 3))
  assert.ok(player2Win.positions.some((position) => position.x === 1 && position.y === 4))
  assert.ok(player2Win.positions.some((position) => position.x === 2 && position.y === 5))
})

test('Diagonal (/) checking finds winning row', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
  game.board.board[2][0].playerId = playerId
  game.board.board[1][1].playerId = playerId
  game.board.board[0][2].playerId = playerId

  const wins = checkDiagonals(game.board, game.winLength, 'bottomRightToTopLeft')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 3)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 2))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 1))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 0))
})

test('CheckBoard finds all wins on full board', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 3, y: 3 }, winLength: 3 })
  game.board.board[0][0].playerId = playerId
  game.board.board[0][1].playerId = playerId
  game.board.board[0][2].playerId = playerId
  game.board.board[1][0].playerId = playerId
  game.board.board[1][1].playerId = playerId
  game.board.board[1][2].playerId = playerId
  game.board.board[2][0].playerId = playerId
  game.board.board[2][1].playerId = playerId
  game.board.board[2][2].playerId = playerId

  const wins = checkBoard(game.board, game.winLength)

  assert.is(wins.length, 8)
  assert.ok(wins.every((win) => win.playerId === playerId))
})

test('Diagonal (\\) checking finds winning row in rectangular board', () => {
  const playerId = 'p1'
  const game = createGame({ dimensions: { x: 5, y: 10 }, winLength: 5 })
  game.board.board[5][0].playerId = playerId
  game.board.board[6][1].playerId = playerId
  game.board.board[7][2].playerId = playerId
  game.board.board[8][3].playerId = playerId
  game.board.board[9][4].playerId = playerId

  const wins = checkDiagonals(game.board, game.winLength, 'topRightToBottomLeft')

  assert.is(wins.length, 1)
  assert.is(wins[0].playerId, playerId)
  assert.is(wins[0].positions.length, 5)
  assert.ok(wins[0].positions.some((position) => position.x === 0 && position.y === 5))
  assert.ok(wins[0].positions.some((position) => position.x === 1 && position.y === 6))
  assert.ok(wins[0].positions.some((position) => position.x === 2 && position.y === 7))
  assert.ok(wins[0].positions.some((position) => position.x === 3 && position.y === 8))
  assert.ok(wins[0].positions.some((position) => position.x === 4 && position.y === 9))
})

test.run()
