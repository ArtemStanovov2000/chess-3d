// types.ts
export interface ChessPiece {
  type: 'K' | 'Q' | 'E' | 'H' | 'R' | 'P';
  color: 'W' | 'B';
}

export interface BoardCell {
  piece: ChessPiece | null;
  isHighlighted: boolean;
  isSelected: boolean;
  isAttack: boolean;
}

export interface ChessBoardProps { 
    board: BoardCell[];
    level: number;
    sliceType: string;
    onCellClick: (position: [number, number, number]) => void;
}

export type ChessBoard3D = BoardCell[][][];