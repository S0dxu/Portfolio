// What are you doing here ??

// Welcome.js (schermata home)
/* const welcome = document.querySelector('.welcome');
const link = document.querySelector('.welcome .top a');
const goButton = document.querySelector('#go');

document.body.classList.add('hide-scrollbar');

function removeHideScrollbar() {
    document.body.classList.remove('hide-scrollbar');
    welcome.classList.add('slide-out');
}

link.addEventListener('click', removeHideScrollbar);
goButton.addEventListener('click', removeHideScrollbar); */

// Cursor.js (cursore custom)
const cursorSmall = document.querySelector('.cursor-small');
const cursorLarge = document.querySelector('.cursor-large');
let iconElement = null;
let hasIcon = false;

let mouseX = 0;
let mouseY = 0;
let largeX = 0;
let largeY = 0;

const easeFactor = 0.1;
const delay = 100;

document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;

    const adjustedX = mouseX - window.pageXOffset;
    const adjustedY = mouseY - window.pageYOffset;

    cursorSmall.style.opacity = 1;
    cursorSmall.style.left = adjustedX + 'px';
    cursorSmall.style.top = adjustedY + 'px';

    largeX = adjustedX;
    largeY = adjustedY;
});

function moveCursor() {
    const dx = (largeX - parseInt(cursorLarge.style.left || '0', 10)) * easeFactor;
    const dy = (largeY - parseInt(cursorLarge.style.top || '0', 10)) * easeFactor;

    if (hasIcon) {
        cursorLarge.style.left = largeX + 'px';
        cursorLarge.style.top = largeY + 'px';
    } else {
        cursorLarge.style.left = parseInt(cursorLarge.style.left || '0', 10) + dx + 'px';
        cursorLarge.style.top = parseInt(cursorLarge.style.top || '0', 10) + dy + 'px';
    }

    requestAnimationFrame(moveCursor);
}

setTimeout(moveCursor, delay);

const interactiveElements = document.querySelectorAll('.project, #go, .top a, .switch, #projects img');

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', function() {
        cursorLarge.classList.add('cursor-pointer', 'show');

        if (!iconElement) {
            iconElement = document.createElement('i');
            iconElement.className = 'bx bx-show';
            cursorLarge.appendChild(iconElement);
            hasIcon = true;
        }
    });

    element.addEventListener('mouseout', function() {
        cursorLarge.classList.remove('cursor-pointer', 'show');

        if (iconElement) {
            cursorLarge.removeChild(iconElement);
            iconElement = null;
            hasIcon = false;
        }
    });
});

// Switch.js (night / light mode))
function toggleSwitch() {
    const root = document.documentElement;
    const switchElement = document.querySelector('.switch');
    switchElement.classList.toggle('active');

    const currentColor = getComputedStyle(root).getPropertyValue('--background-main-color').trim();
    const currentMainColor = getComputedStyle(root).getPropertyValue('--main-color').trim();
    const currentThirdColor = getComputedStyle(root).getPropertyValue('--background-third-color').trim();
    const Secondcolor = getComputedStyle(root).getPropertyValue('--second-color').trim();

    root.style.setProperty('--background-main-color', currentColor === '#ffffff' ? '#0c041c' : '#ffffff');
    root.style.setProperty('--main-color', currentMainColor === '#000000' ? '#ffffff' : '#000000');
    root.style.setProperty('--background-third-color', currentThirdColor === '#f4f4f4' ? '#20192e' : '#f4f4f4');
    root.style.setProperty('--second-color', Secondcolor === '#9e9e9e' ? '#39253f' : '#9e9e9e');
}

// Carousel.js (transition per i progetti)
let slideIndex = 0;

function changeSlide(n) {
    const slides = document.querySelectorAll('.carousel-inner .item');
    slideIndex += n;
    
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    const newTransformValue = -slideIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
}

changeSlide(0);

// fallingDots.js (background)
const background = document.getElementById('background');

const minDotSize = 1;
const maxDotSize = 40;
const minDuration = 4;
const maxDuration = 9;
const dotInterval = 200;

function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    const size = Math.random() * (maxDotSize - minDotSize) + minDotSize;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    const startX = Math.random() * window.innerWidth;
    dot.style.left = `${startX}px`;
    dot.style.top = `-${size}px`;

    const opacity = Math.random() * 0.01 + 0.1;
    dot.style.backgroundColor = `rgba(238, 72, 238, ${opacity})`;

    background.appendChild(dot);

    animateDot(dot);
}

function animateDot(dot) {
    const endY = window.innerHeight + dot.offsetHeight;
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;

    dot.style.transition = `transform ${duration}s linear`;
    dot.style.transform = `translateY(${endY}px)`;

    dot.addEventListener('transitionend', () => {
        dot.remove();
    });
}

function createDots() {
    createDot();
    setTimeout(createDots, dotInterval);
}

createDots();

// Limit.js (limitazione movimento)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});  // evita di aprire ispeziona con il tasto destro

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
}); // evita il trascinamento di immagini o testo

document.body.style.userSelect = 'none';