class GameOfLife {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 50;
        this.cellSize = 10;
        this.isRunning = false;
        this.generation = 0;
        this.speed = 10;
        this.animationId = null;
        this.currentTheme = 'classic';
        
        this.grid = [];
        this.nextGrid = [];
        
        // Polyfill for roundRect if not supported
        if (!this.ctx.roundRect) {
            this.ctx.roundRect = function(x, y, width, height, radius) {
                this.beginPath();
                this.moveTo(x + radius, y);
                this.lineTo(x + width - radius, y);
                this.quadraticCurveTo(x + width, y, x + width, y + radius);
                this.lineTo(x + width, y + height - radius);
                this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                this.lineTo(x + radius, y + height);
                this.quadraticCurveTo(x, y + height, x, y + height - radius);
                this.lineTo(x, y + radius);
                this.quadraticCurveTo(x, y, x + radius, y);
                this.closePath();
            };
        }
        
        this.initializeGrid();
        this.setupEventListeners();
        this.resizeCanvas();
        this.createParticles();
        this.loadTheme();
        this.hideLoadingScreen();
        this.draw();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('gameOfLifeTheme') || 'classic';
        this.setTheme(savedTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        
        // Set body class based on theme
        document.body.className = '';
        if (theme === 'classic') {
            document.body.classList.add('theme-classic');
        } else if (theme === 'cyber') {
            document.body.classList.add('theme-cyber');
        } else if (theme === 'bioluminescent') {
            document.body.classList.add('theme-bioluminescent');
        } else if (theme === 'retro') {
            document.body.classList.add('theme-retro');
        } else if (theme === 'architectural') {
            document.body.classList.add('theme-architectural');
        } else if (theme === 'laboratory') {
            document.body.classList.add('theme-laboratory');
        } else if (theme === '3d') {
            document.body.classList.add('theme-3d');
        }
        
        // Update theme switcher
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
        
        // Update edition text based on theme
        const editionText = document.getElementById('editionText');
        const headerTitle = document.getElementById('gameTitle');
        
        if (editionText && headerTitle) {
            switch (theme) {
                case 'classic':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = 'CLASSIC EDITION • CELLULAR AUTOMATA SIMULATION';
                    break;
                case 'cyber':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = 'CYBER EDITION • NEURAL NETWORK SIMULATION';
                    break;
                case 'bioluminescent':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = 'BIOLUMINESCENT EDITION • ORGANIC LIFE SIMULATION';
                    break;
                case 'retro':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = 'RETRO EDITION • CRT TERMINAL SIMULATION';
                    break;
                case 'architectural':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = 'ARCHITECTURAL EDITION • TECHNICAL DRAWING SIMULATION';
                    break;
                case 'laboratory':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = 'LABORATORY EDITION • MICROBIAL COLONY SIMULATION';
                    break;
                case '3d':
                    headerTitle.textContent = "CONWAY'S GAME OF LIFE";
                    editionText.textContent = '3D EDITION • NON-EUCLIDEAN SPACE SIMULATION';
                    break;
            }
        }
        
        // Add data-text attribute for cyber glitch effect
        const header = document.getElementById('gameTitle');
        if (header) {
            header.setAttribute('data-text', header.textContent);
        }
        
        // Save to localStorage
        localStorage.setItem('gameOfLifeTheme', theme);
        
        // Redraw with new theme
        this.draw();
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    initializeGrid() {
        this.grid = [];
        this.nextGrid = [];
        
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            this.nextGrid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = 0;
                this.nextGrid[i][j] = 0;
            }
        }
    }
    
    resizeCanvas() {
        this.canvas.width = this.gridSize * this.cellSize;
        this.canvas.height = this.gridSize * this.cellSize;
    }
    
    setupEventListeners() {
        // Theme switcher
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.setTheme(theme);
                this.addButtonEffect(e.currentTarget);
            });
        });
        
        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        
        // Speed control
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            speedValue.textContent = this.speed;
            this.addGlowEffect(speedValue);
        });
        
        // Grid size control
        document.getElementById('gridSize').addEventListener('change', (e) => {
            this.gridSize = parseInt(e.target.value);
            this.cellSize = Math.max(6, Math.min(15, 600 / this.gridSize));
            this.initializeGrid();
            this.resizeCanvas();
            this.draw();
            this.updateInfo();
        });
        
        // Canvas click events
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Pattern buttons
        document.querySelectorAll('.pattern-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pattern = e.target.closest('.pattern-btn').dataset.pattern;
                this.loadPattern(pattern);
                this.addButtonEffect(e.target.closest('.pattern-btn'));
            });
        });
        
        // Prevent context menu on canvas
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    if (this.isRunning) this.pause();
                    else this.start();
                    break;
                case 'KeyR':
                    if (e.ctrlKey) this.reset();
                    break;
                case 'KeyC':
                    if (e.ctrlKey) this.clear();
                    break;
                case 'KeyT':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        const themes = ['classic', 'cyber', 'bioluminescent', 'retro', 'architectural', 'laboratory', '3d'];
                        const currentIndex = themes.indexOf(this.currentTheme);
                        const nextIndex = (currentIndex + 1) % themes.length;
                        this.setTheme(themes[nextIndex]);
                    }
                    break;
            }
        });
    }
    
    addGlowEffect(element) {
        element.style.textShadow = '0 0 10px var(--accent-color)';
        setTimeout(() => {
            element.style.textShadow = '';
        }, 300);
    }
    
    addButtonEffect(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    handleCanvasClick(e) {
        if (this.isRunning) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);
        
        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            this.grid[y][x] = this.grid[y][x] ? 0 : 1;
            this.draw();
            this.updateInfo();
            this.addClickEffect(e.clientX, e.clientY);
        }
    }
    
    addClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: clickEffect 0.5s ease-out forwards;
        `;
        document.body.appendChild(effect);
        
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 500);
    }
    
    isMouseDown = false;
    lastCell = null;
    
    handleMouseDown(e) {
        if (this.isRunning) return;
        this.isMouseDown = true;
        this.handleCanvasClick(e);
    }
    
    handleMouseMove(e) {
        if (!this.isMouseDown || this.isRunning) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);
        
        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            const currentCell = `${x},${y}`;
            if (currentCell !== this.lastCell) {
                this.grid[y][x] = this.grid[y][x] ? 0 : 1;
                this.lastCell = currentCell;
                this.draw();
                this.updateInfo();
            }
        }
    }
    
    handleMouseUp() {
        this.isMouseDown = false;
        this.lastCell = null;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        this.addButtonEffect(startBtn);
        this.animate();
    }
    
    pause() {
        this.isRunning = false;
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        this.addButtonEffect(pauseBtn);
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    reset() {
        this.pause();
        this.generation = 0;
        this.initializeGrid();
        this.draw();
        this.updateInfo();
        this.addButtonEffect(document.getElementById('resetBtn'));
    }
    
    clear() {
        this.pause();
        this.generation = 0;
        this.initializeGrid();
        this.draw();
        this.updateInfo();
        this.addButtonEffect(document.getElementById('clearBtn'));
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.nextGeneration();
        this.draw();
        this.updateInfo();
        
        const delay = Math.max(50, 1000 - (this.speed * 50));
        setTimeout(() => {
            this.animationId = requestAnimationFrame(() => this.animate());
        }, delay);
    }
    
    nextGeneration() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const neighbors = this.countNeighbors(i, j);
                const current = this.grid[i][j];
                
                if (current === 1) {
                    // Live cell
                    if (neighbors < 2 || neighbors > 3) {
                        this.nextGrid[i][j] = 0; // Dies
                    } else {
                        this.nextGrid[i][j] = 1; // Survives
                    }
                } else {
                    // Dead cell
                    if (neighbors === 3) {
                        this.nextGrid[i][j] = 1; // Becomes alive
                    } else {
                        this.nextGrid[i][j] = 0; // Stays dead
                    }
                }
            }
        }
        
        // Swap grids
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
        this.generation++;
    }
    
    countNeighbors(row, col) {
        let count = 0;
        
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.gridSize && 
                    newCol >= 0 && newCol < this.gridSize) {
                    count += this.grid[newRow][newCol];
                }
            }
        }
        
        return count;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines with theme-specific styling
        if (this.currentTheme === 'cyber') {
            // Cyber theme: neon grid lines
            this.ctx.strokeStyle = '#ff006e';
            this.ctx.lineWidth = 0.8;
            this.ctx.shadowColor = '#ff006e';
            this.ctx.shadowBlur = 2;
        } else if (this.currentTheme === 'bioluminescent') {
            // Bioluminescent grid: subtle blue lines
            this.ctx.strokeStyle = '#2a2a4e';
            this.ctx.lineWidth = 0.3;
        } else if (this.currentTheme === 'retro') {
            // Retro theme: green scan lines
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 0.3;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.shadowBlur = 1;
        } else if (this.currentTheme === 'architectural') {
            // Architectural theme: technical drawing grid
            this.ctx.strokeStyle = '#87ceeb';
            this.ctx.lineWidth = 0.3;
            this.ctx.shadowColor = '#87ceeb';
            this.ctx.shadowBlur = 1;
        } else {
            // Classic theme: simple black lines
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 0.5;
        }
        
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= this.gridSize; i++) {
            const pos = i * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(pos, 0);
            this.ctx.lineTo(pos, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos);
            this.ctx.lineTo(this.canvas.width, pos);
            this.ctx.stroke();
        }
        
        // Reset shadow for cell drawing
        this.ctx.shadowBlur = 0;
        
        // Draw cells with theme-specific styling
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 1) {
                    const x = j * this.cellSize + 1;
                    const y = i * this.cellSize + 1;
                    const size = this.cellSize - 2;
                    
                    if (this.currentTheme === 'cyber') {
                        // Cyber theme: neon cells with glitch effect
                        const time = Date.now() * 0.001;
                        const glitchIntensity = 0.1 + 0.05 * Math.sin(time * 2 + i * 0.5 + j * 0.5);
                        
                        // Create neon gradient
                        const cellGradient = this.ctx.createRadialGradient(
                            x + size/2, y + size/2, 0,
                            x + size/2, y + size/2, size/2
                        );
                        cellGradient.addColorStop(0, '#ff006e');
                        cellGradient.addColorStop(0.5, '#ff006e');
                        cellGradient.addColorStop(1, '#00d4ff');
                        
                        this.ctx.fillStyle = cellGradient;
                        
                        // Add intense glow effect
                        this.ctx.shadowColor = '#ff006e';
                        this.ctx.shadowBlur = 8 + glitchIntensity * 10;
                        
                        // Draw cell with slight glitch offset
                        const glitchX = x + (Math.random() - 0.5) * glitchIntensity * 2;
                        const glitchY = y + (Math.random() - 0.5) * glitchIntensity * 2;
                        
                        this.ctx.fillRect(glitchX, glitchY, size, size);
                        
                        // Add secondary glow
                        this.ctx.shadowColor = '#00d4ff';
                        this.ctx.shadowBlur = 4;
                        this.ctx.fillRect(x, y, size, size);
                        
                        this.ctx.shadowBlur = 0;
                    } else if (this.currentTheme === 'bioluminescent') {
                        // Bioluminescent theme: organic glowing cells
                        const neighbors = this.countNeighbors(i, j);
                        const age = this.generation % 10; // Simple age calculation
                        
                        // Color based on age and neighbors
                        let cellColor, glowColor;
                        if (age < 3) {
                            // Young cells: bright cyan
                            cellColor = '#00ffff';
                            glowColor = '#00ffff';
                        } else if (age < 7) {
                            // Middle-aged cells: green-cyan
                            cellColor = '#00ff88';
                            glowColor = '#00ff88';
                        } else {
                            // Old cells: dimmer green
                            cellColor = '#00cc66';
                            glowColor = '#00cc66';
                        }
                        
                        // Create organic gradient
                        const cellGradient = this.ctx.createRadialGradient(
                            x + size/2, y + size/2, 0,
                            x + size/2, y + size/2, size/2
                        );
                        cellGradient.addColorStop(0, cellColor);
                        cellGradient.addColorStop(0.7, cellColor + '80');
                        cellGradient.addColorStop(1, cellColor + '40');
                        
                        this.ctx.fillStyle = cellGradient;
                        
                        // Add pulsing glow effect
                        const pulseIntensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.003 + i * 0.1 + j * 0.1);
                        this.ctx.shadowColor = glowColor;
                        this.ctx.shadowBlur = 5 * pulseIntensity;
                        
                        // Draw cell with organic shape
                        this.ctx.beginPath();
                        this.ctx.roundRect(x, y, size, size, 3);
                        this.ctx.fill();
                        
                        this.ctx.shadowBlur = 0;
                    } else if (this.currentTheme === 'retro') {
                        // Retro theme: bright green cells with phosphor effect
                        const time = Date.now() * 0.001;
                        const phosphorIntensity = 0.8 + 0.2 * Math.sin(time * 2 + i * 0.3 + j * 0.3);
                        
                        // Create phosphor glow effect
                        this.ctx.fillStyle = `rgba(0, 255, 0, ${phosphorIntensity})`;
                        this.ctx.fillRect(x, y, size, size);
                        
                        // Add scan line effect
                        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
                        this.ctx.fillRect(x, y, 1, size);
                        
                        // Add subtle glitch effect
                        if (Math.random() < 0.01) {
                            this.ctx.fillStyle = '#ffaa00';
                            this.ctx.fillRect(x + Math.random() * 2, y, 1, size);
                        }
                    } else if (this.currentTheme === 'architectural') {
                        // Architectural theme: technical drawing cells
                        const time = Date.now() * 0.001;
                        const neighbors = this.countNeighbors(i, j);
                        
                        // Determine cell style based on neighbors (stability)
                        let lineWidth = 1;
                        let cellColor = '#ffffff';
                        
                        if (neighbors === 2 || neighbors === 3) {
                            // Stable cells - thicker lines
                            lineWidth = 2;
                            cellColor = '#ffffff';
                        } else {
                            // Dynamic cells - thinner lines
                            lineWidth = 1;
                            cellColor = '#87ceeb';
                        }
                        
                        // Draw cell as geometric shape
                        this.ctx.strokeStyle = cellColor;
                        this.ctx.lineWidth = lineWidth;
                        this.ctx.fillStyle = 'transparent';
                        
                        // Create architectural drawing effect
                        this.ctx.beginPath();
                        this.ctx.moveTo(x, y);
                        this.ctx.lineTo(x + size, y);
                        this.ctx.lineTo(x + size, y + size);
                        this.ctx.lineTo(x, y + size);
                        this.ctx.closePath();
                        this.ctx.stroke();
                        
                        // Add diagonal lines for architectural feel
                        if (Math.random() < 0.3) {
                            this.ctx.beginPath();
                            this.ctx.moveTo(x, y);
                            this.ctx.lineTo(x + size, y + size);
                            this.ctx.stroke();
                        }
                        
                        // Add measurement marks
                        if (Math.random() < 0.2) {
                            this.ctx.beginPath();
                            this.ctx.moveTo(x + size/2, y - 2);
                            this.ctx.lineTo(x + size/2, y + 2);
                            this.ctx.stroke();
                        }
                    } else {
                        // Classic theme: simple black cells
                        this.ctx.fillStyle = '#000000';
                        this.ctx.fillRect(x, y, size, size);
                        
                        // Add simple border
                        this.ctx.strokeStyle = '#000000';
                        this.ctx.lineWidth = 0.5;
                        this.ctx.strokeRect(x, y, size, size);
                    }
                }
            }
        }
    }
    
    updateInfo() {
        const generationElement = document.getElementById('generationCount');
        const liveCellsElement = document.getElementById('liveCellsCount');
        
        generationElement.textContent = this.generation;
        
        let liveCells = 0;
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                liveCells += this.grid[i][j];
            }
        }
        liveCellsElement.textContent = liveCells;
        
        // Add pulse effect when numbers change
        if (this.generation % 10 === 0) {
            this.addGlowEffect(generationElement);
        }
        
        if (liveCells > 0 && liveCells % 50 === 0) {
            this.addGlowEffect(liveCellsElement);
        }
    }
    
    loadPattern(pattern) {
        this.pause();
        this.clear();
        
        const centerX = Math.floor(this.gridSize / 2);
        const centerY = Math.floor(this.gridSize / 2);
        
        switch (pattern) {
            case 'glider':
                this.setPattern([
                    [0, 1, 0],
                    [0, 0, 1],
                    [1, 1, 1]
                ], centerX - 1, centerY - 1);
                break;
                
            case 'blinker':
                this.setPattern([
                    [1, 1, 1]
                ], centerX - 1, centerY);
                break;
                
            case 'toad':
                this.setPattern([
                    [0, 1, 1, 1],
                    [1, 1, 1, 0]
                ], centerX - 2, centerY);
                break;
                
            case 'beacon':
                this.setPattern([
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1]
                ], centerX - 2, centerY - 2);
                break;
                
            case 'pulsar':
                this.setPattern([
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
                ], centerX - 6, centerY - 6);
                break;
                
            case 'gosper':
                // Gosper Glider Gun (simplified version)
                this.setPattern([
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ], centerX - 19, centerY - 5);
                break;
                
            case 'random':
                for (let i = 0; i < this.gridSize; i++) {
                    for (let j = 0; j < this.gridSize; j++) {
                        this.grid[i][j] = Math.random() < 0.3 ? 1 : 0;
                    }
                }
                break;
        }
        
        this.draw();
        this.updateInfo();
    }
    
    setPattern(pattern, startX, startY) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const x = startX + j;
                const y = startY + i;
                
                if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                    this.grid[y][x] = pattern[i][j];
                }
            }
        }
    }
}

// Add CSS for click effect animation
const style = document.createElement('style');
style.textContent = `
    @keyframes clickEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GameOfLife();
});
