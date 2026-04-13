/**
 * 0o - Uploader
 * Purpose: Binary-to-Bitmap Stream Ingestion
 * Repo: 0o
 */

export const Uploader = {
    inputElement: null,

    init(targetId) {
        console.log("0o Uploader: Initializing ingestion stream...");
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'file';
        this.inputElement.id = '0o-upload-stream';
        this.inputElement.style.display = 'none';
        
        this.inputElement.addEventListener('change', (e) => this.handleFile(e));
        document.body.appendChild(this.inputElement);
    },

    trigger() {
        this.inputElement.click();
    },

    /**
     * Reads file as ArrayBuffer for raw geometric processing.
     */
    async handleFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const buffer = await file.arrayBuffer();
        const binaryData = new Uint8Array(buffer);
        
        console.log(`0o Uploader: Stream captured ${binaryData.length} bytes.`);
        
        // Dispatch to Fileconverter (Step 5)
        window.dispatchEvent(new CustomEvent('0o:data_ingested', { 
            detail: { raw: binaryData, name: file.name } 
        }));
    }
};

export default Uploader;
