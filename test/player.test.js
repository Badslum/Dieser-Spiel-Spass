<<<<<<< HEAD
=======
<<<<<<< HEAD
// 
// Description: Backend-functions to create player, move player and check if player is alive.
//
// Created by:      Miriam Leixner on 04.03.2025
// Last updated by: Miriam Leixner on 06.03.2025
//
// ToDo for Miriam

=======
>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> backend
const assert = require('assert');
const { createPlayer, movePlayer } = require('../server/game/player');

describe('Player Functions', function() {
  it('should create a player with the correct name and id', function() {
    const player = createPlayer('testuser', 123);
    assert.strictEqual(player.name, 'testuser');
    assert.strictEqual(player.id, 123);
  });

  it('should move the player correctly', function() {
    const player = createPlayer('testuser', 123);
    player.x = 0;
<<<<<<< HEAD
    player.y = 0;
=======
<<<<<<< HEAD
    player.y = 11;
=======
    player.y = 0;
>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> backend
    movePlayer(player, 'up');
    assert.strictEqual(player.y, 12);
    movePlayer(player, 'right');
    assert.strictEqual(player.x, 1);
  });
});