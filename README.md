
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
    - [Spacing](#spacing)
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

### Spacing

`gap`, `rowGap`, and `columnGap` accept normal React CSS values. An explicit
custom-property name such as `--space-sm` is shorthand for `var(--space-sm)`:

```tsx
<Stack gap="--space-sm" rowGap={8} columnGap="1rem" />
```

Use `m` for `margin` and `p` for `padding`. The full names also work. Values use
React's `CSSProperties` types: numbers become pixels on the web, and strings use
native CSS syntax, including one-to-four-side shorthands and CSS functions.
Explicit custom-property shorthand works for these spacing props too:

```tsx
<Stack m={0} p="8px 16px" />
<Stack margin="auto" padding="--space-sm" />
<Stack gap="var(--space-sm, 8px)" m="calc(1rem + 2px)" />
```

Spacing precedence is explicit:

- A defined `margin` wins over `m`; a defined `padding` wins over `p`, including
  zero. `undefined` falls back to the alias.
- Either spacing prop overrides the corresponding margin or padding declarations
  in `style`, including physical sides, logical sides, and their legacy vendor
  aliases. Each prop owns all four sides. Removing the prop restores `style`.
- With neither spacing prop supplied, the corresponding `style` declarations
  are preserved. Other style properties and the existing flex defaults are unchanged.
- `onOverrideStyles` runs last and receives the resolved CSS values. It can
  override the result, as before.

Custom-property shorthand requires the `--` prefix and an unescaped name.
Ordinary strings such as `normal`, `auto`, and `space-sm` are passed through;
they are never guessed to be token names. Use full `var(...)` syntax for escaped
names or fallbacks. Unsupported CSS values retain normal browser behavior.
Responsive arrays and breakpoint objects are not supported; use CSS variables,
stylesheets, or `onOverrideStyles` for responsive styling.

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
    
