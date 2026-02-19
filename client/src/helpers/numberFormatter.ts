const symbolLookup = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
];

const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;

const numberFormatter = (source: number, digits: number): string => {
  const item = symbolLookup
    .slice()
    .reverse()
    .find((item) => {
      return source >= item.value;
    });
  return item ? (source / item.value).toFixed(digits).replace(regex, '$1') + item.symbol : '0';
};

export default numberFormatter;
