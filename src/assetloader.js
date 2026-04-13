/**
 * 0o - Assetloader
 * Purpose: Pre-caching & Verification
 * Repo: 0o
 */

export const Assetloader = {
    assets: [
        'assets/icon.png',
        'assets/icon192.png'
    ],
    loadedCount: 0,

    /**
     * Start the loading and verification process.
     */
    async loadAll() {
        console.log("0o Assetloader: Verifying integrity of assets...");
        
        const loadPromises = this.assets.map(src => this.verifyAsset(src));
        
        try {
            await Promise.all(loadPromises);
            console.log("0o Assetloader: All assets verified. System green.");
            window.dispatchEvent(new CustomEvent('0o:assets_ready'));
        } catch (error) {
            console.error("0o Assetloader: Verification failed.", error);
        }
    },

    /**
     * Simple fetch verification to ensure asset exists and is reachable.
     */
    async verifyAsset(src) {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Missing asset: ${src}`);
        this.loadedCount++;
        return src;
    },

    getProgress() {
        return (this.loadedCount / this.assets.length) * 100;
    }
};

export default Assetloader;
