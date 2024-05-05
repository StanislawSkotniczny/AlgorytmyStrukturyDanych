document.addEventListener('DOMContentLoaded', function() {
    const solveButton = document.getElementById('solveButton');
    solveButton.addEventListener('click', findPrimes);
});

function findPrimes() {
    const limit = document.getElementById('limit').value;
    const primeNumbers = sieveOfEratosthenes(parseInt(limit));
    document.getElementById('result').textContent = 'Primes up to ' + limit + ': ' + primeNumbers.join(', ');
}

function sieveOfEratosthenes(n) {
    const primes = new Array(n + 1).fill(true);
    primes[0] = primes[1] = false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (primes[i]) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = false;
            }
        }
    }

    return primes.reduce((acc, isPrime, index) => {
        if (isPrime) acc.push(index);
        return acc;
    }, []);
}
