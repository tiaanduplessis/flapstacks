import React, { createRef } from "react";
import { Stack, StackOwnProps, StackProps } from "../src";

const props: StackOwnProps = {
  gap: "--space",
  rowGap: 0,
  columnGap: "1rem",
  margin: "auto",
  m: -2,
  padding: "1px 2px 3px 4px",
  p: "var(--inset, 2px)"
};
const anchorProps: StackProps<"a"> = {
  ...props,
  href: "#example",
  ref: createRef<HTMLAnchorElement>()
};
<Stack as="a" {...anchorProps} />;
<Stack m={undefined} padding={undefined} />;

// @ts-expect-error Spacing accepts CSS values, not booleans.
<Stack m={true} />;
// @ts-expect-error Responsive arrays are not part of the existing CSSProperties API.
<Stack gap={[1, 2]} />;
// @ts-expect-error Breakpoint objects are not part of the existing CSSProperties API.
<Stack p={{ small: 2 }} />;
// @ts-expect-error Spacing does not accept null under strictNullChecks.
<Stack margin={null} />;
// @ts-expect-error The polymorphic ref must match the element.
<Stack as="a" ref={createRef<HTMLButtonElement>()} />;
