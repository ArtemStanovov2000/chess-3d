import { useRef, useEffect } from "react";
import * as THREE from "three";
import { createSegments } from "./Textures/PlayingField/Segments/createSegments";
import { createPlanes } from "./Textures/PlayingField/Planes/createPlanes";
import { startField } from "./Textures/PlayingField/startField";

const Chess = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const keyStateRef = useRef<{ [key: string]: boolean }>({});

    const addSphere = (type: string, x: number, y: number, z: number) => {
        if (!sceneRef.current) {
            console.warn("Сцена не инициализирована");
            return;
        }

        // Создаем геометрию сферы
        const geometry = new THREE.SphereGeometry(0.3, 16, 16); // радиус 0.3, умеренная детализация

        // Создаем материал для сферы
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, // красный цвет
            wireframe: false,
            transparent: true, // Включаем прозрачность
            opacity: 0.15,
        });

        // Создаем меш (объект) сферыву
        const sphere = new THREE.Mesh(geometry, material);

        // Устанавливаем позицию
        sphere.position.set(x - 3.5, y - 3.5, z - 3.5);

        // Добавляем сферу на сцену
        sceneRef.current.add(sphere);
    };


    useEffect(() => {
        if (!canvasRef.current) return;

        // Инициализация сцены
        const scene: THREE.Scene = new THREE.Scene();
        sceneRef.current = scene;

        // Инициализация камеры
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Начальное положение камеры
        camera.position.set(0, 5, 5);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Инициализация рендерера
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current = renderer;

        for (let i = 0; i < startField.length; i++) {
            for (let j = 0; j < startField.length; j++) {
                for (let k = 0; k < startField.length; k++) {
                    if(startField[i][j][k] != null) {
                        addSphere("pv", i, j, k)
                    }
                }
            }
        }

        // Создание сетки
        createSegments(THREE, scene)

        // Создание плоскости
        //createPlanes(THREE, scene)


        // Параметры вращения камеры
        const cameraParams = {
            radius: 13,
            theta: Math.PI / 4,
            phi: Math.PI / 4,
        };

        // Функция обновления позиции камеры
        const updateCameraPosition = () => {
            const x = cameraParams.radius * Math.sin(cameraParams.phi) * Math.cos(cameraParams.theta);
            const y = cameraParams.radius * Math.cos(cameraParams.phi);
            const z = cameraParams.radius * Math.sin(cameraParams.phi) * Math.sin(cameraParams.theta);

            camera.position.set(x, y, z);
            camera.lookAt(0, 0, 0);

            // Отладочная информация
            console.log("Camera position:", camera.position);
            console.log("Camera params:", cameraParams);
        };

        // Инициализация позиции камеры
        updateCameraPosition();

        // Обработчик клавиатуры
        const handleKeyDown = (event: KeyboardEvent) => {
            keyStateRef.current[event.key.toLowerCase()] = true;
            console.log("Key pressed:", event.key);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            keyStateRef.current[event.key.toLowerCase()] = false;
        };

        // Добавляем обработчики на window
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Анимация
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            const rotationSpeed = 0.05;

            // Вращение камеры вокруг целевой точки
            if (keyStateRef.current['й']) {
                cameraParams.theta -= rotationSpeed;
            }
            if (keyStateRef.current['у']) {
                cameraParams.theta += rotationSpeed;
            }
            if (keyStateRef.current['ф']) {
                cameraParams.phi -= rotationSpeed;
            }
            if (keyStateRef.current['в']) {
                cameraParams.phi += rotationSpeed;
            }

            // Ограничение угла phi, чтобы камера не переворачивалась
            cameraParams.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraParams.phi));

            // Ограничение радиуса
            cameraParams.radius = Math.max(2, Math.min(20, cameraParams.radius));

            // Обновление позиции камеры
            updateCameraPosition();

            renderer.render(scene, camera);
        };

        // Запускаем анимацию
        animate();

        // Обработчик изменения размера
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            // Очистка
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div className="chess-container">
            <header className="header">
                <h1>Chess-3D</h1>
            </header>

            <div className="board-container">
                <canvas ref={canvasRef} className="chess-canvas" />
            </div>

            <footer className="footer">
                <button className="btn">Начать игру</button>
                <button className="btn">Сдаться</button>
            </footer>
        </div>
    );
};

export default Chess;