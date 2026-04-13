/**
 * 0o - Translator
 * Purpose: Instruction Decoder (Geometric OpCodes)
 * Repo: 0o
 */

import { RDRAM } from '../modules/rdram.js';

export const Translator = {
    // Mapping geometric byte values to functional commands
    opMap: {
        0x01: 'MOVE_X',
        0x02: 'MOVE_Y',
        0x08: 'MIRROR_FOLD', // Reference to 018810 logic
        0x10: 'PULSE_AUDIO',
        0xFF: 'HALT'
    },

    init() {
        console.log("0o Translator: Instruction decoder active.");
    },

    /**
     * Decodes a memory address into a command.
     * @param {number} address - RDRAM address to decode.
     */
    decode(address) {
        const rawByte = RDRAM.read32(address) & 0xFF;
        const command = this.opMap[rawByte] || 'NOP'; // No Operation if unknown
        
        return {
            op: command,
            value: rawByte,
            address: address
        };
    },

    /**
     * Translates a batch of data from the ZeroPage.
     */
    translateBatch(start, length) {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(this.decode(start + i));
        }
        return sequence;
    }
};

export default Translator;
