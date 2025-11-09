import type { ChessBoard3D } from "../../types";

export const addHorseMoves = (
    position: [number, number, number], 
    board: ChessBoard3D, 
    color: 'W' | 'B', 
    moves: [number, number, number][]
) => {
    const [x, y, z] = position;

    // Все возможные комбинации смещений для коня в 3D
    // Каждая комбинация: [±2, ±1, 0] и все их перестановки
    const horseMoves = [
        // Перестановки (2, 1, 0)
        [2, 1, 0], [2, -1, 0], [-2, 1, 0], [-2, -1, 0],
        [2, 0, 1], [2, 0, -1], [-2, 0, 1], [-2, 0, -1],
        [1, 2, 0], [1, -2, 0], [-1, 2, 0], [-1, -2, 0],
        [0, 2, 1], [0, 2, -1], [0, -2, 1], [0, -2, -1],
        [1, 0, 2], [1, 0, -2], [-1, 0, 2], [-1, 0, -2],
        [0, 1, 2], [0, 1, -2], [0, -1, 2], [0, -1, -2]
    ];

    // Проверяем каждый возможный ход
    horseMoves.forEach(([dx, dy, dz]) => {
        const newX = x + dx;
        const newY = y + dy;
        const newZ = z + dz;

        // Проверяем границы доски
        if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8 || newZ < 0 || newZ >= 8) {
            return;
        }

        const targetCell = board[newX][newY][newZ];
        
        // Если клетка пустая или содержит фигуру противника - добавляем ход
        if (!targetCell.piece || targetCell.piece.color !== color) {
            moves.push([newX, newY, newZ]);
        }
    });
};