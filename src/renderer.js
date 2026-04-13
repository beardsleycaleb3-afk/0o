/**
 * 0o - Renderer
 * Purpose: PPU Clear Cycles & Draw Coordination
 * Repo: 0o
 */

import { Canvas } from './canvas.js';
import { PPU } from '../modules/ppu.js';

export const Renderer = {
    init() {
        console.log("0o Renderer: Clear cycles synchronized.");
        window.addEventListener('0o:nmi_pulse', () => this.drawFrame());
    },

    drawFrame() {
        Canvas.clear();
        
        // Fetch raw buffer from PPU
        const buffer = PPU.getBuffer();
        
        for (let i = 0; i < buffer.length; i++) {
            if (buffer[i] > 0) {
                const x = i % 32;
                const y = Math.floor(i / 32);
                const alpha = buffer[i] / 255;
                Canvas.drawPixel(x, y, `rgba(1, 136, 16, ${alpha})`);
            }
        }
    }
};

export default Renderer;
