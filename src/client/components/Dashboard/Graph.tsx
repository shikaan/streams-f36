import React from 'react';
import {Card, Heading} from "@contentful/forma-36-react-components";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Dataset} from './Dashboard';

function ingestData(datasets: Dataset[], metricsType: string): any[] {
  const result: any[] = [];

  datasets.forEach(dataset => {
    if (!dataset) return;

    const newEntry = {
      name: new Date(dataset.metadata.date).toLocaleTimeString()
    };

    const items = Object.keys(dataset.data);

    items.forEach(item => {
      newEntry[item] = dataset.data[item][metricsType]
    });

    result.push(newEntry)
  });

  return result;
}

interface GraphProps {
  data: Array<Dataset>,
  activeMetricsType: string
}

const OPTIONS = {
  ['percentage']: {
    domain: [0, 100]
  }
};

const Graph = ({data, activeMetricsType}: GraphProps) => {
  const parsedData = ingestData(data, activeMetricsType);
  const lines = data[data.length - 1].data ? Object.keys(data[data.length - 1].data) : [];
  const options = OPTIONS[activeMetricsType] || {};

  return (
    <Card>
      <Heading element="h2">
        {activeMetricsType}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={parsedData}>
          <XAxis dataKey="name"/>
          <YAxis {...options}/>
          <Tooltip isAnimationActive={false}/>
          {
            lines.map(dataKey => <Area type="step" key={dataKey} isAnimationActive={false} dataKey={dataKey}/>)
          }
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Graph;
