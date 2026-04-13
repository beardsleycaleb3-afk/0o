/**
 * 0o - Mirror
 * Purpose: 018810 Mirror Algebra & Symmetry
 * Repo: 0o
 */

export const Mirror = {
    // The 018810 Axial Sequence
    sequence: [0, 1, 8, 8, 1, 0],
    
    init() {
        console.log("0o Mirror: 018810 Symmetry Algebra active.");
    },

    /**
     * Calculates the mirrored index for a given tile.
     * @param {number} index - The primary 1D index (0-959).
     * @param {number} width - Grid width (32).
     */
    reflect(index, width = 32) {
        const x = index % width;
        const y = Math.floor(index / width);
        
        // Horizontal Mirror (X-Axis)
        const mx = (width - 1) - x;
        
        // Vertical Mirror (Y-Axis) - 30 rows total
        const my = (29 - y);

        return {
            original: index,
            hMirror: (y * width) + mx,
            vMirror: (my * width) + x,
            fullMirror: (my * width) + mx
        };
    },

    /**
     * Applies the 018810 sequence to modify geometric values.
     * @param {number} value - Raw byte value.
     * @param {number} step - Current step in the 018810 sequence.
     */
    applySymmetry(value, step) {
        const modifier = this.sequence[step % this.sequence.length];
        // XOR fold based on sequence value
        return value ^ (modifier << 4);
    }
};

export default Mirror;
