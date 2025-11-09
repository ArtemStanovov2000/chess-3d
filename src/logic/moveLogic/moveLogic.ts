// logic/moveLogic/moveLogic.ts
import type { ChessPiece, ChessBoard3D } from '../../types';
import { addRookMoves } from './rook';
import { addPawnMoves } from './pawn';
import { addQueenMoves } from './queen';
import { addHorseMoves } from './horse';
import { addElephantMoves } from './elephant';
import { addKingMoves } from './king';

export const getPossibleMoves = (
    position: [number, number, number],
    piece: ChessPiece,
    board: ChessBoard3D
): [number, number, number][] => {
    const moves: [number, number, number][] = [];

    switch (piece.type) {
        case 'R':
            addRookMoves(position, board, piece.color, moves);
            break;
        case 'P':
            addPawnMoves(position, board, piece.color, moves)
            break
        case 'E':
            addElephantMoves(position, board, piece.color, moves);
            break;
        case 'H':
            addHorseMoves(position, board, piece.color, moves);
            break
        case 'Q':
            addQueenMoves(position, board, piece.color, moves);
            break
        case 'K':
            addKingMoves(position, board, piece.color, moves);
            break;
        default:
            break;
    }

    return moves;
};