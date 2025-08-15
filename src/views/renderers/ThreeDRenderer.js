import { BaseRenderer } from './BaseRenderer.js';

/**
 * 3D Theme Renderer
 * Renders cells as 3D cubes with depth and lighting
 */
export class ThreeDRenderer extends BaseRenderer {
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
        this.ctx.lineWidth = 0.3;
        this.setShadow('#00ffff', 1);
    }

    drawCell(x, y, size, neighbors, generation) {
        const time = Date.now() * 0.001;
        
        // Determine 3D cell properties based on generation
        let cubeColor, cubeGlow;
        if (generation < 5) {
            cubeColor = '#00ffff';
            cubeGlow = '#00ffff';
        } else if (generation < 10) {
            cubeColor = '#ff00ff';
            cubeGlow = '#ff00ff';
        } else {
            cubeColor = '#ffff00';
            cubeGlow = '#ffff00';
        }
        
        // Create 3D cube effect with perspective
        const centerX = x + size/2;
        const centerY = y + size/2;
        const cubeSize = size * 0.8;
        const depth = size * 0.3;
        
        // Calculate lighting based on position and time
        const lightAngle = Math.sin(time * 0.5 + x * 0.1 + y * 0.1);
        const brightness = 0.6 + 0.4 * lightAngle;
        
        this.ctx.save();
        
        // Front face (brightest)
        this.ctx.fillStyle = cubeColor + Math.floor(brightness * 255).toString(16).padStart(2, '0');
        this.setShadow(cubeGlow, 5);
        this.ctx.fillRect(centerX - cubeSize/2, centerY - cubeSize/2, cubeSize, cubeSize);
        
        // Top face (darker)
        this.ctx.fillStyle = cubeColor + Math.floor(brightness * 0.7 * 255).toString(16).padStart(2, '0');
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - cubeSize/2, centerY - cubeSize/2);
        this.ctx.lineTo(centerX - cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.lineTo(centerX + cubeSize/2, centerY - cubeSize/2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Right face (darkest)
        this.ctx.fillStyle = cubeColor + Math.floor(brightness * 0.5 * 255).toString(16).padStart(2, '0');
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + cubeSize/2, centerY - cubeSize/2);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY + cubeSize/2 - depth);
        this.ctx.lineTo(centerX + cubeSize/2, centerY + cubeSize/2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Add wireframe edges for 3D effect
        this.ctx.strokeStyle = cubeGlow;
        this.ctx.lineWidth = 1;
        this.clearShadow();
        
        // Front face edges
        this.ctx.strokeRect(centerX - cubeSize/2, centerY - cubeSize/2, cubeSize, cubeSize);
        
        // 3D connection lines
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - cubeSize/2, centerY - cubeSize/2);
        this.ctx.lineTo(centerX - cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.moveTo(centerX + cubeSize/2, centerY - cubeSize/2);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.moveTo(centerX + cubeSize/2, centerY + cubeSize/2);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY + cubeSize/2 - depth);
        this.ctx.moveTo(centerX - cubeSize/2, centerY + cubeSize/2);
        this.ctx.lineTo(centerX - cubeSize/2 + depth, centerY + cubeSize/2 - depth);
        this.ctx.stroke();
        
        // Top face edges
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY - cubeSize/2 - depth);
        this.ctx.lineTo(centerX + cubeSize/2 + depth, centerY + cubeSize/2 - depth);
        this.ctx.lineTo(centerX - cubeSize/2 + depth, centerY + cubeSize/2 - depth);
        this.ctx.closePath();
        this.ctx.stroke();
        
        this.ctx.restore();
        
        // Add rotation animation for active cells
        if (neighbors === 2 || neighbors === 3) {
            const rotationPulse = 0.3 + 0.2 * Math.sin(time * 2 + x * 0.2 + y * 0.2);
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(rotationPulse * 0.1);
            this.ctx.fillStyle = cubeGlow + Math.floor(rotationPulse * 255).toString(16).padStart(2, '0');
            this.ctx.fillRect(-2, -2, 4, 4);
            this.ctx.restore();
        }
    }
}
