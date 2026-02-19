import { DefaultTheme, Interpolation, ThemeProps, css } from 'styled-components';
import { minScreenWidthPxForColumns } from './gridSizes';

export const breakpoints = {
  fourColumns: minScreenWidthPxForColumns(4),
  sixColumns: minScreenWidthPxForColumns(6),
  eightColumns: minScreenWidthPxForColumns(8),
  tenColumns: minScreenWidthPxForColumns(10),
  twelveColumns: minScreenWidthPxForColumns(12),
};

export type Breakpoint = keyof typeof breakpoints;

export type MinWidthQuery = <P extends ThemeProps<DefaultTheme>>(
  strings: TemplateStringsArray,
  ...interpolations: Interpolation<P>[]
) => Interpolation<P>;

export const minWidthQuery: (width: number) => MinWidthQuery =
  (width) =>
  (strings, ...interpolations) => css`
    @media (min-width: ${width}px) {
      ${css(strings, ...interpolations)}
    }
  `;

export const mediaQuery = Object.fromEntries(
  Object.entries(breakpoints).map(([breakpoint, value]) => [
    breakpoint as Breakpoint,
    minWidthQuery(value),
  ]),
);
