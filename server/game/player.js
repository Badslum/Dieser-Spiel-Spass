// 
// Description: Backend-functions to create player, move player and check if player is alive.
//
// Created by:      Miriam Leixner on 02.03.2025
// Last updated by: Miriam Leixner on 02.03.2025
//
// ToDo for Miriam

//To Do!! verfolgen wann und wo eingebener Username und Spielerdaten gespeichert wird
import username from "./../public/App.js"
import playerid from "./../public/App.js"


// Is player alive?
// Create "tail" for player, evtl with length restrictions?


//definition of variables
let player = {
    name: "",
    id: 0,
    teamid: 0,
    alive: true,
    x ,
    y
}
let direction = ""

//function createPLayer
//To do: playerid und username aus App.js importieren
function createPlayer(username, playerid) {
    this.name = username,
    this.id = playerid
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

}

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


//Tests

//Test for createPLayer
const player1 = createPlayer(Testuser, 123);
console.log("Player name should be: username");
console.log("Player name is: " + player1.name);
console.log("Player id should be: playerid");
console.log("Player id is: " + player1.id);

//Test for movePlayer
player.x = 0;
player.y = 0;
movePlayer(player, "up");
movePlayer(player, "right");

console.log("player position should be: 1, 1");
console.log("player position is: " + `${player.x}, ${player.y}`);