# CodeStreak: No Zero Days 🚀

> **Protect the streak. Let the streak protect your future.**

A motivational web platform designed to shift focus from social media streaks (Snapchat) to skill-building streaks (LeetCode/Coding). Built for students to encourage consistency in their coding journey.

## 🌟 Features

*   **Interactive Streak Counter**: Dynamic visualization of coding consistency.
*   **Comparison Engine**: Visual contrast between the "instant gratification" of social media and the "long-term reward" of coding.
*   **Challenge Section**: A "Golden Rule" guide to starting a daily coding habit (Minimum 1 LeetCode problem/day).
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop experiences.
*   **Performance Focused**: Lightweight (Vanilla JS/CSS) implementation for instant load times.

## 🛠️ Technologies

*   **HTML5**: Semantic structure.
*   **CSS3**: Custom properties, Flexbox/Grid, and linear-gradient aesthetics.
*   **JavaScript (ES6+)**: Intersection Observers for scroll reveals, dynamic content updates, and particle effects.

## 🚀 Setup

1.  Clone the repository.
2.  Open `index.html` in your browser.
    *   *No build steps or dependencies required.*

## 📂 Project Structure

```
├── index.html     # Main entry point
├── style.css      # Global styles and animations
├── script.js      # Core logic (particles, scroll reveal, counters)
└── README.md      # Project documentation
```

## 🤝 Contribution

Feel free to fork this project and add your own "Streak" ideas!

---

## 🎨 The Art of Typography & Animation

> "Typography is the voice of your design. Animation is its body language."

This project heavily utilizes advanced typography and CSS animations to create an immersive experience. Below is a comprehensive guide to the text effects and animation techniques considered "Best in Class" for modern web design, many of which are implemented in this project.

### 1. The Power of `Orbitron` & `Poppins`

We selected a dual-font strategy to create visual hierarchy:

*   **Orbitron (The Hero)**: A geometric sans-serif typeface that screams "Future" and "Tech". Used for:
    *   Main Headlines (`<h1>`)
    *   Counters & Statistics
    *   "No Zero Days" messaging
    *   *Why it works*: Its wide stance and square curves make it readable even when applying heavy effects like glows or gradients.

*   **Poppins (The Body)**: A clean, geometric sans-serif that balances the aggression of Orbitron. Used for:
    *   Paragraphs
    *   Navigation
    *   Footer text
    *   *Why it works*: High x-height makes it extremely legible on both mobile and desktop screens.

### 2. Best-in-Class Text Effects (CSS)

#### A. The "Liquid Gradient" Text
Instead of flat colors, we use moving gradients clipped to text. This creates a "living" feel.

```css
.gradient-text {
    background: linear-gradient(
        135deg, 
        #667eea 0%, 
        #764ba2 50%, 
        #f093fb 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientFlow 5s ease infinite;
}

@keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

#### B. The "Neon Cyberpunk" Glow
Used for high-impact stats or warnings. The key is multiple drop-shadow layers.

```css
.neon-text {
    color: #fff;
    text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #ff00de,
        0 0 30px #ff00de,
        0 0 40px #ff00de;
    transition: text-shadow 0.3s ease-in-out;
}

.neon-text:hover {
    text-shadow: 
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 30px #ff00de,
        0 0 40px #ff00de,
        0 0 70px #ff00de,
        0 0 80px #ff00de;
}
```

#### C. The "Glitch" Effect (Advanced)
A popular effect for tech-focused sites. It involves splitting the text into three layers (Red, Blue, Green) and offsetting them.

```css
/* Base Glitch Class */
.glitch {
    position: relative;
    color: white;
    font-size: 4rem;
    font-weight: bold;
}

.glitch::before,
.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0a; /* Matches bg */
}

/* Red Shift */
.glitch::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

/* Blue Shift */
.glitch::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim-2 5s infinite linear alternate-reverse;
}
```

### 3. Kinetic Typography (JavaScript)

While CSS handles static effects, JavaScript brings text to life through motion.

#### A. The "Scramble" Reveal
Similar to the "Matrix" rain, this effect cycles random characters before settling on the final text.

```javascript
// Pseudo-code concept
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function scramble(element) {
    let iteration = 0;
    const originalText = element.dataset.value;
    
    const interval = setInterval(() => {
        element.innerText = originalText.split("")
            .map((letter, index) => {
                if(index < iteration) return originalText[index];
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if(iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}
```

#### B. Scroll-Triggered Stagger
Using `IntersectionObserver` to animate lines of text one by one as they enter the viewport.

```css
/* The 'Reveal' Class used in this project */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}
```

### 4. Accessibility & Performance Checklist

When implementing advanced text animations, always adhere to these rules:

1.  **Reduce Motion Preference**:
    ```css
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
    ```
2.  **Contrast Ratios**: ensure your "Glow" effects don't make text unreadable. Always have a solid font color fallback.
3.  **GPU Acceleration**: Use `transform: translate3d(0,0,0)` to force hardware acceleration for smooth text scrolling.
4.  **Font Loading**: Use `font-display: swap;` in your `@font-face` rules to prevent "Flash of Invisible Text" (FOIT).

### 5. Future Roadmap: 3D Typography

The next frontier for this project would be **Three.js text geometries**:
*   **Floating Text**: 3D meshes that rotate and react to mouse pointers.
*   **Refractive Glass Text**: Text objects that distort the background behind them.

---

> This documentation serves as a style guide for future contributors to maintain the high visual standard of the CodeStreak platform.
