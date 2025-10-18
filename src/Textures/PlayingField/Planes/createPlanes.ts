import * as THREE from "three";
import { fieldSteps } from "../fieldParams";
import { sizeNegitive } from "../fieldParams";
import { sizePozitive } from "../fieldParams";

const opacity = 0.02
export const createPlanes = (THREE: any, scene: THREE.Scene) => {

    const material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
    });
    const indices = [0, 1, 2, 0, 2, 3];

    for (let i = fieldSteps[0]; i < fieldSteps.length; i++) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            sizePozitive, sizePozitive, fieldSteps[i],
            sizePozitive, sizeNegitive, fieldSteps[i],
            sizeNegitive, sizeNegitive, fieldSteps[i],
            sizeNegitive, sizePozitive, fieldSteps[i]
        ]);

        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
    }

    for (let i = fieldSteps[0]; i < fieldSteps.length; i++) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            sizePozitive, fieldSteps[i], sizePozitive,
            sizePozitive, fieldSteps[i], sizeNegitive,
            sizeNegitive, fieldSteps[i], sizeNegitive,
            sizeNegitive, fieldSteps[i], sizePozitive
        ]);

        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
    }

    for (let i = fieldSteps[0]; i < fieldSteps.length; i++) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            fieldSteps[i], sizePozitive, sizePozitive,
            fieldSteps[i], sizeNegitive, sizePozitive,
            fieldSteps[i], sizeNegitive, sizeNegitive,
            fieldSteps[i], sizePozitive, sizeNegitive
        ]);

        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
    }

}