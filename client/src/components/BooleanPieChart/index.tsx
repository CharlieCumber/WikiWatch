import React from 'react';
import { HexColourCode } from '../../helpers/colours';
import { BooleanCount } from '../../helpers/statistics';
import Card from '../Card';
import { Cell, Legend as LibLegend, Pie, PieChart, Tooltip } from 'recharts';
import Legend from '../Legend';
import Title from '../Title';

type PieChartProps = {
  title: string;
  legend?: string;
  data: BooleanCount;
  trueLabel: string;
  falseLabel: string;
  trueColour: HexColourCode;
  falseColour: HexColourCode;
};

const BooleanPieChart = (props: PieChartProps): JSX.Element => {
  const { title, legend, data, trueLabel, falseLabel, trueColour, falseColour } = props;

  const pieData = [
    {
      name: trueLabel,
      value: data.yes ?? 0,
    },
    {
      name: falseLabel,
      value: data.no ?? 0,
    },
  ];

  return (
    <Card columns={2} rows={2}>
      <Title>{title}</Title>
      <PieChart width={280} height={200}>
        <LibLegend verticalAlign={'bottom'} />
        <Tooltip />
        <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
          <Cell fill={trueColour} />
          <Cell fill={falseColour} />
        </Pie>
      </PieChart>
      {legend && <Legend>{legend}</Legend>}
    </Card>
  );
};

export default BooleanPieChart;
