// Seleção de elementos
const playgroundBox = document.getElementById('playgroundBox');
const animationNameSelect = document.getElementById('animationName');
const durationInput = document.getElementById('duration');
const timingSelect = document.getElementById('timing');
const iterationsSelect = document.getElementById('iterations');
const directionSelect = document.getElementById('direction');
const delayInput = document.getElementById('delay');
const codeDisplay = document.getElementById('codeDisplay');
const durationValue = document.getElementById('durationValue');
const delayValue = document.getElementById('delayValue');

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Estado atual da animação
let currentAnimation = {
    name: 'bounce',
    duration: '2s',
    timing: 'ease',
    iterations: 'infinite',
    direction: 'normal',
    delay: '0s'
};

// Função para atualizar a animação
function updateAnimation() {
    currentAnimation = {
        name: animationNameSelect.value,
        duration: durationInput.value + 's',
        timing: timingSelect.value,
        iterations: iterationsSelect.value,
        direction: directionSelect.value,
        delay: delayInput.value + 's'
    };

    // Atualiza displays de valor
    durationValue.textContent = currentAnimation.duration;
    delayValue.textContent = currentAnimation.delay;

    // Aplica a animação
    applyAnimation();
    
    // Atualiza o código
    updateCodeDisplay();
}

// Função para aplicar a animação
function applyAnimation() {
    // Remove a animação atual
    playgroundBox.style.animation = 'none';
    
    // Force reflow para reiniciar a animação
    void playgroundBox.offsetWidth;
    
    // Aplica a nova animação
    const { name, duration, timing, iterations, direction, delay } = currentAnimation;
    playgroundBox.style.animation = `${name} ${duration} ${timing} ${delay} ${iterations} ${direction}`;
}

// Função para atualizar o display de código
function updateCodeDisplay() {
    const { name, duration, timing, iterations, direction, delay } = currentAnimation;
    
    codeDisplay.innerHTML = `
<span class="comment">/* Aplicar a animação */</span>
<span class="selector">.elemento</span> {
    <span class="property">animation-name</span>: <span class="value">${name}</span>;
    <span class="property">animation-duration</span>: <span class="value">${duration}</span>;
    <span class="property">animation-timing-function</span>: <span class="value">${timing}</span>;
    <span class="property">animation-delay</span>: <span class="value">${delay}</span>;
    <span class="property">animation-iteration-count</span>: <span class="value">${iterations}</span>;
    <span class="property">animation-direction</span>: <span class="value">${direction}</span>;
}

<span class="comment">/* Ou use o atalho (shorthand): */</span>
<span class="selector">.elemento</span> {
    <span class="property">animation</span>: <span class="value">${name} ${duration} ${timing} ${delay} ${iterations} ${direction}</span>;
}`;
}

// Botão Play
playBtn.addEventListener('click', () => {
    playgroundBox.classList.remove('paused');
    playgroundBox.style.animationPlayState = 'running';
});

// Botão Pause
pauseBtn.addEventListener('click', () => {
    playgroundBox.classList.add('paused');
    playgroundBox.style.animationPlayState = 'paused';
});

// Botão Reset
resetBtn.addEventListener('click', () => {
    playgroundBox.style.animation = 'none';
    void playgroundBox.offsetWidth;
    applyAnimation();
    playgroundBox.classList.remove('paused');
});

// Event Listeners dos controles
animationNameSelect.addEventListener('change', updateAnimation);
durationInput.addEventListener('input', updateAnimation);
timingSelect.addEventListener('change', updateAnimation);
iterationsSelect.addEventListener('change', updateAnimation);
directionSelect.addEventListener('change', updateAnimation);
delayInput.addEventListener('input', updateAnimation);

// Galeria de animações
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    const box = item.querySelector('.gallery-box');
    const animationName = item.getAttribute('data-animation');
    
    item.addEventListener('click', () => {
        // Remove animação de todos
        galleryItems.forEach(i => {
            const b = i.querySelector('.gallery-box');
            b.style.animation = 'none';
            i.classList.remove('active');
        });
        
        // Force reflow
        void box.offsetWidth;
        
        // Aplica animação no clicado
        box.style.animation = `${animationName} 1s ease`;
        item.classList.add('active');
        
        // Remove a classe após a animação
        setTimeout(() => {
            item.classList.remove('active');
        }, 1000);
    });
});

// Inicialização
updateAnimation();

// Efeitos visuais extras
console.log('%c🎬 Guia de CSS Animation carregado com sucesso!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cExplore as animações e divirta-se aprendendo! 🚀', 'color: #764ba2; font-size: 14px;');

// Easter egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        playgroundBox.innerHTML = '🎉';
        playgroundBox.style.animation = 'spin 0.5s ease, pulse 0.5s ease, bounce 0.5s ease';
        console.log('%c🎮 KONAMI CODE ATIVADO! Você é um mestre! 🏆', 'color: gold; font-size: 20px; font-weight: bold;');
        
        setTimeout(() => {
            playgroundBox.innerHTML = '<span>🚀</span>';
            applyAnimation();
        }, 2000);
    }
});