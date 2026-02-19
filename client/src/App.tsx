import React, { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import BooleanPieChart from './components/BooleanPieChart';
import Card from './components/Card';
import ChangeDeltaTimeline from './components/ChangeDeltaTimeline';
import Grid, { SmallGrid } from './components/Grid';
import Legend from './components/Legend';
import Page from './components/Page';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Content from './components/Content';
import Title from './components/Title';
import colours from './helpers/colours';
import numberFormatter from './helpers/numberFormatter';
import { WikiStatistics } from './helpers/statistics';
import socket from 'socket.io-client';

const App = (): JSX.Element => {
  const [connected, setConnected] = useState(false);
  const [stats, setStats] = useState<WikiStatistics | undefined>(undefined);

  useEffect(() => {
    const client = socket();
    client.on('connect', () => {
      setConnected(true);
    })
    client.on('disconnect', () => {
      setConnected(false);
    });
    client.on('stats', message => {
      setStats(message.data)
    });
    return () => {
      client.removeAllListeners()
    }
  }, [setConnected, setStats]);

  return (
    <Page>
      <GlobalStyle/>
      <Header>WikiWatch</Header>
      <Content>
        {connected && stats ? (
          <Grid>
            <SmallGrid>
              <Card columns={1} rows={1}>
                <Title>First</Title>
                <Legend>{stats.firstEdit}</Legend>
              </Card>
              <Card columns={1} rows={1}>
                <Title>Last</Title>
                <Legend>{stats.lastEdit}</Legend>
              </Card>
              <Card columns={1} rows={1}>
                <Title>{numberFormatter(stats.editCount, 2)}</Title>
                <Legend>Edit count</Legend>
              </Card>
              <Card columns={1} rows={1}>
                <Title>{numberFormatter(stats.uniqueUsers, 2)}</Title>
                <Legend>Unique users</Legend>
              </Card>
            </SmallGrid>
            <BooleanPieChart
              title="Edits by user status"
              data={stats.anonymous}
              trueLabel="Anonymous"
              trueColour={colours.black}
              falseLabel="Authenticated"
              falseColour={colours.primary}
            />
            <BooleanPieChart
              title="Edits by user type"
              data={stats.bots}
              trueLabel="Bots"
              trueColour={colours.black}
              falseLabel="Humans"
              falseColour={colours.primary}
            />
            <BooleanPieChart
              title="Edits by size"
              legend="Users responds as to if they think their edit is minor and can skip review"
              data={stats.minorEdits}
              trueLabel="Minor"
              trueColour={colours.black}
              falseLabel="Requires review"
              falseColour={colours.primary}
            />
            <BooleanPieChart
              title="Edits by page age"
              data={stats.newPageEdits}
              trueLabel="New"
              trueColour={colours.black}
              falseLabel="Existing"
              falseColour={colours.primary}
            />
            <BooleanPieChart
              title="Edits by patrolled page"
              data={stats.unreviewedEdits}
              trueLabel="Not patrolled"
              trueColour={colours.black}
              falseLabel="Patrolled"
              falseColour={colours.primary}
            />
            <ChangeDeltaTimeline data={stats.changeDelta}/>
            {stats.topCountries && (
              <BarChart
                title="Edit count by country"
                legend="Only anonymous users included"
                data={stats.topCountries}
                columns={3}
                rows={4}
                colour={colours.orange}
              />
            )}
            {stats.topCities && (
              <BarChart
                title="Edit count by city"
                legend="Only anonymous users included"
                data={stats.topCities}
                columns={3}
                rows={4}
                colour={colours.teal}
              />
            )}
          </Grid>
        ) : (
          <div>Attempting to create connection with backend...</div>
        )}
      </Content>
    </Page>
  );
}

export default App;
