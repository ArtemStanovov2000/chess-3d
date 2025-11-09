// logic/moveLogic/king.ts
import type { ChessBoard3D } from "../../types";

export const addKingMoves = (
    position: [number, number, number], 
    board: ChessBoard3D, 
    color: 'W' | 'B', 
    moves: [number, number, number][]
) => {
    const [x, y, z] = position;

    // Все возможные направления движения короля в 3D пространстве
    // Те же 26 направлений, что и у ферзя, но только на 1 клетку
    const directions = [
        // Ортогональные направления (6)
        { dx: 1, dy: 0, dz: 0 }, { dx: -1, dy: 0, dz: 0 },
        { dx: 0, dy: 1, dz: 0 }, { dx: 0, dy: -1, dz: 0 },
        { dx: 0, dy: 0, dz: 1 }, { dx: 0, dy: 0, dz: -1 },
        
        // Пространственные диагонали (8)
        { dx: 1, dy: 1, dz: 1 }, { dx: 1, dy: 1, dz: -1 },
        { dx: 1, dy: -1, dz: 1 }, { dx: 1, dy: -1, dz: -1 },
        { dx: -1, dy: 1, dz: 1 }, { dx: -1, dy: 1, dz: -1 },
        { dx: -1, dy: -1, dz: 1 }, { dx: -1, dy: -1, dz: -1 },
        
        // Плоскостные диагонали (12)
        { dx: 1, dy: 1, dz: 0 }, { dx: 1, dy: -1, dz: 0 },
        { dx: -1, dy: 1, dz: 0 }, { dx: -1, dy: -1, dz: 0 },
        { dx: 1, dy: 0, dz: 1 }, { dx: 1, dy: 0, dz: -1 },
        { dx: -1, dy: 0, dz: 1 }, { dx: -1, dy: 0, dz: -1 },
        { dx: 0, dy: 1, dz: 1 }, { dx: 0, dy: 1, dz: -1 },
        { dx: 0, dy: -1, dz: 1 }, { dx: 0, dy: -1, dz: -1 }
    ];

    // Проверяем каждый возможный ход (только на расстояние 1)
    directions.forEach(({ dx, dy, dz }) => {
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

    // TODO: В будущем можно добавить рокировку, если она предусмотрена в 3D шахматах
};