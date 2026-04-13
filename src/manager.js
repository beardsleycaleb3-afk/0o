/**
 * 0o - Manager
 * Purpose: State & Event Orchestrator
 * Repo: 0o
 */

import { Kernel } from '../modules/kernel.js';
import { Audio } from '../modules/audio.js';

export const Manager = {
    state: 'IDLE', // IDLE, BUSY, ERROR
    
    init() {
        console.log("0o Manager: Orchestrator online.");
        this.bindKernel();
    },

    /**
     * Binds the Manager to the 358Hz Bethlehem Oscillator.
     */
    bindKernel() {
        Kernel.onPulse = (cycle) => {
            if (this.state === 'BUSY') {
                // Perform micro-tasks per pulse
                this.updateDiagnostics(cycle);
            }
            
            // Sync audio pulse to oscillator every 8 cycles for rhythmic feedback
            if (cycle % 8 === 0) {
                Audio.triggerPulse(358);
            }
        };
    },

    setState(newState) {
        console.log(`0o Manager: State transition [${this.state} -> ${newState}]`);
        this.state = newState;
        document.body.dataset.state = newState; // For CSS hook
    },

    updateDiagnostics(cycle) {
        // Reserved for updating real-time bit-rate and geometric status
    }
};

export default Manager;
