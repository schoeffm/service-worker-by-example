/**
 * Calculates all prime numbers between 0 and {@code max}
 *
 * @param max
 * @returns {[]}
 * @private
 */
const _prime = (max = 10) => {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

/**
 * Fetches a resource from a slow backend ... takes 1.5 seconds
 *
 * @returns {Promise<string>}
 * @private
 */
const _loadAndProcessData = () => {
    return fetch('/hello')
        .then(response => response.text());
}

/**
 * Interface to WebWorker
 */
onmessage = async (e) => {
    switch (e.data.type) {
        case 'prime':
            postMessage({result: _prime(e.data.max), type: 'prime'});
            break;
        case 'fetch':
            postMessage({result: await _loadAndProcessData(), type: 'fetch'});
            break;
        default:
            console.log(`For this type '${e.data.type}' no handler is available`);
    }
}