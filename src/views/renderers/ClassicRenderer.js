import { BaseRenderer } from './BaseRenderer.js';

/**
 * Classic Theme Renderer
 * Renders cells in the original Conway's Game of Life style
 */
export class ClassicRenderer extends BaseRenderer {
    drawGrid() {
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 0.5;
        this.clearShadow();
    }

    drawCell(x, y, size, neighbors, generation) {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x, y, size, size);
        
        // Add simple border
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(x, y, size, size);
    }
}
