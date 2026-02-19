import { useEffect, useState } from 'react';
import { contentWidthPxForColumns, minScreenWidthPxForColumns } from './gridSizes';

const useRenderedColumnsWidth = (columns: number): number => {
  const [windowWidthPx, setWindowWidthPx] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidthPx(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  let maxColumnsShown = 2;
  if (windowWidthPx >= minScreenWidthPxForColumns(12)) {
    maxColumnsShown = 12;
  } else if (windowWidthPx >= minScreenWidthPxForColumns(10)) {
    maxColumnsShown = 10;
  } else if (windowWidthPx >= minScreenWidthPxForColumns(8)) {
    maxColumnsShown = 8;
  } else if (windowWidthPx >= minScreenWidthPxForColumns(6)) {
    maxColumnsShown = 6;
  } else if (windowWidthPx >= minScreenWidthPxForColumns(4)) {
    maxColumnsShown = 4;
  }

  const columnsShown = columns > maxColumnsShown ? maxColumnsShown : columns;
  return contentWidthPxForColumns(columnsShown);
};

export default useRenderedColumnsWidth;
