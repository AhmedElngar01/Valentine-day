// Extracted from love.html

// Configuration
const phrases = [
    "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!",
    "Surely not?", "You might regret this!", "Give it another thought!",
    "Are you absolutely certain?", "This could be a mistake!", "Have a heart!",
    "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?",
    "Is that your final answer?", "You're breaking my heart ;("
];

let noCount = 0;

// Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionView = document.getElementById('question-view');
const successView = document.getElementById('success-view');
const heartsContainer = document.getElementById('hearts-container');

// Functions
function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
}

function moveNoButton() {
    if (noCount >= 5) {
        // Keep the button inside the .glass-card so it doesn't wander off-screen
        const card = document.querySelector('.glass-card');
        if (!card) return;

        // Ensure the container is the positioned ancestor (we set .glass-card { position: relative })
        noBtn.style.position = 'absolute';

        // Compute available area inside the card
        const padding = 16; // inset padding from edges
        const maxX = Math.max(0, card.clientWidth - noBtn.offsetWidth - padding);
        const maxY = Math.max(0, card.clientHeight - noBtn.offsetHeight - padding - 40); // leave space for headings

        const x = Math.random() * maxX + padding / 2;
        const y = Math.random() * maxY + padding / 2 + 120; // bias downward so it stays near buttons

        noBtn.style.left = `${Math.round(x)}px`;
        noBtn.style.top = `${Math.round(y)}px`;
    }
}

// Event Listeners
noBtn.addEventListener('click', () => {
    noCount++;
    noBtn.innerText = getNoButtonText();
    
    // Increase Yes button size
    const baseFontSize = 1.25; // rem
    const growthFactor = 0.5; // rem
    const newFontSize = baseFontSize + (noCount * growthFactor);
    
    yesBtn.style.fontSize = `${newFontSize}rem`;
    yesBtn.style.padding = `${newFontSize * 0.8}rem ${newFontSize * 2}rem`;

    if (noCount >= 4) {
        moveNoButton();
    }
});

// Mouse hover interaction for runaway button
noBtn.addEventListener('mouseover', () => {
    if (noCount >= 5) {
        moveNoButton();
    }
});

// Touch support for mobile runaway
noBtn.addEventListener('touchstart', (e) => {
     if (noCount >= 5) {
        e.preventDefault();
        moveNoButton();
    }
});

yesBtn.addEventListener('click', () => {
    questionView.classList.add('hidden');
    successView.classList.remove('hidden');
    successView.classList.add('flex-col');
    
    // Trigger effects
    createParticles();
});

// 1. Generate Floating Hearts (Background)
function createHearts() {
    const colors = ['#ffccd5', '#ffb3c1', '#ff8fa3', '#fff0f3'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = "heart-icon animate-float";
        heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5 4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
        
        const size = Math.random() * 30 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.color = color;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// 2. Simple Confetti/Particle Effect for "Yes"
function createParticles() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        // Start from center
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        document.body.appendChild(particle);
        
        // Animate
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100; // Distance to travel
        const duration = Math.random() * 1000 + 500;
        
        particle.animate([
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0, .9, .57, 1)',
        }).onfinish = () => particle.remove();
    }
}

// Initialize
createHearts();
