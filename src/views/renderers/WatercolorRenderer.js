import { BaseRenderer } from './BaseRenderer.js';

/**
 * Watercolor Theme Renderer
 * Renders cells as watercolor brush strokes with blending effects
 */
export class WatercolorRenderer extends BaseRenderer {
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 107, 157, 0.1)';
        this.ctx.lineWidth = 0.2;
        this.setShadow('rgba(255, 107, 157, 0.05)', 0.5);
    }

    drawCell(x, y, size, neighbors, generation) {
        const time = Date.now() * 0.001;
        
        // Determine watercolor properties based on generation and neighbors
        let brushColor, strokeColor;
        const age = generation % 12;
        
        if (age < 4) {
            // Young cells: bright pink
            brushColor = '#ff6b9d';
            strokeColor = '#ff6b9d';
        } else if (age < 8) {
            // Middle-aged cells: teal
            brushColor = '#4ecdc4';
            strokeColor = '#4ecdc4';
        } else {
            // Old cells: yellow
            brushColor = '#ffe66d';
            strokeColor = '#ffe66d';
        }
        
        // Create watercolor brush stroke effect
        const centerX = x + size/2;
        const centerY = y + size/2;
        const brushSize = size * (0.7 + Math.random() * 0.6);
        
        // Calculate watercolor spread based on neighbors
        const spreadIntensity = 0.3 + 0.4 * Math.sin(time * 2 + x * 0.1 + y * 0.1);
        const spreadRadius = brushSize * (1 + spreadIntensity * 0.5);
        
        this.ctx.save();
        
        // Create watercolor gradient
        const gradient = this.ctx.createRadialGradient(
            centerX + (Math.random() - 0.5) * 3, 
            centerY + (Math.random() - 0.5) * 3, 0,
            centerX, centerY, spreadRadius
        );
        
        gradient.addColorStop(0, brushColor + 'cc'); // Semi-transparent center
        gradient.addColorStop(0.4, brushColor + '99'); // More transparent middle
        gradient.addColorStop(0.7, brushColor + '66'); // Very transparent edge
        gradient.addColorStop(1, brushColor + '22'); // Almost transparent edge
        
        this.ctx.fillStyle = gradient;
        
        // Add watercolor spread effect
        this.ctx.beginPath();
        
        // Create irregular brush stroke shape
        const numPoints = 8 + Math.floor(Math.random() * 6);
        for (let p = 0; p < numPoints; p++) {
            const angle = (p / numPoints) * 2 * Math.PI;
            const pointRadius = spreadRadius * (0.6 + Math.random() * 0.8);
            const pointX = centerX + Math.cos(angle) * pointRadius;
            const pointY = centerY + Math.sin(angle) * pointRadius;
            
            if (p === 0) {
                this.ctx.moveTo(pointX, pointY);
            } else {
                this.ctx.lineTo(pointX, pointY);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        
        // Add brush stroke texture
        this.ctx.strokeStyle = strokeColor + '88';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Draw brush stroke lines
        for (let i = 0; i < 3; i++) {
            const strokeLength = brushSize * (0.3 + Math.random() * 0.4);
            const strokeAngle = Math.random() * Math.PI * 2;
            const startX = centerX + Math.cos(strokeAngle) * strokeLength * 0.3;
            const startY = centerY + Math.sin(strokeAngle) * strokeLength * 0.3;
            const endX = centerX + Math.cos(strokeAngle) * strokeLength;
            const endY = centerY + Math.sin(strokeAngle) * strokeLength;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
        
        // Add drying effect for dying cells
        if (neighbors < 2 || neighbors > 3) {
            const dryPulse = 0.1 + 0.1 * Math.sin(time * 3 + x * 0.2 + y * 0.2);
            this.ctx.fillStyle = 'rgba(139, 69, 19, ' + (0.2 * dryPulse) + ')'; // Brown dried paint
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, size * 0.3 * dryPulse, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        
        // Add color blending for reproducing cells
        if (neighbors === 2 || neighbors === 3) {
            const blendPulse = 0.4 + 0.3 * Math.sin(time * 1.5 + x * 0.15 + y * 0.15);
            this.ctx.fillStyle = brushColor + Math.floor(blendPulse * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(centerX + (Math.random() - 0.5) * 6, 
                       centerY + (Math.random() - 0.5) * 6, 
                       size * 0.2 * blendPulse, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
}
