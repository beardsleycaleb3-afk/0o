/**
 * 0o - Scene
 * Purpose: 3D Camera & Transformation Logic
 * Repo: 0o
 */

export const Scene = {
    camera: {
        position: { x: 0, y: 0, z: 500 },
        fov: 75,
        aspect: 1
    },
    transformations: [],

    init(canvasWidth, canvasHeight) {
        console.log("0o Scene: Initializing view projection...");
        this.updateAspect(canvasWidth, canvasHeight);
    },

    /**
     * Updates the aspect ratio for the projection matrix.
     */
    updateAspect(width, height) {
        this.camera.aspect = width / height;
    },

    /**
     * Projects a 3D geometric point into 2D screen space.
     * @param {Object} point - {x, y, z}
     */
    project(point) {
        // Simple perspective projection for the 0o grid
        const factor = this.camera.position.z / (this.camera.position.z + point.z);
        return {
            x: point.x * factor,
            y: point.y * factor,
            scale: factor
        };
    },

    /**
     * Resets transformation stack for the next NMI pulse.
     */
    reset() {
        this.transformations = [];
    }
};

export default Scene;
