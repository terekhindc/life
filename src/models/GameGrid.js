/**
 * Game Grid Model
 * Manages the game state and grid operations
 */
export class GameGrid {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.grid = this.createEmptyGrid();
        this.nextGrid = this.createEmptyGrid();
        this.generation = 0;
    }

    createEmptyGrid() {
        return Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(0));
    }

    getCell(row, col) {
        return this.grid[row][col];
    }

    setCell(row, col, value) {
        if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            this.grid[row][col] = value;
        }
    }

    clear() {
        this.grid = this.createEmptyGrid();
        this.nextGrid = this.createEmptyGrid();
        this.generation = 0;
    }

    getLiveCellsCount() {
        let count = 0;
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                count += this.grid[i][j];
            }
        }
        return count;
    }

    setPattern(pattern, startRow, startCol) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const row = startRow + i;
                const col = startCol + j;
                if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
                    this.grid[row][col] = pattern[i][j];
                }
            }
        }
    }

    swapGrids() {
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
        this.generation++;
    }

    getGrid() {
        return this.grid;
    }

    getNextGrid() {
        return this.nextGrid;
    }

    setNextGridCell(row, col, value) {
        if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            this.nextGrid[row][col] = value;
        }
    }
}
