# Conway's Game of Life - Multi-Theme Edition

Interactive web version of John Conway's classic "Game of Life" with multiple visual themes and modern UI/UX design.

## 🎮 Features

### Core Functionality
- **Classic Game Rules**: Implementation of original Conway's Game of Life rules
- **Interactive Controls**: Click to create/delete cells, drag to draw patterns
- **Adjustable Speed**: Simulation speed control from 1 to 20
- **Various Grid Sizes**: 30×30, 50×50, 75×75, 100×100
- **Keyboard Shortcuts**: Space (start/pause), Ctrl+R (reset), Ctrl+C (clear), Ctrl+T (theme switch)

### Visual Themes
1. **Classic** - Minimalist design in the style of early games
2. **Cyber** - Cyberpunk style with neon colors and glitch effects
3. **Bioluminescent** - Deep sea theme with bioluminescent effects
4. **Retro** - Retro-futuristic monitor with CRT effects
5. **Architectural** - Technical blueprint with architectural elements
6. **Laboratory** - Laboratory under microscope with microbial colonies
7. **Watercolor** - Artistic watercolor painting simulation

### Technical Features
- **HTML5 Canvas**: High-performance rendering
- **CSS3 Animations**: Smooth transitions and effects
- **JavaScript ES6+**: Modern code with classes
- **Responsive Design**: Adaptation to various screens
- **LocalStorage**: Theme selection persistence

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/terekhindc/life.git
cd life
```

2. Open `index.html` in a browser or run a local server:
```bash
python3 -m http.server 8000
```

3. Open http://localhost:8000 in your browser

## 🎨 Themes

### Classic Edition
- Simple black and white design
- Courier New font
- Minimalist interface elements

### Cyber Edition
- Neon colors (#ff006e, #00d4ff, #ffd700)
- Glitch effects and RGB shifts
- Orbitron font
- Animated particles

### Bioluminescent Edition
- Deep sea colors (#00ffff, #00ff88)
- Pulsing effects
- Organic animations
- Gradient transitions

### Retro Edition
- CRT monitor style
- Green/amber colors
- Scanning line effects
- Phosphor animations

### Architectural Edition
- Technical blueprint
- White lines on blue background
- Millimeter grid
- Drawing animations

### Laboratory Edition
- Petri dish style
- Microbial colonies
- Agar nutrient medium
- Organic cell shapes

### Watercolor Edition
- Artistic brush strokes
- Color blending effects
- Paper texture background
- Age-based color changes

## 🎯 Controls

### Mouse
- **Click**: Create/delete cell
- **Drag**: Draw patterns
- **Click buttons**: Game control

### Keyboard
- **Space**: Start/pause
- **Ctrl+R**: Reset game
- **Ctrl+C**: Clear field
- **Ctrl+T**: Next theme

### Interface
- **START**: Launch simulation
- **PAUSE**: Pause
- **RESET**: Reset to initial state
- **CLEAR**: Clear field
- **SPEED**: Speed adjustment (1-20)
- **GRID SIZE**: Grid size

## 📊 Statistics
- **GENERATION**: Current generation
- **LIVE CELLS**: Number of live cells

## 🛠 Technologies

- **HTML5**: Structure and Canvas API
- **CSS3**: Styles, animations, variables
- **JavaScript ES6+**: Game logic and interactivity
- **Web APIs**: LocalStorage, Canvas, Events

## 📁 Project Structure

```
life/
├── index.html          # Main HTML page
├── styles.css          # All styles and themes
├── script.js           # Game logic
└── README.md           # Documentation
```

## 🎨 Customization

### Adding a New Theme
1. Add CSS variables to `:root`
2. Create `body.theme-[name]` class
3. Add styles for interface elements
4. Update JavaScript for switching
5. Add preview icon

### Modifying Game Rules
Modify the `updateGrid()` method in the `GameOfLife` class

## 🤝 Contributing

1. Fork the repository
2. Create a branch for your feature
3. Make your changes
4. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Andrei Terekhin**
- GitHub: [@terekhindc](https://github.com/terekhindc)
- Project: [Conway's Game of Life](https://github.com/terekhindc/life)

## 🙏 Acknowledgments

- John Conway for creating the original game
- Developer community for inspiration
- Everyone who tested and provided feedback

---

**Enjoy exploring cellular automata! 🧬✨**
