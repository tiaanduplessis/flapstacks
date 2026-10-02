import type { CSSProperties } from "react";

// Only explicit, unescaped custom-property names are shorthand. CSS keywords,
// functions and arbitrary strings keep their existing meaning.
export const resolveCustomProperty = <T extends string | number | undefined>(
  value: T
): T | string =>
  typeof value === "string" && /^--(?:[\w-]|[^\u0000-\u007F])+$/.test(value)
    ? `var(${value})`
    : value;

export const withSpacing = (
  style: CSSProperties | undefined,
  margin: CSSProperties["margin"],
  padding: CSSProperties["padding"]
): CSSProperties => {
  const styles = { ...style };

  // Avoid mixing React shorthand and longhand updates: an explicit spacing
  // prop owns all four sides, including style's logical spacing properties.
  (["margin", "padding"] as const).forEach((property) => {
    const value = property === "margin" ? margin : padding;
    if (value === undefined) return;

    [
      "Top",
      "Right",
      "Bottom",
      "Left",
      "Block",
      "BlockStart",
      "BlockEnd",
      "Inline",
      "InlineStart",
      "InlineEnd"
    ].forEach((suffix) => {
      delete styles[`${property}${suffix}` as keyof CSSProperties];
    });
    const capitalized = property === "margin" ? "Margin" : "Padding";
    ["Moz", "Webkit"].forEach((prefix) => {
      ["Start", "End"].forEach((suffix) => {
        delete styles[
          `${prefix}${capitalized}${suffix}` as keyof CSSProperties
        ];
      });
    });
    styles[property] = resolveCustomProperty(value);
  });

  return styles;
};

export const removeUndefined = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

export const when = (value: any, trueValue?: string, falseValue?: string) => {
  if (trueValue && value === true) return trueValue;
  if (falseValue && value === false) return falseValue;
  return value;
};

export const match = (...values: any[]) => {
  for (let value of values) {
    if (value !== undefined) return value;
  }
};
