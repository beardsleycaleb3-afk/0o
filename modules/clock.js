
/**
 * 0o - Clock
 * Purpose: Master Timing & NMI Pulse
 * Repo: 0o
 */

import { Kernel } from './kernel.js';

export const Clock = {
    startTime: 0,
    elapsed: 0,
    frames: 0,
    lastNMI: 0,

    init() {
        console.log("0o Clock: Synchronizing with Kernel...");
        this.startTime = performance.now();
        this.bindToKernel();
    },

    /**
     * Listens to the Kernel's 358Hz pulse to trigger timing interrupts.
     */
    bindToKernel() {
        Kernel.onPulse = (cycle) => {
            this.elapsed = performance.now() - this.startTime;
            
            // Trigger a Non-Maskable Interrupt every 6 pulses (~60fps equivalent)
            if (cycle % 6 === 0) {
                this.triggerNMI();
            }
        };
    },

    /**
     * NMI ensures that the geometric rendering and mirror-folding
     * are prioritized over secondary UI tasks.
     */
    triggerNMI() {
        this.frames++;
        this.lastNMI = performance.now();
        
        // Dispatch to Renderer (Step 26) and Manager (Step 8)
        window.dispatchEvent(new CustomEvent('0o:nmi_pulse', {
            detail: { 
                frame: this.frames, 
                timestamp: this.lastNMI 
            }
        }));
    },

    getUptime() {
        return (this.elapsed / 1000).toFixed(2);
    }
};

export default Clock;
