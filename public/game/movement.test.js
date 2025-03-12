import { movePlayer } from "./movement.js";
import { updateMiniMap } from "./miniMap.js";
import { handlePlayerDeath } from "./playerDeath.js";
import { captureEnclosedArea } from "./areaCapture.js";

<<<<<<< HEAD
=======
//Mock-Funktionen:Isoliertes ausführen der einzelnenen Funktionen
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714
jest.mock("./miniMap.js");
jest.mock("./playerDeath.js");
jest.mock("./areaCapture.js");

describe("movePlayer", () => {
<<<<<<< HEAD
    let player;

=======
    //Deklarierung der Player-Variable
    let player;
    //Platzierung des Spielers auf Feld 1/1 vor Ausführung
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714
    beforeEach(() => {
        player = {
            x: 1,
            y: 1,
            prevX: 1,
            prevY: 1,
            direction: "right",
            alive: true,
            grid: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            trail: []
        };
    });

<<<<<<< HEAD
=======
    //Movement Directions
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714
    test("should move right when direction is 'right'", () => {
        movePlayer(player);
        expect(player.x).toBe(2);
        expect(player.y).toBe(1);
    });

    test("should move left when direction is 'left'", () => {
        player.direction = "left";
        movePlayer(player);
        expect(player.x).toBe(0);
        expect(player.y).toBe(1);
    });

    test("should move up when direction is 'up'", () => {
        player.direction = "up";
        movePlayer(player);
        expect(player.x).toBe(1);
        expect(player.y).toBe(0);
    });

    test("should move down when direction is 'down'", () => {
        player.direction = "down";
        movePlayer(player);
        expect(player.x).toBe(1);
        expect(player.y).toBe(2);
    });

<<<<<<< HEAD
=======
    //Special condititons
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714
    test("should not move if player is dead", () => {
        player.alive = false;
        movePlayer(player);
        expect(player.x).toBe(1);
        expect(player.y).toBe(1);
    });

    test("should not move out of bounds", () => {
        player.x = 2;
        player.direction = "right";
        movePlayer(player);
        expect(player.x).toBe(2);
    });

    test("should trigger handlePlayerDeath when hitting own trail", () => {
        player.trail = [{ x: 2, y: 1 }];
        player.direction = "right";
        movePlayer(player);
        expect(handlePlayerDeath).toHaveBeenCalledWith(player);
<<<<<<< HEAD
=======
        //To have been Called With prüft hier, ob die Fkt durch den Spieler selbst getriggert wurde
>>>>>>> 7fc66adf4deb3a3e74493faa0e911c4db1025714
    });

    test("should update minimap", () => {
        movePlayer(player);
        expect(updateMiniMap).toHaveBeenCalledWith(player.grid, player);
    });

    test("should call captureEnclosedArea when stepping on grid 1", () => {
        player.grid[1][2] = 1;
        movePlayer(player);
        expect(captureEnclosedArea).toHaveBeenCalledWith(player);
    });

    test("should add position to trail when progress is 1", () => {
        movePlayer(player);
        expect(player.trail).toContainEqual({ x: 1, y: 1 });
    });
});