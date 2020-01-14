const width = 500;
const height = 500;
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
const maxDiff = Math.sqrt(width*width + height*height);

ctx.fillStyle = "green";
ctx.fillRect(0, 0, width, height);