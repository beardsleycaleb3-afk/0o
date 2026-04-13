/**
 * 0o - Audio
 * Purpose: WebAudio Kernel & Frequency Analysis
 * Repo: 0o
 */

export const Audio = {
    context: null,
    masterBus: null,
    analyser: null,
    oscillator: null,

    init() {
        console.log("0o Audio: Initializing WebAudio Context...");
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.context.createAnalyser();
        this.masterBus = this.context.createGain();
        
        this.masterBus.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        
        this.masterBus.gain.value = 0.1; // Safety first
    },

    /**
     * Triggers a pulse based on geometric input.
     * @param {number} freq - Frequency in Hz (defaults to Bethlehem 358Hz)
     */
    triggerPulse(freq = 358) {
        if (!this.context) return;
        
        const osc = this.context.createOscillator();
        const env = this.context.createGain();
        
        osc.type = 'square'; // Geometric wave
        osc.frequency.setValueAtTime(freq, this.context.currentTime);
        
        env.gain.setValueAtTime(0, this.context.currentTime);
        env.gain.linearRampToValueAtTime(0.5, this.context.currentTime + 0.01);
        env.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.1);
        
        osc.connect(env);
        env.connect(this.masterBus);
        
        osc.start();
        osc.stop(this.context.currentTime + 0.1);
    },

    getByteFrequencyData() {
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(data);
        return data;
    }
};

export default Audio;
