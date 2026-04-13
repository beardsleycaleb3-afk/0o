/**
 * 0o - Bridge
 * Purpose: I/O Abstraction Layer
 * Repo: 0o
 */

export const Bridge = {
    inputs: {
        up: false,
        down: false,
        left: false,
        right: false,
        a: false,
        b: false
    },

    init() {
        console.log("0o Bridge: I/O interface linked.");
        this.bindEvents();
    },

    /**
     * Maps physical keyboard events to 0o input states.
     */
    bindEvents() {
        window.addEventListener('keydown', (e) => this.updateKey(e.key, true));
        window.addEventListener('keyup', (e) => this.updateKey(e.key, false));
    },

    updateKey(key, isPressed) {
        const map = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'z': 'a',
            'x': 'b'
        };

        if (map[key]) {
            this.inputs[map[key]] = isPressed;
            // Push input state to ZeroPage for the Translator to read
            window.dispatchEvent(new CustomEvent('0o:input_change', { detail: this.inputs }));
        }
    },

    /**
     * Sends data back to the UI (e.g., status logs).
     */
    out(message) {
        const display = document.getElementById('0o-status-line');
        if (display) display.innerText = `> ${message}`;
    }
};

export default Bridge;
