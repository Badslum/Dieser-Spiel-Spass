// 
// Description: Backend-functions to create teams, 
//
// Created by:      Miriam Leixner on 02.03.2025
// Last updated by: Miriam Leixner on 02.03.2025
//


// Create teams (ideally team 1, 2, etc)
//definition of variables
let team = {
    id: 0,
    no_members: 0,
    color: ""
} 


//function createTeam and distribute the players equally

function createTeam(playerPool, x) {
    let colors = ["blue", "red", "green", "yellow", "purple", "orange"];
    let teams = [];
    if (x >= 2){
        let baseMembers = Math.floor(playerPool / x);
        let remainingMembers = playerPool % x;

        for (let i = 0; i < x; i++){
            let team = {
                id: i + 1,
                no_members: baseMembers + (remainingMembers > 0 ? 1 : 0),
                color: colors[i]
            };
            teams.push(team);
            if (remainingMembers > 0) {
                remainingMembers--;
            }
        }
    }
    return teams;
}

//Test for createTeam
let playerPool = 10;
let x = 3;
let teams = createTeam(playerPool, x);
console.log(`Team 1 ID: ${teams[0].id}`);
console.log(`Team 1 Members: ${teams[0].no_members}`);
console.log(`Team 1 Color: ${teams[0].color}`);