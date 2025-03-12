// 
// Description: Test of backend-functions to create teams,
//
// Created by:      Miriam Leixner on 04.03.2025
// Last updated by: Miriam Leixner on 06.03.2025
//
// ToDo for Miriam

const assert = require('assert');
const { createTeam, movePlayer } = require('../server/game/team');

describe('Team Functions', function() {
  it('should create a team with the correct color, number of players and id', function() {
    playerPool = 10;
    let x = 3;
    const teams = createTeam(playerPool, x);
    assert.strictEqual(teams[0].id, 1);
    assert.strictEqual(teams[0].no_members, 4);
    assert.strictEqual(teams[0].color, "blue");
    assert.strictEqual(teams[1].id, 2);
    assert.strictEqual(teams[1].no_members, 3);
    assert.strictEqual(teams[1].color, "red");
    
  });

});
