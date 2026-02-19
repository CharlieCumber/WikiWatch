type Pixels = `${number}px`;

const appendPx = (source: number): Pixels => `${source}px`;

const columnWidthPx = 150;

export const columnWidth = appendPx(columnWidthPx);

export const gutterWidthPx = 10;

export const gutterWidth = appendPx(gutterWidthPx);

export const minScreenWidthPxForColumns = (columns: number): number =>
  gutterWidthPx * (columns + 1) + columns * columnWidthPx;

export const minScreenWidthForColumns = (columns: number): Pixels =>
  appendPx(minScreenWidthPxForColumns(columns));

export const contentWidthPxForColumns = (columns: number): number =>
  gutterWidthPx * (columns - 1) + columns * columnWidthPx;

export const contentWidthForColumns = (columns: number): Pixels =>
  appendPx(contentWidthPxForColumns(columns));

const rowHeightPx = 150;

export const contentHeightPxForRows = (rows: number): number =>
  gutterWidthPx * (rows - 1) + rows * rowHeightPx;

export const contentHeightForRows = (rows: number): Pixels =>
  appendPx(contentHeightPxForRows(rows));
