function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  generatePromises(firstDelay, step, amount);
}

function generatePromises(firstDelay, step, amount) {
  const promises = [];

  for (let i = 0; i < amount; i++) {
    const delay = firstDelay + i * step;
    const promise = createPromise(i + 1, delay)
        .then(({ position, delay }) => {
            console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    promises.push(promise);
  }

  Promise.all(promises)
}
