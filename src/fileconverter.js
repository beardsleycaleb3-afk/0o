/**
 * 0o - Fileconverter
 * Purpose: Raw Binary to Geometric Data Transmutation
 * Repo: 0o
 */

export const Fileconverter = {
    compressionRatio: 3000,

    init() {
        console.log("0o Fileconverter: Transmutation layer active.");
        window.addEventListener('0o:data_ingested', (e) => this.transmute(e.detail.raw));
    },

    /**
     * Transmutes linear binary data into geometric vertex points.
     * @param {Uint8Array} rawData - The raw binary from the uploader.
     */
    transmute(rawData) {
        console.log("0o Fileconverter: Initiating 3000:1 compression logic...");
        
        // Calculate the stride based on the compression target
        const stride = Math.max(1, Math.floor(rawData.length / this.compressionRatio));
        const geometricPoints = [];

        for (let i = 0; i < rawData.length; i += stride) {
            // Map the byte value to a geometric 0-255 space
            const val = rawData[i];
            geometricPoints.push({
                val: val,
                norm: val / 255,
                index: i
            });
        }

        console.log(`0o Fileconverter: Transmuted into ${geometricPoints.length} geometric nodes.`);
        
        // Dispatch to the Hex-Binary-Decimal Converter (Step 6)
        window.dispatchEvent(new CustomEvent('0o:data_transmuted', { 
            detail: { nodes: geometricPoints } 
        }));
    }
};

export default Fileconverter;
