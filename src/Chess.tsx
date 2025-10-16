import { useRef, useEffect } from "react";
import * as THREE from "three";

const Chess = () => {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);
    const keyStateRef = useRef({});

    useEffect(() => {
        if (!canvasRef.current) return;

        // Инициализация сцены
        const scene = new THREE.Scene();
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

        // Создание плоскости
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            2, 2, 0,
            2, -2, 0,
            -2, -2, 0,
            -2, 2, 0
        ]);
        const indices = [0, 1, 2, 0, 2, 3];
        
        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // Создание плоскости 1
        const geometry1 = new THREE.BufferGeometry();
        const vertices1 = new Float32Array([
            2, 2, 1,
            2, -2, 1,
            -2, -2, 1,
            -2, 2, 1
        ]);
        const indices1 = [0, 1, 2, 0, 2, 3];
        
        geometry1.setIndex(indices1);
        geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
        
        const material = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const plane1 = new THREE.Mesh(geometry1, material);
        scene.add(plane1);

        // Оси координат для отладки
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        // Параметры вращения камеры
        const cameraParams = {
            radius: 7,
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
        const handleKeyDown = (event) => {
            keyStateRef.current[event.key.toLowerCase()] = true;
            console.log("Key pressed:", event.key);
        };
        
        const handleKeyUp = (event) => {
            keyStateRef.current[event.key.toLowerCase()] = false;
        };

        // Добавляем обработчики на window
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Анимация
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            
            const rotationSpeed = 0.05;
            const zoomSpeed = 0.2;
            
            // Вращение камеры вокруг целевой точки
            if (keyStateRef.current['q']) {
                cameraParams.theta -= rotationSpeed;
                console.log("Rotating left with Q");
            }
            if (keyStateRef.current['e']) {
                cameraParams.theta += rotationSpeed;
                console.log("Rotating right with E");
            }
            if (keyStateRef.current['w']) {
                cameraParams.phi -= rotationSpeed;
                console.log("Rotating up with W");
            }
            if (keyStateRef.current['s']) {
                cameraParams.phi += rotationSpeed;
                console.log("Rotating down with S");
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