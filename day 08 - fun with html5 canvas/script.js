const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");

let isDrawing = false;
let direction = true;
let lastX = 0;
let lastY = 0;
let hue = 0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.strokeStyle = "#BADA55";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 100;

const draw = e => {
  if (!isDrawing) return;

  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context.beginPath();
  context.lineTo(e.offsetX, e.offsetY);
  context.moveTo(lastX, lastY);
  context.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;

  if (hue >= 360) hue = 0;

  if (context.lineWidth >= 100 || context.lineWidth <= 1)
    direction = !direction;

  if (direction) context.lineWidth++;
  else context.lineWidth--;
};

canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
