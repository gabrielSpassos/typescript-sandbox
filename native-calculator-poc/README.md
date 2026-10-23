# Reactive Native Calculator (POC)

React Native mobile app with TypeScript, prepared to run first on Android. The interface supports addition and subtraction of two numbers, accepts comma or decimal point input, and shows a message when the values are invalid.

## Requirements

- Node.js LTS
- Android Studio with a configured emulator **or** an Android device with Expo Go installed

## Run

```sh
npm install
npx expo start
```

In the Expo terminal, press `a` to open it in the Android emulator. To use a physical device, scan the QR code with Expo Go; the computer and device must be on the same network.

You can also use `npm run android` to start the server and open the Android emulator.

## Unit tests

```sh
npm test
```
