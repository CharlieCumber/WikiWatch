import styled from 'styled-components';
import colours from '../../helpers/colours';
import { contentHeightForRows } from '../../helpers/gridSizes';
import { mediaQuery } from '../../helpers/mediaQuery';

type CardStyleProps = {
  columns: number;
  rows: number;
};

const maxColumns = (props: CardStyleProps, max: number): number => {
  const { columns } = props;
  return columns <= max ? columns : max;
};

const Card = styled.div<CardStyleProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: ${colours.white};
  border-radius: 5px;
  padding: 10px;
  text-align: center;

  height: ${({ rows }) => contentHeightForRows(rows)};

  grid-row: span ${({ rows }) => rows};
  grid-column: span ${(props) => maxColumns(props, 2)};

  ${mediaQuery.fourColumns`
    grid-column: span ${(props) => maxColumns(props, 4)};
  `}

  ${mediaQuery.sixColumns`
    grid-column: span ${(props) => maxColumns(props, 6)};
  `}

  ${mediaQuery.eightColumns`
    grid-column: span ${(props) => maxColumns(props, 8)};
  `}

  ${mediaQuery.tenColumns`
    grid-column: span ${(props) => maxColumns(props, 10)};
  `}

  ${mediaQuery.twelveColumns`
    grid-column: span ${(props) => maxColumns(props, 12)};
  `}
`;

export default Card;
