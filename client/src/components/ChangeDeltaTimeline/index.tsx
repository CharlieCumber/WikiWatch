import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend as RechartsLegend,
} from 'recharts';
import colours from '../../helpers/colours';
import numberFormatter from '../../helpers/numberFormatter';
import { WikiStatistics } from '../../helpers/statistics';
import useRenderedColumnsWidth from '../../helpers/useRenderedColumnsWidth';
import Card from '../Card';
import Legend from '../Legend';
import Title from '../Title';

type ChangeDeltaTimelineProps = {
  data: WikiStatistics['changeDelta'];
};

const formatAxisTick = (value: number): string => numberFormatter(value, 0);

const ChangeDeltaTimeline = (props: ChangeDeltaTimelineProps): JSX.Element => {
  const { data } = props;
  const columns = 6;
  const contentWidth = useRenderedColumnsWidth(columns);

  return (
    <Card columns={columns} rows={4}>
      <Title>Recent Changes (last 20 minutes)</Title>
      <LineChart width={contentWidth - 20} height={370} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis allowDataOverflow dataKey="label" type="category" interval={4} tickMargin={3} />
        <YAxis
          yAxisId="1"
          allowDataOverflow
          allowDecimals={false}
          type="number"
          domain={['auto', 'auto']}
          tickFormatter={formatAxisTick}
          label={{
            value: 'Chars/min',
            angle: -90,
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
          }}
        />
        <YAxis
          yAxisId="2"
          orientation="right"
          allowDecimals={false}
          allowDataOverflow
          type="number"
          domain={['auto', 'auto']}
          tickFormatter={formatAxisTick}
          label={{
            value: 'Total chars',
            angle: 90,
            position: 'insideRight',
            style: { textAnchor: 'middle' },
          }}
        />
        <Tooltip
          formatter={(value) => (typeof value === 'number' ? numberFormatter(value, 0) : value)}
        />
        <RechartsLegend verticalAlign="top" />
        <Line
          yAxisId="1"
          type="natural"
          dataKey="charactersChangedThisMinute"
          name="Change delta (chars/min)"
          stroke={colours.red}
          animationDuration={300}
        />
        <Line
          yAxisId="2"
          type="natural"
          dataKey="totalCharactersChanged"
          name="Cumulative total (chars)"
          stroke={colours.teal}
          animationDuration={300}
        />
      </LineChart>
      <Legend>
        Up to 20 data points are shown for the past 20 minutes, sampled once per minute. The left
        axis tracks the character change delta per minute; the right axis tracks the cumulative
        total of all character changes recorded.
      </Legend>
    </Card>
  );
};

export default ChangeDeltaTimeline;
