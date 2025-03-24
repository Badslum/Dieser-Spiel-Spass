// 
// Description: Backend-functions to create teams, 
//
// Created by:      Miriam Leixner on 02.03.2025
// Last updated by: Miriam Leixner on 04.03.2025
//

// ToDo for Miriam


//definition of variables
let team = {
    id: 0,
    no_members: 0,
    color: ""
} 


//function createTeam (and equal distribution of players)
//function needs x to decide how many teams should be created (there should be so place in frontend where this is decided/defined)
//function needs playerPool to know how many players are in the game (input needed)
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

//To Do: Assign percententage of gameboard to each team? Varible needed?

//export the functions
module.exports = { createTeam };
