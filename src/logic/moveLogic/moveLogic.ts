import type { ChessPiece, ChessBoard3D } from '../../types';
import { addRookMoves } from './rook';

export const getPossibleMoves = (position: [number, number, number], piece: ChessPiece, board: ChessBoard3D): [number, number, number][] => {
    const moves: [number, number, number][] = [];

    switch (piece.type) {
        case 'R':
            addRookMoves(position, board, piece.color, moves);
            break;
        case 'P':
        case 'E':
        case 'H':
        case 'Q':
        case 'K':
        default:
            break;
    }

    return moves;
};