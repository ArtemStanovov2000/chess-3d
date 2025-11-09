// Chess.tsx (улучшенная версия)
import * as THREE from "three";
import type { BoardCell, ChessBoard3D } from "./types";
import { useRef, useEffect, useState, useCallback } from "react";
import { createSegments } from "./Textures/PlayingField/Segments/createSegments";
import { startField } from "./Textures/PlayingField/startField";
import { initializeBoard } from "./boardUtils";
import { getPossibleMoves } from "./logic/moveLogic/moveLogic";
import ChessBoard from "./ChessBoard";

const Chess = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const keyStateRef = useRef<{ [key: string]: boolean }>({});
    const [board, setBoard] = useState<ChessBoard3D>(() => initializeBoard(startField));
    const [selectedPiece, setSelectedPiece] = useState<[number, number, number] | null>(null);

    // Функция для получения срезов
    const getSlices = useCallback((field: ChessBoard3D, sliceType: 'depth') => {
        const slices: BoardCell[][] = [];
        
        if (sliceType === 'depth') {
            for (let depth = 0; depth < 8; depth++) {
                const slice: BoardCell[] = [];
                for (let x = 0; x < 8; x++) {
                    for (let y = 0; y < 8; y++) {
                        slice.push(field[x][y][depth]);
                    }
                }
                slices.push(slice);
            }
        }
        
        return slices;
    }, []);

    // Очистка всех подсветок
    const clearHighlights = useCallback(() => {
        const newBoard = board.map(slice =>
            slice.map(row =>
                row.map(cell => ({
                    ...cell,
                    isHighlighted: false,
                    isSelected: false,
                    isAttack: false
                }))
            )
        );
        setBoard(newBoard);
    }, [board]);

    // Функция выполнения хода
    const makeMove = useCallback((from: [number, number, number], to: [number, number, number]) => {
        const [fromX, fromY, fromZ] = from;
        const [toX, toY, toZ] = to;
        
        const newBoard = [...board];
        const movingPiece = newBoard[fromX][fromY][fromZ].piece;
        
        if (movingPiece) {
            // Перемещаем фигуру
            newBoard[toX][toY][toZ] = {
                ...newBoard[toX][toY][toZ],
                piece: movingPiece
            };
            
            // Очищаем старую позицию
            newBoard[fromX][fromY][fromZ] = {
                ...newBoard[fromX][fromY][fromZ],
                piece: null
            };
        }

        clearHighlights();
        setSelectedPiece(null);
        setBoard(newBoard);
    }, [board, clearHighlights]);

    // Подсветка возможных ходов
    const highlightPossibleMoves = useCallback((position: [number, number, number], piece: any) => {
        const [x, y, z] = position;
        const possibleMoves = getPossibleMoves(position, piece, board);
        
        const newBoard = board.map((slice, i) =>
            slice.map((row, j) =>
                row.map((cell, k) => {
                    const isSelected = i === x && j === y && k === z;
                    const isPossibleMove = possibleMoves.some(([moveX, moveY, moveZ]) => 
                        moveX === i && moveY === j && moveZ === k
                    );
                    const isAttack = isPossibleMove && cell.piece !== null && cell.piece.color !== piece.color;

                    return {
                        ...cell,
                        isSelected,
                        isHighlighted: isPossibleMove,
                        isAttack
                    };
                })
            )
        );

        setBoard(newBoard);
    }, [board]);

    // Обработчик клика по фигуре
    const handlePieceClick = useCallback((position: [number, number, number]) => {
        const [x, y, z] = position;
        const cell = board[x]?.[y]?.[z];
        
        if (!cell) return;

        // Если кликнули на уже выбранную фигуру - снимаем выделение
        if (selectedPiece && selectedPiece[0] === x && selectedPiece[1] === y && selectedPiece[2] === z) {
            clearHighlights();
            setSelectedPiece(null);
            return;
        }

        // Если есть выбранная фигура и кликнули на подсвеченную клетку - делаем ход
        if (selectedPiece && cell.isHighlighted) {
            makeMove(selectedPiece, position);
            return;
        }

        // Если кликнули на фигуру - выделяем её и показываем возможные ходы
        if (cell.piece) {
            clearHighlights();
            setSelectedPiece(position);
            highlightPossibleMoves(position, cell.piece);
        }
    }, [board, selectedPiece, clearHighlights, makeMove, highlightPossibleMoves]);

    // Three.js логика
    const addSphere = useCallback((x: number, y: number, z: number) => {
        if (!sceneRef.current) {
            console.warn("Сцена не инициализирована");
            return;
        }

        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0x005050,
            wireframe: false,
            transparent: true,
            opacity: 0.55,
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x - 3.5, y - 3.5, z - 3.5);
        sceneRef.current.add(sphere);
    }, []);

    const getCanvasSize = useCallback(() => {
        const container = document.querySelector('.board-container') as HTMLElement;
        if (container) {
            return {
                width: container.clientWidth,
                height: container.clientHeight
            };
        }
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Инициализация Three.js сцены
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const { width: canvasWidth, height: canvasHeight } = getCanvasSize();

        const camera = new THREE.PerspectiveCamera(
            75,
            canvasWidth / canvasHeight,
            0.1,
            1000
        );

        camera.position.set(0, 7, 7);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(canvasWidth, canvasHeight);
        rendererRef.current = renderer;

        // Добавление фигур на сцену
        for (let i = 0; i < startField.length; i++) {
            for (let j = 0; j < startField.length; j++) {
                for (let k = 0; k < startField.length; k++) {
                    if (startField[i][j][k] != null) {
                        addSphere(i, j, k);
                    }
                }
            }
        }

        createSegments(THREE, scene);

        // Управление камерой
        const cameraParams = {
            radius: 13,
            theta: Math.PI / 4,
            phi: Math.PI / 4,
        };

        const updateCameraPosition = () => {
            const x = cameraParams.radius * Math.sin(cameraParams.phi) * Math.cos(cameraParams.theta);
            const y = cameraParams.radius * Math.cos(cameraParams.phi);
            const z = cameraParams.radius * Math.sin(cameraParams.phi) * Math.sin(cameraParams.theta);

            camera.position.set(x, y, z);
            camera.lookAt(0, 0, 0);
        };

        updateCameraPosition();

        // Обработчики клавиатуры
        const handleKeyDown = (event: KeyboardEvent) => {
            keyStateRef.current[event.key.toLowerCase()] = true;
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            keyStateRef.current[event.key.toLowerCase()] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Анимация
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            const rotationSpeed = 0.05;

            if (keyStateRef.current['й'] || keyStateRef.current['q']) {
                cameraParams.theta -= rotationSpeed;
            }
            if (keyStateRef.current['у'] || keyStateRef.current['e']) {
                cameraParams.theta += rotationSpeed;
            }
            if (keyStateRef.current['ф'] || keyStateRef.current['a']) {
                cameraParams.phi -= rotationSpeed;
            }
            if (keyStateRef.current['в'] || keyStateRef.current['d']) {
                cameraParams.phi += rotationSpeed;
            }

            cameraParams.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraParams.phi));
            cameraParams.radius = Math.max(2, Math.min(28, cameraParams.radius));

            updateCameraPosition();
            renderer.render(scene, camera);
        };

        animate();

        // Обработка изменения размера
        const handleResize = () => {
            const { width: newWidth, height: newHeight } = getCanvasSize();
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        const container = document.querySelector('.board-container');
        if (container) {
            resizeObserver.observe(container);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
            renderer.dispose();
        };
    }, [addSphere, getCanvasSize]);

    const slices = getSlices(board, 'depth');

    return (
        <div className="chess-container">
            <header className="header">
                <h1>Chess-3D</h1>
            </header>

            <main className="main">
                <div className="field">
                    <div className="boards-container">
                        {slices.map((slice, index) => (
                            <ChessBoard 
                                key={index} 
                                board={slice} 
                                level={index} 
                                sliceType={'depth'}
                                onCellClick={handlePieceClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="board-container">
                    <canvas ref={canvasRef} className="chess-canvas" />
                </div>
            </main>

            <footer className="footer">
                <button className="btn">Начать игру</button>
                <button className="btn">Сдаться</button>
            </footer>
        </div>
    );
};

export default Chess;