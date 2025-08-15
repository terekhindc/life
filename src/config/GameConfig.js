/**
 * Game Configuration Class
 * Contains all game settings and constants
 */
export class GameConfig {
    constructor() {
        this.gridSize = 50;
        this.cellSize = 10;
        this.updateInterval = 100;
        this.themes = ['classic', 'cyber', 'bioluminescent', 'retro', 'architectural', 'laboratory', '3d', 'watercolor'];
        this.defaultTheme = 'classic';
        
        // Theme-specific configurations
        this.themeConfigs = {
            classic: {
                name: 'CLASSIC EDITION',
                subtitle: 'ORIGINAL CONWAY\'S GAME OF LIFE',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            },
            cyber: {
                name: 'CYBER EDITION',
                subtitle: 'NEON DIGITAL SIMULATION',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            },
            bioluminescent: {
                name: 'BIOLUMINESCENT EDITION',
                subtitle: 'ORGANIC LIGHT SIMULATION',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            },
            retro: {
                name: 'RETRO EDITION',
                subtitle: 'CRT TERMINAL SIMULATION',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            },
            architectural: {
                name: 'ARCHITECTURAL EDITION',
                subtitle: 'BLUEPRINT SIMULATION',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            },
            laboratory: {
                name: 'LABORATORY EDITION',
                subtitle: 'MICROBIAL COLONY SIMULATION',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            },
            '3d': {
                name: '3D EDITION',
                subtitle: 'NON-EUCLIDEAN SPACE SIMULATION',
                neighborRules: { minSurvive: 4, maxSurvive: 8, birth: [5, 6, 7] },
                neighborRange: 2
            },
            watercolor: {
                name: 'WATERCOLOR EDITION',
                subtitle: 'ARTISTIC PAINTING SIMULATION',
                neighborRules: { minSurvive: 2, maxSurvive: 3, birth: 3 },
                neighborRange: 1
            }
        };
    }

    getThemeConfig(theme) {
        return this.themeConfigs[theme] || this.themeConfigs[this.defaultTheme];
    }

    getCanvasSize() {
        return this.gridSize * this.cellSize;
    }
}
