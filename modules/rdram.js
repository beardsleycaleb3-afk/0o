/**
 * 0o - RDRAM
 * Purpose: Unified Memory Simulation (Direct Access)
 * Repo: 0o
 */

export const RDRAM = {
    // 4MB of virtualized high-speed memory
    size: 4 * 1024 * 1024,
    buffer: null,
    view: null,

    init() {
        console.log("0o RDRAM: Allocating 4MB Unified Memory...");
        this.buffer = new ArrayBuffer(this.size);
        this.view = new DataView(this.buffer);
        this.clear();
    },

    /**
     * Wipes memory to zero.
     */
    clear() {
        new Uint8Array(this.buffer).fill(0);
    },

    /**
     * Fast 32-bit write for geometric coordinates or mirror states.
     * @param {number} address - Memory offset.
     * @param {number} value - 32-bit unsigned integer.
     */
    write32(address, value) {
        if (address >= 0 && address <= this.size - 4) {
            this.view.setUint32(address, value, true); // Little-endian
        }
    },

    /**
     * Fast 32-bit read.
     * @param {number} address - Memory offset.
     */
    read32(address) {
        if (address >= 0 && address <= this.size - 4) {
            return this.view.getUint32(address, true);
        }
        return 0;
    },

    /**
     * Directly export a slice of memory for the PPU or Canvas.
     */
    getHeap() {
        return new Uint8Array(this.buffer);
    }
};

export default RDRAM;
