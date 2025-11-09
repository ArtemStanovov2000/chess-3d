// logic/moveLogic/pawn.ts
import type { ChessBoard3D } from "../../types";

export const addPawnMoves = (
    position: [number, number, number], 
    board: ChessBoard3D, 
    color: 'W' | 'B', 
    moves: [number, number, number][]
) => {
    const [x, y, z] = position;
    
    // Движение по оси X
    const direction = color === 'W' ? 1 : -1;
    const startRow = color === 'W' ? 1 : 6;

    // Обычный ход вперед (теперь по оси X)
    const forwardMove: [number, number, number] = [x + direction, y, z];
    if (isWithinBounds(forwardMove) && !board[x + direction][y][z].piece) {
        moves.push(forwardMove);
        
        // Двойной ход с стартовой позиции
        const doubleMove: [number, number, number] = [x + 2 * direction, y, z];
        if (x === startRow && !board[x + 2 * direction][y][z].piece) {
            moves.push(doubleMove);
        }
    }

    // Взятия по диагонали (все 3 координаты меняются на ±1)
    const takeDirections = [
        [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
        [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
    ];

    takeDirections.forEach(([dx, dy, dz]) => {
        // Для взятия все координаты должны измениться на 1 по модулю
        if (Math.abs(dx) === 1 && Math.abs(dy) === 1 && Math.abs(dz) === 1) {
            const takeMove: [number, number, number] = [
                x + direction, // X всегда в направлении движения
                y + dy, 
                z + dz
            ];
            
            if (isWithinBounds(takeMove)) {
                const targetCell = board[takeMove[0]][takeMove[1]][takeMove[2]];
                // Можно брать только фигуры противника
                if (targetCell.piece && targetCell.piece.color !== color) {
                    moves.push(takeMove);
                }
            }
        }
    });
};

// Вспомогательная функция для проверки границ
const isWithinBounds = ([x, y, z]: [number, number, number]): boolean => {
    return x >= 0 && x < 8 && y >= 0 && y < 8 && z >= 0 && z < 8;
};