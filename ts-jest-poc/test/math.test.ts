import {add, multiply} from '../src/math';

describe('Addition operations', () => {
    it('scenario with two positive numbers', () => {
        expect(add(1, 2)).toEqual(3);
    });

    it('scenario with one positive number and one negative number', () => {
        expect(add(1, -2)).toEqual(-1);
    });

    it('scenario with one negative number and one positve number', () => {
        expect(add(-1, 2)).toEqual(1);
    });

    it('scenario with two negative numbers', () => {
        expect(add(-1, -2)).toEqual(-3);
    });
});

describe('Multiplication operations', () => {
    it('scenario with two positive numbers', () => {
        expect(multiply(4, 2)).toEqual(8);
    });

    it('scenario with one positive number and one negative number', () => {
        expect(multiply(1, -2)).toEqual(-2);
    });

    it('scenario with one negative number and one positve number', () => {
        expect(multiply(-1, 2)).toEqual(-2);
    });

    it('scenario with two negative numbers', () => {
        expect(multiply(-1, -2)).toEqual(2);
    });
});