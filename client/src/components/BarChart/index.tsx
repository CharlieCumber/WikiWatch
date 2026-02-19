import { Bar, BarChart as LibBarChart, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import colours, { HexColourCode } from '../../helpers/colours';
import { contentHeightPxForRows } from '../../helpers/gridSizes';
import useRenderedColumnsWidth from '../../helpers/useRenderedColumnsWidth';
import Card from '../Card';
import Legend from '../Legend';
import Title from '../Title';

type BarChartProps = {
  title?: string
  legend?: string
  columns: number
  rows: number
  colour: HexColourCode
  data: {
    [name: string]: number
  }
}

const BarChart = (props: BarChartProps): JSX.Element => {
  const { title, legend, colour, columns, rows, data } = props;

  const contentWidth = useRenderedColumnsWidth(columns)

  const dataList = Object.keys(data).map((key) => ({
    name: key,
    count: data[key],
  }));

  const graphHeight = contentHeightPxForRows(rows) - (title ? 70 : 20) - (legend ? 30 : 0);
  const graphWidth = contentWidth - 40;
  const yAxisLabelWidth = graphWidth / 3;

  return (
    <Card columns={columns} rows={rows}>
      {title && (
        <Title>{title}</Title>
      )}
      <LibBarChart
        width={graphWidth}
        height={graphHeight}
        data={dataList}
        layout="vertical"
        barGap={1}
        maxBarSize={20}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid
          horizontal={false}
          stroke={colours.grey}
          strokeWidth={0.5}
        />
        <XAxis
          type="number"
          orientation="top"
          tickMargin={10}
          stroke={colours.grey}
          strokeWidth={0.5}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={yAxisLabelWidth}
        />
        <Tooltip />
        <Bar
          dataKey="count"
          animationDuration={1000}
          fill={colour}
          shape={<Rectangle
            radius={[0, 20, 20, 0]}
          />}
        />
      </LibBarChart>
      {legend && (
        <Legend>{legend}</Legend>
      )}
    </Card>
  );
};

export default BarChart;
