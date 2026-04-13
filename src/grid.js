/**
 * 0o - Grid
 * Purpose: 960-tile DOM & Buffer Management
 * Repo: 0o
 */

export const Grid = {
    container: null,
    tiles: [],

    init(containerId) {
        console.log("0o Grid: Initializing 32x30 matrix...");
        this.container = document.getElementById(containerId);
        this.createGrid();
        
        window.addEventListener('0o:base_ready', (e) => this.render(e.detail.translated));
    },

    createGrid() {
        if (!this.container) return;
        this.container.innerHTML = '';
        this.tiles = [];

        // 32 columns x 30 rows = 960 tiles
        for (let i = 0; i < 960; i++) {
            const tile = document.createElement('div');
            tile.className = 'o-tile';
            tile.dataset.index = i;
            this.container.appendChild(tile);
            this.tiles.push(tile);
        }
    },

    /**
     * Updates the grid visual state based on translated data.
     */
    render(data) {
        // Clear previous state
        this.tiles.forEach(t => t.style.opacity = '0.1');

        data.forEach((node, i) => {
            if (i < 960) {
                const tile = this.tiles[i];
                tile.style.opacity = node.norm;
                tile.title = `HEX: ${node.hex} | DEC: ${node.dec}`;
                // Apply visual 'lit' state for active geometric points
                tile.classList.add('active');
            }
        });
    }
};

export default Grid;
