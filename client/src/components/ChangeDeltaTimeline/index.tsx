import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import colours from '../../helpers/colours';
import { WikiStatistics } from '../../helpers/statistics';
import useRenderedColumnsWidth from '../../helpers/useRenderedColumnsWidth';
import Card from '../Card';
import Legend from '../Legend';
import Title from '../Title';

type ChangeDeltaTimelineProps = {
  data: WikiStatistics["changeDelta"]
};

const YAXIS_CHART_PADDING = 10000;

const ChangeDeltaTimeline = (props: ChangeDeltaTimelineProps): JSX.Element => {
  const { data } = props;
  const columns = 6;
  const contentWidth = useRenderedColumnsWidth(columns)

  return (
    <Card columns={columns} rows={4}>
      <Title>Recent Changes (last 20 minutes)</Title>
      <LineChart width={(contentWidth - 20)} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDataOverflow
          dataKey="label"
          type="category"
          interval={1}
          tickMargin={5}
        />
        <YAxis
          yAxisId="1"
          allowDataOverflow
          type="number"
          domain={[`dataMin - ${YAXIS_CHART_PADDING}`, `dataMax + ${YAXIS_CHART_PADDING}`]}
        />
        <YAxis
          yAxisId="2"
          orientation="right"
          domain={[`dataMin - ${YAXIS_CHART_PADDING}`, `dataMax + ${YAXIS_CHART_PADDING}`]}
          allowDataOverflow
          type="number"
        />
        <Tooltip />
        <Line
          yAxisId="1"
          type="natural"
          dataKey="charactersChangedThisMinute"
          stroke={colours.red}
          animationDuration={300}
        />
        <Line
          yAxisId="2"
          type="natural"
          dataKey="totalCharactersChanged"
          stroke={colours.teal}
          animationDuration={300}
        />
      </LineChart>
      <Legend>
        A maximum of 20 samples are presented for the past 20 minutes. Change diff (page lines
        changed) is sampled on a minute-by-minute basis, and associated with the left Y axis.
        The right side Y axis covers the running total of all edit events recorded.
      </Legend>
    </Card>
  );
};

export default ChangeDeltaTimeline;
