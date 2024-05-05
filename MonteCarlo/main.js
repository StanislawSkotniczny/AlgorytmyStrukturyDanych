function calculateIntegral() {
    const numPoints = 100000;  
    const a = 0;
    const b = Math.PI;
    let underCurve = 0;

    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * (b - a) + a;  
        const y = Math.random() * 3;  

        if (y < (Math.sin(x) + Math.sin(2*x) + Math.sin(5*x))) {
            underCurve++;
        }
    }

    const area = (underCurve / numPoints) * (b - a) * 3;
    document.getElementById('result').textContent = 'Approximate integral of f(x) = sin(x) + sin(2x) + sin(5x) from 0 to π is ' + area.toFixed(4);
}

document.addEventListener('DOMContentLoaded', function() {
    calculateIntegral();  
});
