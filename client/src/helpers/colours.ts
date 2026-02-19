export type HexColourCode = `#${string}`;

type Colours = {
  [name: string]: HexColourCode;
};

const colours: Colours = {
  primary: '#FF671B',
  red: '#D22A2F',
  orange: '#F38B00',
  yellow: '#FFC81F',
  teal: '#4FCDB0',
  green: '#8DB92E',
  beige: '#E3DFD7',
  grey: '#a0a0a0',
  white: '#ffffff',
  black: '#111111',
};

export default colours;
