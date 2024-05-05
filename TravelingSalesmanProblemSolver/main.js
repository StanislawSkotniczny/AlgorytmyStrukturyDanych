const canvas = document.getElementById('tspCanvas');
const ctx = canvas.getContext('2d');
const points = [];
const numPoints = 100;

document.addEventListener('DOMContentLoaded', function() {
    generatePoints();
});

function generatePoints() {
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        points.push({x, y, label: `Point ${i + 1}`});
    }
    updateDropdowns();
    updatePoints();
}

function updateDropdowns() {
    const startPointSelect = document.getElementById('startPoint');
    const endPointSelect = document.getElementById('endPoint');
    startPointSelect.innerHTML = '';
    endPointSelect.innerHTML = '';
    points.forEach((point, index) => {
        startPointSelect.options.add(new Option(point.label, index));
        endPointSelect.options.add(new Option(point.label, index));
    });
}

function updatePoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const start = parseInt(document.getElementById('startPoint').value);
    const end = parseInt(document.getElementById('endPoint').value);

    points.forEach((point, index) => {
        drawPoint(point.x, point.y, index === start ? 'green' : index === end ? 'red' : 'black', 5);
    });
}

function solveTSP() {
    const start = parseInt(document.getElementById('startPoint').value);
    const end = parseInt(document.getElementById('endPoint').value);
    let current = points[start];
    let path = [current];
    let toVisit = points.filter((_, index) => index !== start && index !== end);

    while (toVisit.length > 0) {
        let next = toVisit.reduce((nearest, point) => 
            distance(current, point) < distance(current, nearest) ? point : nearest, toVisit[0]);
        path.push(next);
        toVisit = toVisit.filter(point => point !== next);
        current = next;
    }
    
    path.push(points[end]); 
    drawPath(path);
}

function drawPath(path) {
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach(point => {
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    });
    ctx.lineTo(path[0].x, path[0].y); 
    ctx.stroke();
}

function drawPoint(x, y, color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fill();
}

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}
