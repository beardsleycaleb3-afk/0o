/**
 * 0o - Injection
 * Purpose: Hot-Swap Logic & Module Replacement
 * Repo: 0o
 */

export const Injection = {
    registry: new Map(),

    /**
     * Injects a new function into a live module.
     * @param {Object} targetModule - The module to modify.
     * @param {string} key - The function name to override.
     * @param {Function} newLogic - The new geometric logic.
     */
    hotSwap(targetModule, key, newLogic) {
        console.log(`0o Injection: Swapping logic for [${key}]...`);
        
        // Backup original logic
        if (!this.registry.has(key)) {
            this.registry.set(key, targetModule[key]);
        }

        targetModule[key] = newLogic.bind(targetModule);
        window.dispatchEvent(new CustomEvent('0o:logic_injected', { detail: { key } }));
    },

    restore(targetModule, key) {
        if (this.registry.has(key)) {
            targetModule[key] = this.registry.get(key);
            console.log(`0o Injection: Restored original [${key}].`);
        }
    }
};

export default Injection;}
