import React, { createRef, CSSProperties, forwardRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { MemoizedStack, Stack } from "../";
import { resolveCustomProperty, withSpacing } from "../utils";

describe("spacing values", () => {
  test.each(["--space-sm", "--space_2", "--2xl", "--間隔"])(
    "expands the explicit custom property %s",
    (value) => {
      expect(resolveCustomProperty(value)).toBe(`var(${value})`);
    }
  );

  test.each([
    undefined,
    0,
    12,
    -4,
    "1rem",
    "10%",
    "auto",
    "normal",
    "inherit",
    "initial",
    "unset",
    "revert-layer",
    "var(--space-sm, 8px)",
    "calc(1rem + 2px)",
    "clamp(4px, 1vw, 16px)",
    "4px 8px",
    "space-sm",
    "--",
    "--invalid name",
    "--space; color: red",
    ""
  ])("preserves the ordinary or invalid value %s", (value) => {
    expect(resolveCustomProperty(value)).toBe(value);
  });

  test("does not mutate style or erase spacing when no prop is supplied", () => {
    const style = Object.freeze({ margin: "1rem", marginLeft: 8, padding: 4 });
    expect(withSpacing(style, undefined, undefined)).toEqual(style);
    expect(withSpacing(style, 0, "--inset")).toEqual({
      margin: 0,
      padding: "var(--inset)"
    });
    expect(style).toEqual({ margin: "1rem", marginLeft: 8, padding: 4 });
  });

  test("explicit spacing removes only the matching physical and logical family", () => {
    const style: CSSProperties = {
      color: "red",
      marginTop: 1,
      marginRight: 2,
      marginBottom: 3,
      marginLeft: 4,
      marginBlock: 5,
      marginBlockStart: 6,
      marginBlockEnd: 7,
      marginInline: 8,
      marginInlineStart: 9,
      marginInlineEnd: 10,
      MozMarginStart: 11,
      MozMarginEnd: 11,
      WebkitMarginStart: 11,
      WebkitMarginEnd: 11,
      paddingLeft: 12
    };
    expect(withSpacing(style, "1px 2px 3px 4px", undefined)).toEqual({
      color: "red",
      margin: "1px 2px 3px 4px",
      paddingLeft: 12
    });
  });
});

describe("Stack DOM spacing", () => {
  let container: HTMLDivElement;
  let root: Root;
  let previousActEnvironment: unknown;

  beforeEach(() => {
    previousActEnvironment = (globalThis as any).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
  });

  const render = (element: React.ReactElement) => {
    act(() => root.render(element));
    return container.firstElementChild as HTMLElement;
  };

  test("keeps defaults and existing style spacing unchanged", () => {
    const element = render(<Stack />);
    expect(element.getAttribute("style")).toBe(
      "display: flex; flex-direction: row; flex-wrap: wrap;"
    );
    render(<Stack style={{ margin: "2px", paddingLeft: 3 }} />);
    expect(element.style.margin).toBe("2px");
    expect(element.style.paddingLeft).toBe("3px");
  });

  test("renders numbers, zero and native four-side CSS shorthands", () => {
    const element = render(<Stack gap={12} m={0} p="1px 2px 3px 4px" />);
    expect(element.style.gap).toBe("12px");
    expect(element.style.margin).toBe("0px");
    expect(element.style.paddingTop).toBe("1px");
    expect(element.style.paddingRight).toBe("2px");
    expect(element.style.paddingBottom).toBe("3px");
    expect(element.style.paddingLeft).toBe("4px");
    render(<Stack m={-4} p={8} gap="1rem 2rem" />);
    expect(element.style.margin).toBe("-4px");
    expect(element.style.padding).toBe("8px");
    expect(element.style.gap).toBe("1rem 2rem");
  });

  test("canonical props beat aliases and style, including explicit zero", () => {
    const element = render(
      <Stack
        m={12}
        margin={0}
        p={20}
        padding={4}
        style={{ margin: 30, marginLeft: 40, padding: 50, paddingBlock: 60 }}
      />
    );
    expect(element.style.margin).toBe("0px");
    expect(element.style.padding).toBe("4px");
    expect(element.style.paddingBlock).toBe("");
    expect(element.hasAttribute("m")).toBe(false);
    expect(element.hasAttribute("p")).toBe(false);
    expect(element.hasAttribute("margin")).toBe(false);
    expect(element.hasAttribute("padding")).toBe(false);
  });

  test("repeated updates and prop removal restore style longhands cleanly", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const style = { marginLeft: 9, paddingInlineStart: "7px" };
      const element = render(<Stack style={style} m={2} p={3} />);
      render(<Stack style={style} m={4} p={5} />);
      expect(element.style.marginLeft).toBe("4px");
      expect(element.style.padding).toBe("5px");
      render(<Stack style={style} />);
      expect(element.style.marginLeft).toBe("9px");
      expect(element.style.marginTop).toBe("");
      expect(element.style.paddingInlineStart).toBe("7px");
      expect(element.style.paddingTop).toBe("");
      render(<Stack style={style} m={0} p={0} />);
      expect(element.style.marginLeft).toBe("0px");
      expect(element.style.paddingInlineStart).toBe("");
      expect(errors).not.toHaveBeenCalled();
    } finally {
      errors.mockRestore();
    }
  });

  test("expands gap properties before the final style override", () => {
    let observed: CSSProperties | undefined;
    const element = render(
      <Stack
        gap="--space"
        rowGap="--row"
        columnGap="--column"
        m="--outside"
        p="--inside"
        onOverrideStyles={(styles) => {
          observed = styles;
          return { ...styles, gap: 24, margin: 3, padding: 6 };
        }}
      />
    );
    expect(observed).toMatchObject({
      gap: "var(--space)",
      rowGap: "var(--row)",
      columnGap: "var(--column)",
      margin: "var(--outside)",
      padding: "var(--inside)"
    });
    expect(element.style.gap).toBe("24px");
    expect(element.style.margin).toBe("3px");
    expect(element.style.padding).toBe("6px");
  });

  test("forwards polymorphic refs, DOM attributes, children and events", () => {
    const ref = createRef<HTMLAnchorElement>();
    const onClick = vi.fn();
    const element = render(
      <Stack
        as="a"
        ref={ref}
        href="#target"
        data-id="link"
        onClick={onClick}
        m={2}
        p={3}
      >
        Target
      </Stack>
    );
    expect(ref.current).toBe(element);
    expect(element.tagName).toBe("A");
    expect(element.getAttribute("href")).toBe("#target");
    expect(element.dataset.id).toBe("link");
    expect(element.textContent).toBe("Target");
    element.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("forwards custom-component props and refs without leaking spacing props", () => {
    const ref = createRef<HTMLButtonElement>();
    const Button = forwardRef<
      HTMLButtonElement,
      React.ComponentPropsWithoutRef<"button"> & { label: string }
    >(({ label, ...props }, forwardedRef) => (
      <button ref={forwardedRef} {...props}>
        {label}
      </button>
    ));
    const element = render(
      <Stack as={Button} ref={ref} label="Custom" m={2} p={3} />
    );
    expect(ref.current).toBe(element);
    expect(element.textContent).toBe("Custom");
    expect(element.style.margin).toBe("2px");
    expect(element.hasAttribute("m")).toBe(false);
  });

  test("supports the memoized component", () => {
    const element = render(<MemoizedStack m={4} p={8} />);
    expect(element.style.margin).toBe("4px");
    expect(element.style.padding).toBe("8px");
  });
});
