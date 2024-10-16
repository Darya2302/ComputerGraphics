const rInput = document.getElementById('r');
const gInput = document.getElementById('g');
const bInput = document.getElementById('b');
const hInput = document.getElementById('h');
const sInput = document.getElementById('s');
const lInput = document.getElementById('l');
const cInput = document.getElementById('c');
const mInput = document.getElementById('m');
const yInput = document.getElementById('y');
const kInput = document.getElementById('k');
const colorPicker = document.getElementById('colorPicker');

const rgbDisplay = document.getElementById('rgbDisplay');
const hlsDisplay = document.getElementById('hlsDisplay');
const cmykDisplay = document.getElementById('cmykDisplay');

// Функция для обновления всех значений
function updateColors() {
    const r = parseInt(rInput.value);
    const g = parseInt(gInput.value);
    const b = parseInt(bInput.value);

    // Обновление RGB отображения
    rgbDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Преобразование RGB в HLS
    const hls = rgbToHls(r, g, b);
    hInput.value = hls.h;
    sInput.value = hls.s * 100;
    lInput.value = hls.l * 100;

    // Преобразование RGB в CMYK
    const cmyk = rgbToCmyk(r, g, b);
    cInput.value = cmyk.c * 100;
    mInput.value = cmyk.m * 100;
    yInput.value = cmyk.y * 100;
    kInput.value = cmyk.k * 100;

    // Обновление HLS и CMYK отображения
    hlsDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    cmykDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Функция для преобразования RGB в HLS
function rgbToHls(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, l, s;

    l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s,
        l
    };
}

// Функция для преобразования RGB в CMYK
function rgbToCmyk(r, g, b) {
    const k = Math.min(1 - r / 255, 1 - g / 255, 1 - b / 255);
    const c = (1 - r / 255 - k) / (1 - k) || 0;
    const m = (1 - g / 255 - k) / (1 - k) || 0;
    const y = (1 - b / 255 - k) / (1 - k) || 0;
    return {
        c,
        m,
        y,
        k
    };
}

// Функция для преобразования HLS обратно в RGB
function hlsToRgb(h, l, s) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

// Слушатели событий
colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    rInput.value = r;
    gInput.value = g;
    bInput.value = b;
    updateColors();
});

[rInput, gInput, bInput, hInput, sInput, lInput, cInput, mInput, yInput, kInput].forEach(input => {
    input.addEventListener('input', updateColors);
});
