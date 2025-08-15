/**
 * Theme Service
 * Manages theme switching and CSS variable application
 */
export class ThemeService {
    constructor() {
        this.currentTheme = 'classic';
        this.themeVariables = {
            classic: {
                '--primary-bg': '#ffffff',
                '--secondary-bg': '#f8f9fa',
                '--accent-color': '#007bff',
                '--accent-glow': 'rgba(0, 123, 255, 0.3)',
                '--success-color': '#28a745',
                '--warning-color': '#ffc107',
                '--danger-color': '#dc3545',
                '--text-primary': '#212529',
                '--text-secondary': '#6c757d',
                '--border-color': '#dee2e6',
                '--card-bg': 'rgba(255, 255, 255, 0.95)',
                '--glass-bg': 'rgba(255, 255, 255, 0.1)',
                '--shadow-glow': '0 0 20px rgba(0, 123, 255, 0.2)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.1)',
                '--accent-secondary': '#0056b3',
                '--gradient': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            },
            cyber: {
                '--primary-bg': '#0a0a0f',
                '--secondary-bg': '#1a1a2e',
                '--accent-color': '#ff006e',
                '--accent-glow': 'rgba(255, 0, 110, 0.3)',
                '--success-color': '#00d4ff',
                '--warning-color': '#ffd700',
                '--danger-color': '#ff006e',
                '--text-primary': '#ffffff',
                '--text-secondary': '#b0b0b0',
                '--border-color': '#333366',
                '--card-bg': 'rgba(26, 26, 46, 0.95)',
                '--glass-bg': 'rgba(255, 0, 110, 0.1)',
                '--shadow-glow': '0 0 20px rgba(255, 0, 110, 0.4)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.3)',
                '--accent-secondary': '#00d4ff',
                '--gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)'
            },
            bioluminescent: {
                '--primary-bg': '#0a0a1a',
                '--secondary-bg': '#1a1a3a',
                '--accent-color': '#00ffff',
                '--accent-glow': 'rgba(0, 255, 255, 0.3)',
                '--success-color': '#00ff88',
                '--warning-color': '#ffaa00',
                '--danger-color': '#ff0066',
                '--text-primary': '#ffffff',
                '--text-secondary': '#b0b0b0',
                '--border-color': '#2a2a4e',
                '--card-bg': 'rgba(26, 26, 58, 0.95)',
                '--glass-bg': 'rgba(0, 255, 255, 0.1)',
                '--shadow-glow': '0 0 20px rgba(0, 255, 255, 0.4)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.3)',
                '--accent-secondary': '#00ff88',
                '--gradient': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)'
            },
            retro: {
                '--primary-bg': '#000000',
                '--secondary-bg': '#0a0a0a',
                '--accent-color': '#00ff00',
                '--accent-glow': 'rgba(0, 255, 0, 0.3)',
                '--success-color': '#00ff00',
                '--warning-color': '#ffaa00',
                '--danger-color': '#ff0000',
                '--text-primary': '#00ff00',
                '--text-secondary': '#00aa00',
                '--border-color': '#00ff00',
                '--card-bg': 'rgba(0, 0, 0, 0.95)',
                '--glass-bg': 'rgba(0, 255, 0, 0.1)',
                '--shadow-glow': '0 0 20px rgba(0, 255, 0, 0.4)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.3)',
                '--retro-scan-line': 'linear-gradient(0deg, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%)',
                '--accent-secondary': '#ffaa00',
                '--gradient': 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)'
            },
            architectural: {
                '--primary-bg': '#1a3a5f',
                '--secondary-bg': '#0f2a4a',
                '--accent-color': '#ffffff',
                '--accent-glow': 'rgba(255, 255, 255, 0.3)',
                '--success-color': '#ffffff',
                '--warning-color': '#ffd700',
                '--danger-color': '#ff6b6b',
                '--text-primary': '#ffffff',
                '--text-secondary': '#87ceeb',
                '--border-color': '#4a90e2',
                '--card-bg': 'rgba(15, 42, 74, 0.95)',
                '--glass-bg': 'rgba(255, 255, 255, 0.05)',
                '--shadow-glow': '0 0 20px rgba(255, 255, 255, 0.3)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.6)',
                '--architectural-grid': 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                '--accent-secondary': '#87ceeb',
                '--gradient': 'linear-gradient(135deg, #1a3a5f 0%, #0f2a4a 100%)'
            },
            laboratory: {
                '--primary-bg': '#f0f8ff',
                '--secondary-bg': '#e6f3ff',
                '--accent-color': '#4a90e2',
                '--accent-glow': 'rgba(74, 144, 226, 0.3)',
                '--success-color': '#50c878',
                '--warning-color': '#ffa500',
                '--danger-color': '#ff6b6b',
                '--text-primary': '#2c3e50',
                '--text-secondary': '#34495e',
                '--border-color': '#bdc3c7',
                '--card-bg': 'rgba(240, 248, 255, 0.95)',
                '--glass-bg': 'rgba(74, 144, 226, 0.05)',
                '--shadow-glow': '0 0 20px rgba(74, 144, 226, 0.2)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.1)',
                '--laboratory-petri-border': 'linear-gradient(45deg, rgba(74, 144, 226, 0.8), rgba(74, 144, 226, 0.4))',
                '--laboratory-agar': 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.7) 50%, rgba(230, 243, 255, 0.5) 100%)',
                '--laboratory-agar-texture': 'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 248, 255, 0.6) 50%, rgba(230, 243, 255, 0.4) 100%)',
                '--accent-secondary': '#87ceeb',
                '--gradient': 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)'
            },
            watercolor: {
                '--primary-bg': '#f8f4f0',
                '--secondary-bg': '#f0e6e0',
                '--accent-color': '#ff6b9d',
                '--accent-glow': 'rgba(255, 107, 157, 0.3)',
                '--success-color': '#ff8fab',
                '--warning-color': '#ffb347',
                '--danger-color': '#ff6b6b',
                '--text-primary': '#4a4a4a',
                '--text-secondary': '#6b6b6b',
                '--border-color': '#d4a5a5',
                '--card-bg': 'rgba(248, 244, 240, 0.95)',
                '--glass-bg': 'rgba(255, 107, 157, 0.1)',
                '--shadow-glow': '0 0 20px rgba(255, 107, 157, 0.2)',
                '--shadow-card': '0 8px 32px rgba(0, 0, 0, 0.1)',
                '--watercolor-paper-color': '#f8f4f0',
                '--watercolor-paper-texture': 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)',
                '--watercolor-accent-secondary': '#ff8fab',
                '--accent-secondary': '#ff8fab',
                '--gradient': 'linear-gradient(135deg, #f8f4f0 0%, #f0e6e0 100%)'
            }
        };
    }

    setTheme(theme) {
        // Validate theme
        const validThemes = ['classic', 'cyber', 'bioluminescent', 'retro', 'architectural', 'laboratory', 'watercolor'];
        if (!validThemes.includes(theme)) {
            theme = 'classic';
        }
        this.currentTheme = theme;
        
        // Clear all theme classes first
        document.body.classList.remove('theme-classic', 'theme-cyber', 'theme-bioluminescent', 'theme-retro', 'theme-architectural', 'theme-laboratory', 'theme-watercolor');
        
        // Set body class based on theme
        document.body.classList.add(`theme-${theme}`);
        
        // Apply CSS variables
        this.updateCSSVariables(theme);
        
        // Save to localStorage
        localStorage.setItem('selectedTheme', theme);
    }

    updateCSSVariables(theme) {
        const root = document.documentElement;
        
        // Reset CSS variables to prevent conflicts
        const cssVars = [
            '--primary-bg', '--secondary-bg', '--accent-color', '--accent-glow',
            '--success-color', '--warning-color', '--danger-color', '--text-primary',
            '--text-secondary', '--border-color', '--card-bg', '--glass-bg',
            '--shadow-glow', '--shadow-card', '--gradient', '--accent-secondary',
            '--retro-scan-line', '--architectural-grid', '--laboratory-petri-border',
            '--laboratory-agar', '--laboratory-agar-texture', '--watercolor-paper-color',
            '--watercolor-paper-texture', '--watercolor-accent-secondary'
        ];
        cssVars.forEach(varName => {
            root.style.removeProperty(varName);
        });
        
        // Apply theme variables
        const variables = this.themeVariables[theme];
        if (variables) {
            Object.entries(variables).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        } else {
            console.error('No variables found for theme:', theme);
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('selectedTheme') || 'classic';
        this.setTheme(savedTheme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}
