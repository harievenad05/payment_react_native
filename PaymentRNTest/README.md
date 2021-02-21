# React Native App with Auth and payment gateway

## Installation

Please follow these steps to install:

Clone the repo:

```bash
git clone --depth 1 https://github.com/harievenad05/payment_react_native/
cd payment_react_native-dev/PaymentRNTest
```

Install the dependencies:

```bash
yarn install
```

```bash
cd ios && pod install
```

Go to the Projectdirectory/src/common/utils/api-environments.js

Replace
```bash
const local = "http://localhost:3000"
```
With your ip address
```bash
const local = "http://xxx.xxx.x.xxx:3000"
```

## Project Structure

```
App.js          # App Entry app
src\
 |--assets\         # Assets and Images
 |--common\         # Constants and App utils
 |--components\     # Resuable components
 |--navigation\     # Navigators (Stack and Drawer)
 |--pages\          # Main Screen with sagas
 |--redux\          # Redux, reducers and main saga
```

## Commands

To Run it in iOS:

```bash
yarn ios
```

To Run it in Android:

```bash
yarn android
```
