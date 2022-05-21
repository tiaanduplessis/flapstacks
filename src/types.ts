import { ElementType, ComponentPropsWithRef } from "react";

export type Polymorphic<Component extends ElementType, Props> = Props &
  Omit<ComponentPropsWithRef<Component>, "as"> & {
    as?: Component;
    component?: Component;
  };