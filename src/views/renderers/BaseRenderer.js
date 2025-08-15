/**
 * Base Renderer Class
 * Abstract base class for all theme renderers
 */
export class BaseRenderer {
    constructor(ctx, cellSize) {
        this.ctx = ctx;
        this.cellSize = cellSize;
    }

    // Abstract methods that must be implemented by subclasses
    drawGrid() {
        throw new Error('drawGrid() must be implemented by subclass');
    }

    drawCell(x, y, size, neighbors, generation) {
        throw new Error('drawCell() must be implemented by subclass');
    }

    // Common utility methods
    getCellPosition(i, j) {
        const x = j * this.cellSize + 1;
        const y = i * this.cellSize + 1;
        const size = this.cellSize - 2;
        return { x, y, size };
    }

    createGradient(x, y, size, colorStops) {
        const gradient = this.ctx.createRadialGradient(
            x + size/2, y + size/2, 0,
            x + size/2, y + size/2, size/2
        );
        
        colorStops.forEach(stop => {
            gradient.addColorStop(stop.offset, stop.color);
        });
        
        return gradient;
    }

    setShadow(color, blur) {
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur;
    }

    clearShadow() {
        this.ctx.shadowBlur = 0;
    }
}
