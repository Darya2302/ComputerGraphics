document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('contrastBtn').addEventListener('click', applyContrast);
document.getElementById('histogramBtn').addEventListener('click', drawHistogram);

let imgElement = new Image();
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


function drawHistogram() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const histogram = new Array(256).fill(0);
    
    for (let i = 0; i < data.length; i += 4) {
        const brightness = data[i]; // Используем R для простоты
        histogram[brightness]++;
    }
    
    // Отображаем гистограмму
    const histogramCanvas = document.createElement('canvas');
    histogramCanvas.width = 256;
    histogramCanvas.height = 100;
    const hCtx = histogramCanvas.getContext('2d');

    for (let i = 0; i < histogram.length; i++) {
        const height = (histogram[i] / Math.max(...histogram)) * histogramCanvas.height;
        hCtx.fillStyle = 'black';
        hCtx.fillRect(i, histogramCanvas.height - height, 1, height);
    }
    
    document.getElementById('output').src = histogramCanvas.toDataURL();
}
