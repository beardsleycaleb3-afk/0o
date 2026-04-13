/**
 * 0o - Canvas
 * Purpose: Coordinate System & Pixel Rendering
 * Repo: 0o
 */

export const Canvas = {
    ctx: null,
    scale: 1,

    init(canvasElement) {
        this.ctx = canvasElement.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },

    resize() {
        // Lock to 32x30 ratio
        const size = Math.min(window.innerWidth / 32, window.innerHeight / 30);
        this.scale = Math.floor(size);
        this.ctx.canvas.width = 32 * this.scale;
        this.ctx.canvas.height = 30 * this.scale;
        this.ctx.imageSmoothingEnabled = false; // Keep it sharp/geometric
    },

    drawPixel(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
    },

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
};

export default Canvas;
