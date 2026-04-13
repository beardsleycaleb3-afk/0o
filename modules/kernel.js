/**
 * 0o - Kernel
 * Purpose: ZeroPage Management & 358Hz Bethlehem Oscillator
 * Repo: 0o
 */

export const Kernel = {
    // 256 bytes of ultra-fast access memory
    zeroPage: new Uint8Array(256),
    frequency: 358, // Bethlehem Hz
    isRunning: false,
    cycleCount: 0,

    /**
     * Boot sequence for the 0o environment.
     */
    boot() {
        console.log("0o Kernel: Booting Bethlehem Oscillator at 358Hz...");
        this.zeroPage.fill(0);
        this.isRunning = true;
        this.startOscillator();
    },

    /**
     * High-precision timing loop.
     */
    startOscillator() {
        const interval = 1000 / this.frequency;
        
        const tick = () => {
            if (!this.isRunning) return;
            this.cycleCount++;
            
            // Pulse logic for external modules to hook into
            this.onPulse(this.cycleCount);
            
            setTimeout(tick, interval);
        };
        
        tick();
    },

    /**
     * Hook for NMI (Non-Maskable Interrupts) and pulses.
     */
    onPulse(cycle) {
        // Reserved for Clock.js and Manager.js hooks
    },

    readZP(address) {
        return this.zeroPage[address & 0xFF];
    },

    writeZP(address, value) {
        this.zeroPage[address & 0xFF] = value;
    }
};

export default Kernel;
