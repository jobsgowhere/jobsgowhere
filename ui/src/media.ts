import { down, only, up } from "styled-breakpoints";

export const breakpoints = {
  mobile: "1px",
  tablet: "768px",
  desktop: "1024px",
};

export const SCREENS = {
  Only: {
    Mobile: only("mobile"),
  },
  Up: {
    Tablet: up("tablet"),
    Desktop: up("desktop"),
  },
  Down: {
    Tablet: down("tablet"),
    Desktop: down("desktop"),
  },
};
