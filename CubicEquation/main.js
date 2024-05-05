function solveCubic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);
    const result = document.getElementById('result');

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        result.textContent = 'Please enter valid coefficients.';
        return;
    }

    const w = -b / (3 * a);
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const discriminant = q * q / 4 + p * p * p / 27;

    if (discriminant > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        const x1 = u + v + w;
        result.textContent = `One real root: x1 = ${x1.toFixed(2)}`;
    } else if (discriminant < 0) {
        const r = Math.sqrt(-p / 3);
        const phi = Math.acos(-q / (2 * r * r * r));
        const x1 = 2 * r * Math.cos(phi / 3) + w;
        const x2 = 2 * r * Math.cos((phi + 2 * Math.PI) / 3) + w;
        const x3 = 2 * r * Math.cos((phi + 4 * Math.PI) / 3) + w;
        result.textContent = `Three real roots: x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}, x3 = ${x3.toFixed(2)}`;
    } else {
        const x1 = 2 * Math.cbrt(-q / 2) + w;
        const x2 = -Math.cbrt(-q / 2) + w;
        result.textContent = `Double root: x1, x2 = ${x1.toFixed(2)}, and a single root: ${x2.toFixed(2)}`;
    }
}
