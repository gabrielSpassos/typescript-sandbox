import { calculate, parseNumber } from '../src/calculator';

describe('parseNumber', () => {
  it('parses integer and decimal input', () => {
    expect(parseNumber('12')).toBe(12);
    expect(parseNumber('3.5')).toBe(3.5);
  });

  it('accepts a comma as the decimal separator and trims whitespace', () => {
    expect(parseNumber('  -2,75  ')).toBe(-2.75);
  });

  it('returns null for empty or invalid input', () => {
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('   ')).toBeNull();
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('Infinity')).toBeNull();
  });
});

describe('calculate', () => {
  it('adds two numbers', () => {
    expect(calculate(12, 5, 'add')).toBe(17);
  });

  it('subtracts the second number from the first', () => {
    expect(calculate(12, 5, 'subtract')).toBe(7);
  });

  it('supports negative and decimal values', () => {
    expect(calculate(-2.5, 1.25, 'add')).toBe(-1.25);
    expect(calculate(-2.5, 1.25, 'subtract')).toBe(-3.75);
  });
});
