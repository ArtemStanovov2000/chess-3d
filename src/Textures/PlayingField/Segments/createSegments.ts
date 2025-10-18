import { fieldSteps } from "../fieldParams";
import * as THREE from "three";

export const createSegments = (THREE: any, scene: THREE.Scene) => {
    // СОЗДАНИЕ ОТРЕЗКА
    const createLineSegment = (startPoint: THREE.Vector3, endPoint: THREE.Vector3, color = 0x0000ff) => {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            startPoint.x, startPoint.y, startPoint.z,
            endPoint.x, endPoint.y, endPoint.z
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.LineBasicMaterial({
            color: color,
            linewidth: 2,
            transparent: true,
            opacity: 1
        });

        const line = new THREE.Line(geometry, material);
        return line;
    };

    const startPoint = new THREE.Vector3(-4, 4, -4);
    const endPoint = new THREE.Vector3(4, 4, -4);
    const lineSegment = createLineSegment(startPoint, endPoint, 0x0000ff);
    scene.add(lineSegment);

    for (let i = fieldSteps[0]; i < fieldSteps.length; i++) {
        for (let j = fieldSteps[0]; j < fieldSteps.length; j++) {
            const startPoint = new THREE.Vector3(-4, fieldSteps[j], fieldSteps[i]);
            const endPoint = new THREE.Vector3(4, fieldSteps[j], fieldSteps[i]);
            const lineSegment = createLineSegment(startPoint, endPoint, 0x000045);
            scene.add(lineSegment);
        }
    }

    for (let i = fieldSteps[0]; i < fieldSteps.length; i++) {
        for (let j = fieldSteps[0]; j < fieldSteps.length; j++) {
            const startPoint = new THREE.Vector3(fieldSteps[j], -4, fieldSteps[i]);
            const endPoint = new THREE.Vector3(fieldSteps[j], 4, fieldSteps[i]);
            const lineSegment = createLineSegment(startPoint, endPoint, 0x000045);
            scene.add(lineSegment);
        }
    }
}