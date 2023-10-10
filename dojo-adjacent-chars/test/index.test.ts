import { transforToNotHaveAdjacentsChars } from '../src/index';

describe('Dojo Solution', () => {
    it('should return aba', () => {
        const result = transforToNotHaveAdjacentsChars("baa");
        expect(result).toBe("aba");
    });

    it('should also return aba', () => {
        const result = transforToNotHaveAdjacentsChars("aab");
        expect(result).toBe("aba");
    });

    it('should return aba for aba input', () => {
        const result = transforToNotHaveAdjacentsChars("aba");
        expect(result).toBe("aba");
    });

    it('should return empty', () => {
        const result = transforToNotHaveAdjacentsChars("aaab");
        expect(result).toBe("EMPTY");
    });

    it('should return abac', () => {
        const result = transforToNotHaveAdjacentsChars("aabc");
        expect(result).toBe("abac");
    });
});