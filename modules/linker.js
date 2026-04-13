/**
 * 0o - Linker
 * Purpose: Symbol Resolution & Memory Mapping
 * Repo: 0o
 */

import { RDRAM } from './rdram.js';

export const Linker = {
    // Map of human-readable symbols to RDRAM addresses
    symbols: new Map(),
    nextFreeAddress: 0x0000,

    init() {
        console.log("0o Linker: Symbol resolution engine active.");
        this.registerInternalSymbols();
    },

    /**
     * Pre-allocates memory for core geometric registers.
     */
    registerInternalSymbols() {
        this.define('REG_MIRROR_MODE', 0x00);
        this.define('REG_PULSE_FREQ', 0x04);
        this.define('REG_GEOM_COUNT', 0x08);
        this.define('REG_COMP_RATIO', 0x0C); // 3000:1 storage
    },

    /**
     * Links a name to a memory address.
     */
    define(name, address = null) {
        const addr = address !== null ? address : this.nextFreeAddress;
        this.symbols.set(name, addr);
        if (address === null) this.nextFreeAddress += 4;
        return addr;
    },

    /**
     * Retrieves the memory address for a given symbol.
     */
    resolve(name) {
        if (!this.symbols.has(name)) {
            console.warn(`0o Linker: Symbol [${name}] not found.`);
            return -1;
        }
        return this.symbols.get(name);
    },

    /**
     * Writes a value directly to a named symbol's address.
     */
    setSymbolValue(name, value) {
        const addr = this.resolve(name);
        if (addr !== -1) RDRAM.write32(addr, value);
    }
};

export default Linker;
