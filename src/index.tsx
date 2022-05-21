import React, { CSSProperties, ElementType, memo, forwardRef, ReactNode } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef
} from "react-polymorphic-types";
import { match, removeUndefined, when } from "./utils";

const DEFAULT_ELEMENT = "div";
export type StackOwnProps = Partial<{
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

export type StackProps<
  T extends React.ElementType = typeof DEFAULT_ELEMENT
> = PolymorphicPropsWithRef<StackOwnProps, T>;


const getStackProps = (
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
  }: StackOwnProps & ReactElement<any>
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

export const Stack: PolymorphicForwardRefExoticComponent<
  StackOwnProps,
  typeof DEFAULT_ELEMENT
> = forwardRef(function Stack<
  T extends ElementType = typeof DEFAULT_ELEMENT
>(
  {
    as,
    ...restProps
  }: PolymorphicPropsWithoutRef<StackOwnProps, T>,
  ref: React.ForwardedRef<Element>
) {
  const Element: React.ElementType = as || DEFAULT_ELEMENT;
  const props = getStackProps(restProps);
  return <Element ref={ref} {...props} />;
});

export const MemoizedStack = memo(Stack);