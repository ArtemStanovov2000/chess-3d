import type { BoardCell, ChessBoard3D } from './types';

export const createBoardCell = (piece: string | null): BoardCell => {
  if (!piece) {
    return {
      piece: null,
      isHighlighted: false,
      isSelected: false,
      isAttack: false
    };
  }

  return {
    piece: {
      type: piece[0] as 'K' | 'Q' | 'E' | 'H' | 'R' | 'P',
      color: piece[1] as 'W' | 'B',
    },
    isHighlighted: false,
    isSelected: false,
    isAttack: false
  };
};

export const initializeBoard = (startField: (string | null)[][][]): ChessBoard3D => {
  return startField.map(slice => 
    slice.map(row => 
      row.map(cell => createBoardCell(cell))
    )
  );
};