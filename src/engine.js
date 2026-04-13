/**
 * 0o - Engine
 * Purpose: Logic & Entity Orchestration (ECS)
 * Repo: 0o
 */

export const Engine = {
    entities: new Map(),
    nextEntityId: 0,

    init() {
        console.log("0o Engine: Logic core initialized.");
        window.addEventListener('0o:nmi_pulse', () => this.update());
    },

    /**
     * Spawns a new geometric entity in the 0o environment.
     * @param {Object} components - Initial state (pos, val, etc.)
     */
    spawn(components) {
        const id = this.nextEntityId++;
        this.entities.set(id, {
            id,
            active: true,
            ...components
        });
        return id;
    },

    /**
     * Main Logic Loop - Triggered by Clock NMI Pulse.
     */
    update() {
        if (this.entities.size === 0) return;

        for (let [id, entity] of this.entities) {
            if (!entity.active) continue;

            // Apply Mirror Logic (Step 15 Placeholder)
            this.applyPhysics(entity);
        }
    },

    applyPhysics(entity) {
        // Geometric drift logic
        if (entity.velocity) {
            entity.x += entity.velocity.x;
            entity.y += entity.velocity.y;
        }
    },

    purge() {
        this.entities.clear();
        this.nextEntityId = 0;
    }
};

export default Engine;
