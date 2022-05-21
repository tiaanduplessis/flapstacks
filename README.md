
# 🥞 flapstacks
[![package version](https://img.shields.io/npm/v/flapstacks.svg?style=flat-square)](https://npmjs.org/package/flapstacks)
[![package downloads](https://img.shields.io/npm/dm/flapstacks.svg?style=flat-square)](https://npmjs.org/package/flapstacks)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/flapstacks.svg?style=flat-square)](https://npmjs.org/package/flapstacks)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Flex layout primitive for React & React Native (wip)

## 📖 Table of Contents
- [🥞 flapstacks](#-flapstacks)
  - [📖 Table of Contents](#-table-of-contents)
  - [👀 Background](#-background)
    - [Features](#features)
  - [⚙️ Install](#️-install)
  - [📖 Usage](#-usage)
    - [Overridable styles](#overridable-styles)
  - [📚 API](#-api)
  - [💬 Contributing](#-contributing)
  - [🪪 License](#-license)

## 👀 Background

This package is a tiny wrapper around the [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) one-dimensional layout method to allow for a prop based styling API as seen in [Styled System](https://styled-system.com/). 

### Features

- Works in React and React Native (wip)
- Flexible shorthand props
- TypeScript support with [API docs](https://paka.dev/npm/flapstacks)
- Polymorphic component type
- Style overriding to hook into your Design System

## ⚙️ Install

Install the package locally within you project folder with your package manager:

With `npm`:
```sh
npm install flapstacks
```

With `yarn`:
```sh
yarn add flapstacks
```

With `pnpm`:
```sh
pnpm add flapstacks
```

## 📖 Usage

```tsx
import { Stack } from "flapstacks";

const Box = () => (
  <div style={{ height: 100, width: 100, backgroundColor: "tomato" }} />
);

export default function App() {
  return (
    <Stack
      as="main"
      direction="column"
      cross="center"
      justifyContentSpaceBetween
      gap={2}
    >
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Stack>
  );
}
```

### Overridable styles

If you have an existing set to design tokens that you would like to connect to the props of the stack then the `onOverrideStyles` prop can be used:

```tsx
const CustomStack = (props) => {
  const handleOverride = (style: CSSProperties) => {
      // Design tokens
      const scale = ["16px", "32px"]
      if (style.gap) {
        style.gap = scale[style.gap as number];
      }
    
      return style;
    }
  
  return <Stack {...props} onOverrideStyles={handleOverride}>
}
```

## 📚 API

For all configuration options, please see the [API docs](https://paka.dev/npm/flapstacks).

## 💬 Contributing

Got an idea for a new feature? Found a bug? Contributions are welcome! Please [open up an issue](https://github.com/tiaanduplessis/flapstacks/issues) or [make a pull request](https://makeapullrequest.com/).

## 🪪 License

[MIT © Tiaan du Plessis](./LICENSE)
    