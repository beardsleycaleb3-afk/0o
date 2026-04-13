
/**
 * 0o - Base
 * Purpose: Base-N Translation (Hex, Binary, Decimal)
 * Repo: 0o
 */

export const Base = {
    init() {
        console.log("0o Base: Translation layer active.");
        window.addEventListener('0o:data_transmuted', (e) => this.process(e.detail.nodes));
    },

    /**
     * Converts geometric nodes into multiple base representations.
     */
    process(nodes) {
        const translated = nodes.map(node => ({
            dec: node.val,
            hex: node.val.toString(16).toUpperCase().padStart(2, '0'),
            bin: node.val.toString(2).padStart(8, '0'),
            norm: node.norm
        }));

        console.log("0o Base: Nodes translated to multi-base format.");

        // Dispatch to Grid (Step 7)
        window.dispatchEvent(new CustomEvent('0o:base_ready', { 
            detail: { translated } 
        }));
    },

    toHex(val) { return val.toString(16).toUpperCase(); },
    toBin(val) { return val.toString(2); },
    toDec(str, base) { return parseInt(str, base); }
};

export default Base;
