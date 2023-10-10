# Dojo The Enigmatic Enigma of the Entangled Epistles
​
In the bustling city of London, a curious case captured the attention of the ingenious detective, Sherlock Holmes, and his ever-reliable companion, Dr. Watson. A series of letters had been intercepted, containing vital information that could jeopardize national security. However, the messages were written in such a way that no two adjacent characters were the same, rendering the texts nearly incomprehensible.
​
## Problem Statement
​
To uncover the hidden meaning behind these cryptic correspondences, Holmes would need to rearrange the letters in each message so that they followed the unusual rule of having no two adjacent characters be the same.
​
Holmes delved deep into the mystery, studying the patterns and frequency of the characters. He knew that, in some cases, it might be impossible to rearrange the characters according to the rule, leaving him with an empty string as a result.
​
For example, when faced with a message such as "aab," Holmes could easily rearrange it to form "aba," where no two adjacent characters were identical. However, in a situation like "aaab," Holmes recognized that no such rearrangement could be achieved, and he would be left with an empty string.

## Steps to solve:
​
1. Create function that receive a string and return a string
2. Sort input ASC
3. buffer final result = ""
4. buff previous char = ""
5. while input has chars6. let charindex = input.findIndex()
6. if -1 return ""
7. result += input[charIndex]
8. previous char = input[charIndex]
9. input.splice(charIndex, 1)
​
### Test table
- aab - input
- a -> result += a
- a -> input.findIndex(char) => char != previous char
- b -> result += b
- a -> previous char -> result += a

## Create project and configure:

1. Create project folder and structure
```shell
mkdir dojo-adjacent-chars
cd dojo-adjacent-chars
mkdir src
mkdir test
```

2. Start node project (creates the package.json)
```shell
npm init -y
```

3. Install jest
```shell
npm i -D typescript jest ts-jest @types/jest
```

4. Configure typescrypt (creates the tsconfig.json)
```shell
npx tsc --init
```

5. Add configs to the `tsconfig.json`
```json
"rootDir": "./src",
"outDir": "./dist",
"sourceMap": true
```

6. Set how to run project on `package.json`
```json
"scripts": {
    "start": "node --loader ts-node/esm src/index.ts",
},
```

7. Configure jest (Creates the jest.config.js)
```shell
npx ts-jest config:init
```

8. Set how to run tests on project on `package.json`
```json
"scripts": {
    "test": "jest"
},
```