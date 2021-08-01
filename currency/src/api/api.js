const getRates = (base) => {
  return fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
};
const getValue = (base) => {
  return fetch(`https://api.exchangeratesapi.io/latest?symbols=USD,GBP`);
};
export { getRates, getValue };
