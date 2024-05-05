document.addEventListener('DOMContentLoaded', function() {
    const solveButton = document.getElementById('solveButton');
    if (solveButton) {
        solveButton.addEventListener('click', solveQuintic);
    }
});

function solveQuintic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);
    const e = parseFloat(document.getElementById('e').value);
    const f = parseFloat(document.getElementById('f').value);
    const result = document.getElementById('result');

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        result.textContent = 'Please enter valid coefficients.';
        return;
    }

    
    result.textContent = 'Calculating...';
    setTimeout(() => {          
        let roots = newtonRaphsonMethod(a, b, c, d, e, f);
        result.textContent = `Roots: ${roots.map(r => r.toFixed(2)).join(', ')}`;
    }, 1000);
}

function newtonRaphsonMethod(a, b, c, d, e, f) {
    
    function fx(x) {
        return a*x**5 + b*x**4 + c*x**3 + d*x**2 + e*x + f;
    }

    function dfx(x) {
        return 5*a*x**4 + 4*b*x**3 + 3*c*x**2 + 2*d*x + e;
    }

    let roots = [];
    let guess = -10;
    while (guess < 10) {
        let x0 = guess;
        let x1;
        let iterations = 0;
        do {
            let fx0 = fx(x0);
            let dfx0 = dfx(x0);
            if (dfx0 === 0) break;  
            x1 = x0 - fx0 / dfx0;
            x0 = x1;
            iterations++;
        } while (iterations < 100 && Math.abs(fx(x0)) > 0.0001);

        if (!roots.some(r => Math.abs(r - x0) < 0.1)) {
            roots.push(x0);
        }
        guess += 0.5;  
    }
    return roots;
}
