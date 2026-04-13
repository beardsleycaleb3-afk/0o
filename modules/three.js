/**
 * 0o - Three
 * Purpose: 3D Engine Core Interface
 * Repo: 0o
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.150.0';

export const ThreeCore = {
    renderer: null,
    scene: null,
    activeMeshes: new Map(),

    /**
     * Bootstraps the WebGL context within the 0o repo.
     */
    init(canvasElement) {
        console.log("0o Three: Locking WebGL context...");
        
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElement,
            antialias: true,
            alpha: true
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Setup default geometric lighting
        const ambient = new THREE.AmbientLight(0x018810, 0.5);
        this.scene.add(ambient);
    },

    /**
     * Converts geometric nodes into 3D objects.
     */
    createNodeMesh(id, x, y, val) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x018810 });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(x, y, 0);
        this.scene.add(mesh);
        this.activeMeshes.set(id, mesh);
    },

    render(camera) {
        if (this.renderer && this.scene && camera) {
            this.renderer.render(this.scene, camera);
        }
    }
};

export default ThreeCore;
