import React, { CSSProperties, ElementType, memo } from "react";
import { Polymorphic } from "./types";
import { match, removeUndefined, when } from "./utils";

export type StackProps = Partial<{
  inline?: boolean;

  direction?: CSSProperties["flexDirection"];
  flexDirection?: CSSProperties["flexDirection"];
  column: boolean;
  row: boolean;

  wrap: CSSProperties["flexWrap"] | boolean;
  noWrap: boolean;
  flexWrap: CSSProperties["flexWrap"] | boolean;

  gap: CSSProperties["gap"];
  rowGap: CSSProperties["rowGap"];
  columnGap: CSSProperties["columnGap"];

  cross: CSSProperties["alignItems"];
  align: CSSProperties["alignItems"];
  alignItems: CSSProperties["alignItems"];
  alignItemsStart: boolean;
  alignItemsEnd: boolean;
  alignItemsCenter: boolean;
  alignItemsBaseline: boolean;
  alignItemsStretch: boolean;

  alignContent: CSSProperties["alignContent"];
  alignContentStart: boolean;
  alignContentEnd: boolean;
  alignContentCenter: boolean;
  alignContentSpaceBetween: boolean;
  alignContentSpaceAround: boolean;
  alignContentStretch: boolean;

  main: CSSProperties["justifyContent"];
  justify: CSSProperties["justifyContent"];
  justifyContent: CSSProperties["justifyContent"];
  justifyContentStart: boolean;
  justifyContentEnd: boolean;
  justifyContentCenter: boolean;
  justifyContentSpaceBetween: boolean;
  justifyContentSpaceAround: boolean;

  flow: CSSProperties["flexFlow"];
  flexFlow: CSSProperties["flexFlow"];

  onOverrideStyles?: (styles: CSSProperties) => CSSProperties;
}>;

const DEFAULT_ELEMENT = "div";

const getStackProps = <Element extends ElementType = typeof DEFAULT_ELEMENT>(
  {
    style,
    inline,
    onOverrideStyles,

    flexDirection,
    direction,
    column,
    row,

    wrap,
    noWrap,
    flexWrap,

    gap,
    rowGap,
    columnGap,

    cross,
    align,
    alignItems,
    alignItemsStart,
    alignItemsEnd,
    alignItemsCenter,
    alignItemsBaseline,
    alignItemsStretch,

    alignContent,
    alignContentStart,
    alignContentEnd,
    alignContentCenter,
    alignContentSpaceBetween,
    alignContentSpaceAround,
    alignContentStretch,

    main,
    justify,
    justifyContent,
    justifyContentStart,
    justifyContentEnd,
    justifyContentCenter,
    justifyContentSpaceBetween,
    justifyContentSpaceAround,

    flow,
    flexFlow,

    ...rest
  }: Omit<Polymorphic<Element, StackProps>, "as" | "component">
) => {
  const styles: CSSProperties = {
    ...style,
    display: inline ? "inline-flex" : "flex",
    flexDirection: match(
      direction,
      flexDirection,
      when(column, "column"),
      when(row, "row"),
      'row'
    ),
    flexWrap: match(
      when(wrap, "wrap", "no-wrap"),
      when(flexWrap, "wrap", "no-wrap"),
      "wrap"
    ),
    gap,
    rowGap,
    columnGap,
    alignContent: match(
      alignContent,
      when(alignContentStart, "flex-start"),
      when(alignContentEnd, "flex-end"),
      when(alignContentCenter, "center"),
      alignContentSpaceBetween,
      alignContentSpaceAround,
      alignContentStretch
    ),
    alignItems: match(
      cross,
      align,
      alignItems,
      when(alignItemsStart, "flex-start"),
      when(alignItemsEnd, "flex-end"),
      when(alignItemsCenter, "center"),
      when(alignItemsBaseline, "baseline"),
      when(alignItemsStretch, "stretch")
    ),
    justifyContent: match(
      main,
      justify,
      justifyContent,
      when(justifyContentStart, "flex-start"),
      when(justifyContentEnd, "flex-end"),
      when(justifyContentCenter, "center"),
      when(justifyContentSpaceBetween, "space-between"),
      when(justifyContentSpaceAround, "space-around")
    )
  };

  removeUndefined(styles);

  return {
    style: onOverrideStyles ? onOverrideStyles(styles) : styles,
    ...rest
  };
};

export const Stack = memo(
  <Element extends ElementType = typeof DEFAULT_ELEMENT>({
    as,
    component,
    ...props
  }: Polymorphic<Element, StackProps>) => {
    const Component = as ?? component ?? "div";
    const newProps = getStackProps(props);
    return <Component {...newProps} />;
  }
);
