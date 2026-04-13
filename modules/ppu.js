/**
 * 0o - Picture Processing Unit (PPU)
 * Purpose: Geometric-to-Grid Pixel Mapping
 * Repo: 0o
 */

export const PPU = {
    resolution: { x: 32, y: 30 }, // 960 Tiles
    grid: new Uint8Array(960),
    mirrorMode: '018810',

    init() {
        console.log("0o PPU: Initializing 960-tile grid...");
        this.reset();
    },

    reset() {
        this.grid.fill(0);
    },

    /**
     * Maps geometric coordinate to a specific tile index.
     * @param {number} x - Geometric X
     * @param {number} y - Geometric Y
     */
    mapCoordinate(x, y) {
        const index = (y * this.resolution.x) + x;
        return index < 960 ? index : -1;
    },

    updateTile(index, value) {
        if (index >= 0 && index < 960) {
            this.grid[index] = value;
        }
    }
};

export default PPU;
