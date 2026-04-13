/**
 * 0o - WASM
 * Purpose: High-Speed Logic Gate Interface
 * Repo: 0o
 */

export const WASM = {
    instance: null,
    ready: false,

    /**
     * Attempts to initialize a WASM binary for heavy geometric lifting.
     * @param {string} binaryPath - Path to the .wasm file.
     */
    async init(binaryPath) {
        if (!binaryPath) {
            console.log("0o WASM: No binary provided. Operating in JS-Fallback mode.");
            return;
        }

        try {
            const response = await fetch(binaryPath);
            const buffer = await response.arrayBuffer();
            const module = await WebAssembly.instantiate(buffer);
            this.instance = module.instance;
            this.ready = true;
            console.log("0o WASM: High-speed logic gate locked and loaded.");
        } catch (e) {
            console.warn("0o WASM: Initialization failed. Falling back to Kernel.js logic.");
        }
    },

    /**
     * Executes a low-level function if the gate is active.
     */
    exec(funcName, ...args) {
        if (this.ready && this.instance.exports[funcName]) {
            return this.instance.exports[funcName](...args);
        }
        return null;
    }
};

export default WASM;
