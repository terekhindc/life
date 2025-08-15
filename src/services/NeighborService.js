/**
 * Neighbor Service
 * Handles neighbor counting for different game rules
 */
export class NeighborService {
    constructor(gameConfig) {
        this.config = gameConfig;
    }

    countNeighbors(grid, row, col, theme) {
        const themeConfig = this.config.getThemeConfig(theme);
        const range = themeConfig.neighborRange;
        
        if (theme === '3d') {
            return this.count3DNeighbors(grid, row, col, range);
        } else {
            return this.count2DNeighbors(grid, row, col, range);
        }
    }

    count2DNeighbors(grid, row, col, range = 1) {
        let count = 0;
        const gridSize = grid.length;
        
        for (let i = -range; i <= range; i++) {
            for (let j = -range; j <= range; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = (row + i + gridSize) % gridSize;
                const newCol = (col + j + gridSize) % gridSize;
                count += grid[newRow][newCol];
            }
        }
        return count;
    }

    count3DNeighbors(grid, row, col, range = 2) {
        let count = 0;
        const gridSize = grid.length;
        
        for (let i = -range; i <= range; i++) {
            for (let j = -range; j <= range; j++) {
                if (i === 0 && j === 0) continue;
                
                const distance = Math.max(Math.abs(i), Math.abs(j));
                const weight = distance === 1 ? 1 : 0.3;
                
                const newRow = (row + i + gridSize) % gridSize;
                const newCol = (col + j + gridSize) % gridSize;
                count += grid[newRow][newCol] * weight;
            }
        }
        return Math.round(count);
    }

    shouldSurvive(neighbors, theme) {
        const themeConfig = this.config.getThemeConfig(theme);
        const rules = themeConfig.neighborRules;
        
        return neighbors >= rules.minSurvive && neighbors <= rules.maxSurvive;
    }

    shouldBirth(neighbors, theme) {
        const themeConfig = this.config.getThemeConfig(theme);
        const rules = themeConfig.neighborRules;
        
        if (Array.isArray(rules.birth)) {
            return rules.birth.includes(neighbors);
        } else {
            return neighbors === rules.birth;
        }
    }
}
