export function transforToNotHaveAdjacentsChars(input: string): string {
    let final = "";
    let previousChar = "";

    let array = [...input].sort();
    while (array.length > 0) {
        let charIndex = array.findIndex((ch) => ch !== previousChar);

        if (-1 === charIndex) {
            return "EMPTY";
        }

        let char = array[charIndex];
        final += char
        previousChar = char
        array.splice(charIndex, 1);
        
    }

    return final;
}

console.log(transforToNotHaveAdjacentsChars("aacb"))