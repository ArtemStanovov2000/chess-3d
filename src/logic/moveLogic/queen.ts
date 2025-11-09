// logic/moveLogic/queen.ts
import type { ChessBoard3D } from "../../types";

export const addQueenMoves = (
    position: [number, number, number], 
    board: ChessBoard3D, 
    color: 'W' | 'B', 
    moves: [number, number, number][]
) => {
    const [startX, startY, startZ] = position;

    // Все направления движения ферзя в 3D пространстве
    const directions = [
        // Ортогональные направления (как ладья) - 6 направлений
        { dx: 1, dy: 0, dz: 0 },  // +X
        { dx: -1, dy: 0, dz: 0 }, // -X
        { dx: 0, dy: 1, dz: 0 },  // +Y
        { dx: 0, dy: -1, dz: 0 }, // -Y
        { dx: 0, dy: 0, dz: 1 },  // +Z
        { dx: 0, dy: 0, dz: -1 }, // -Z
        
        // Пространственные диагонали (как слон) - 8 направлений
        // Все координаты меняются одинаково
        { dx: 1, dy: 1, dz: 1 },
        { dx: 1, dy: 1, dz: -1 },
        { dx: 1, dy: -1, dz: 1 },
        { dx: 1, dy: -1, dz: -1 },
        { dx: -1, dy: 1, dz: 1 },
        { dx: -1, dy: 1, dz: -1 },
        { dx: -1, dy: -1, dz: 1 },
        { dx: -1, dy: -1, dz: -1 },
        
        // Плоскостные диагонали (дополнительные для 3D) - 12 направлений
        // Две координаты меняются, одна остается
        { dx: 1, dy: 1, dz: 0 },
        { dx: 1, dy: -1, dz: 0 },
        { dx: -1, dy: 1, dz: 0 },
        { dx: -1, dy: -1, dz: 0 },
        { dx: 1, dy: 0, dz: 1 },
        { dx: 1, dy: 0, dz: -1 },
        { dx: -1, dy: 0, dz: 1 },
        { dx: -1, dy: 0, dz: -1 },
        { dx: 0, dy: 1, dz: 1 },
        { dx: 0, dy: 1, dz: -1 },
        { dx: 0, dy: -1, dz: 1 },
        { dx: 0, dy: -1, dz: -1 }
    ];

    // Проверяем каждое направление
    directions.forEach(({ dx, dy, dz }) => {
        let distance = 1;
        
        while (true) {
            const newX = startX + dx * distance;
            const newY = startY + dy * distance;
            const newZ = startZ + dz * distance;

            // Проверяем границы доски
            if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8 || newZ < 0 || newZ >= 8) {
                break;
            }

            const targetCell = board[newX]?.[newY]?.[newZ];
            
            // Если клетка пустая - добавляем ход и продолжаем
            if (!targetCell.piece) {
                moves.push([newX, newY, newZ]);
                distance++;
                continue;
            }

            // Если на клетке фигура
            if (targetCell.piece) {
                // Если это фигура противника - добавляем ход (взятие)
                if (targetCell.piece.color !== color) {
                    moves.push([newX, newY, newZ]);
                }
                // Прерываем луч в любом случае (нельзя прыгать через фигуры)
                break;
            }
        }
    });
};