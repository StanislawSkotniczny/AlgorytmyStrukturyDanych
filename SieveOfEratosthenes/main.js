document.addEventListener('DOMContentLoaded', function() {
    const solveButton = document.getElementById('solveButton');
    solveButton.addEventListener('click', findPrimes);
});

function findPrimes() {
    const limit = document.getElementById('limit').value;
    const primeNumbers = sieveOfEratosthenes(parseInt(limit));
    document.getElementById('result').innerHTML = `Prime numbers up to ${limit}: ${primeNumbers.join(', ')}<br/>` +
        `Prime pairs: ${formatPairs(pairPrimes(primeNumbers))}<br/>` +
        `Prime quadruplets: ${formatQuadruplets(findPrimeQuadruplets(primeNumbers))}`;
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

function pairPrimes(primeNumbers) {
    const pairs = [];
    for (let i = 0; i < primeNumbers.length - 1; i++) {
        pairs.push([primeNumbers[i], primeNumbers[i + 1]]);
    }
    return pairs;
}

function findPrimeQuadruplets(primes) {
    const quadruplets = [];
    for (let i = 0; i < primes.length - 3; i++) {
        if (primes[i + 3] - primes[i] === 8 && ![3].some(num => primes.slice(i, i+4).includes(num))) {
            quadruplets.push([primes[i], primes[i + 1], primes[i + 2], primes[i + 3]]);
        }
    }
    return quadruplets;
}

function formatPairs(pairs) {
    return pairs.map(pair => `(${pair[0]}, ${pair[1]})`).join(', ');
}

function formatQuadruplets(quadruplets) {
    return quadruplets.map(quadruplet => `(${quadruplet.join(', ')})`).join(', ');
}
