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

