import type { BoardCell, ChessBoardProps } from "./types";

const ChessBoard = ({ board, level, sliceType, onCellClick }: ChessBoardProps) => {
    const pieceIcons: { [key: string]: string } = {
        'K': '♔', 'Q': '♕', 'E': '♗', 'H': '♘', 'R': '♖', 'P': '♙'
    };

    const getPieceIcon = (piece: any) => {
        if (!piece) return '';
        return pieceIcons[piece.type] || '';
    };

    const getPieceColor = (piece: any) => {
        if (!piece) return '';
        return piece.color === 'W' ? 'white-piece' : 'black-piece';
    };

    const getCellClass = (cell: BoardCell, rowIndex: number, cellIndex: number) => {
        let baseClass = `board-cell ${(rowIndex + cellIndex) % 2 === 0 ? 'light' : 'dark'}`;
        
        if (cell.isSelected) baseClass += ' selected';
        if (cell.isHighlighted) {
            baseClass += cell.isAttack ? ' attack' : ' move';
        }
        
        return baseClass;
    };

    const getTitle = () => {
        switch (sliceType) {
            case 'vertical': return `Срез ${level + 1}`;
            case 'horizontal': return `Срез ${level + 1}`;
            case 'depth': return `Срез ${level + 1}`;
            default: return `Slice ${level}`;
        }
    };

    // Вспомогательная функция для определения 3D позиции клетки
    const getCellPosition = (level: number, rowIndex: number, cellIndex: number, sliceType: string): [number, number, number] => {
        switch (sliceType) {
            case 'vertical':
                return [level, rowIndex, cellIndex];
            case 'horizontal':
                return [cellIndex, level, rowIndex];
            case 'depth':
                return [rowIndex, cellIndex, level];
            default:
                return [level, rowIndex, cellIndex];
        }
    };

    // Преобразуем плоский массив обратно в 2D для отрисовки
    const renderBoard = [];
    for (let i = 0; i < 8; i++) {
        renderBoard.push(board.slice(i * 8, (i + 1) * 8));
    }

    return (
        <div className="chess-board">
            <h3>{getTitle()}</h3>
            <div className="board-grid">
                {renderBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((cell, cellIndex) => {
                            const position = getCellPosition(level, rowIndex, cellIndex, sliceType);
                            return (
                                <button
                                    key={cellIndex}
                                    className={getCellClass(cell, rowIndex, cellIndex)}
                                    onClick={() => onCellClick(position)}
                                >
                                    {cell.piece && (
                                        <span className={`chess-piece ${getPieceColor(cell.piece)}`}>
                                            {getPieceIcon(cell.piece)}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChessBoard