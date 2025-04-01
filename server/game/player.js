// 
// Description: Backend-functions to create player, move player and check if player is alive.
//
// Created by:      Miriam Leixner on 02.03.2025
// Last updated by: Miriam Leixner on 04.03.2025
//
// ToDo for Miriam

/*To Do!! verfolgen wann und wo eingebener Username und Spielerdaten gespeichert wird
import username from "./../public/App.js"
import playerid from "./../public/App.js"
*/

//definition of variables
let player = {
    name: "",
    id: 0,
    teamid: 0,
    alive: true,
    x: 0,
    y: 0,
    tail: 0,
    pos_changed: false
}
let direction = ""

//function createPLayer
//To do: playerid und username aus App.js importieren
//To do: do I need to assign a starting point(x,y) for the player?
function createPlayer(name, playerid) {
   return {
        name: name,
        id: playerid,
        };
}

//function movePlayer
function movePlayer(player, direction) {
    switch (direction) {
        case "up":
            player.y += 1;
            break;
        case "down":
            player.y -= 1;
            break;
        case "left":
            player.x -= 1;
            break;
        case "right":
            player.x += 1;
            break;
    }
   player.pos_changed = true;

    setTimeout(() => {
        player.pos_changed = false;
    }, 500);
}

// Create "tail" for player, evtl with length restrictions?
// Tail starts at players territory and grows with each step the player takes
// function createTail
function createTail(player, pos_changed) {
    if (pos_changed === true) {
        player.tail += 1;
    }
}

//function checkTeam
function checkTeam(player){
    if(player.teamid === 0){
        team = 0
        console.log("Team not yet defined")
        elseif(player.teamid === 1);{
            team = 1
            console.log("Player belongs to team 1 (blue)")
        }
        elseif(player.teamid === 2);{
            team = 2
            console.log("Player belongs to team 2 (red)")
        }
    }
    else(
        console.log("Error: team not identified")
    )
}

//function checkAlive
function checkAlive(player) {
    if (player.alive === false) {
        console.log("Player is dead");
    }
}

// Export the functions
module.exports = {
    createPlayer,
    movePlayer
};

<<<<<<< HEAD
=======
//Tests
<<<<<<< HEAD
=======
<<<<<<< HEAD
/*
=======

>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> 4459c815ce204b35e50557112927e208c7a0773b
//Test for createPLayer
const player1 = createPlayer(`testuser`, 123);
console.log("Player name should be: testuser");
console.log("Player name is:"  + player1.name);
console.log("Player id should be: 123");
console.log("Player id is: " + player1.id);

//Test for movePlayer
player.x = 0;
player.y = 0;
movePlayer(player, "up");
movePlayer(player, "right");

console.log("player position should be: 1, 1");
console.log("player position is: " + `${player.x}, ${player.y}`);

//Test for checkTeam
player1.teamid = 2;
checkTeam(player1);
<<<<<<< HEAD

console.log("Player belongs to team 1 (blue)");
=======
<<<<<<< HEAD
console.log("Player belongs to team 1 (blue)");
*/
=======
console.log("Player belongs to team 1 (blue)");
>>>>>>> 87aa22fc90281b80f247e25cedb9fcdd22d1a620
>>>>>>> 4459c815ce204b35e50557112927e208c7a0773b
>>>>>>> 40c9f94b97e09837f32932d1a832e2a08253f71c
