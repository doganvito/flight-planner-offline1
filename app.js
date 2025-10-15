const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let waypoints = [];
let playing = false;
let lastTap = 0;
let score = 0;
let fuel = 100;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'lime';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < waypoints.length; i++) {
    const wp = waypoints[i];
    if (i === 0) ctx.moveTo(wp.x, wp.y);
    else ctx.lineTo(wp.x, wp.y);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(wp.x, wp.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.stroke();
}

function addWaypoint(x, y) {
  if (playing) return;
  waypoints.push({ x, y });
  document.getElementById('wpCount').textContent = waypoints.length;
  draw();
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  addWaypoint(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTap < 300) togglePause();
  lastTap = now;
  const touch = e.changedTouches[0];
  const rect = canvas.getBoundingClientRect();
  addWaypoint(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener('dblclick', togglePause);

function togglePause() {
  playing = !playing;
}

document.getElementById('playBtn').addEventListener('click', () => playing = true);
document.getElementById('clearBtn').addEventListener('click', () => {
  waypoints = [];
  draw();
});
