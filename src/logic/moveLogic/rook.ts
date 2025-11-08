import type { ChessBoard3D } from "../../types";

export const addRookMoves = (position: [number, number, number], board: ChessBoard3D, color: 'W' | 'B', moves: [number, number, number][]) => {
    const [x, y, z] = position;

    // Движение вдоль оси X (при фиксированных Y и Z)
    for (let i = 0; i < 8; i++) {
        if (i !== x) {
            moves.push([i, y, z]);
        }
    }

    // Движение вдоль оси Y (при фиксированных X и Z)
    for (let j = 0; j < 8; j++) {
        if (j !== y) {
            moves.push([x, j, z]);
        }
    }

    // Движение вдоль оси Z (при фиксированных X и Y)
    for (let k = 0; k < 8; k++) {
        if (k !== z) {
            moves.push([x, y, k]);
        }
    }
};