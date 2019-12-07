import React from 'react';
import {Card, Heading, Paragraph} from "@contentful/forma-36-react-components";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Dataset} from "../../http/stats";

function ingestData(datasets: Dataset[], metricsType: string): any[] {
  const result: any[] = [];

  datasets.forEach(dataset => {
    if (!dataset) return;

    const newEntry = {
      date: new Date(dataset.metadata.date).toLocaleTimeString()
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
  activeMetricsType: string,
  content: any
}

const Graph = ({data, activeMetricsType, content}: GraphProps) => {
  const parsedData = ingestData(data, activeMetricsType);
  const lines = data[data.length - 1].data ? Object.keys(data[data.length - 1].data) : [];

  return (
    <Card>
      <Heading element="h2">
        {content && content[activeMetricsType] ? content[activeMetricsType].title : activeMetricsType}
      </Heading>
      <Paragraph>
        {content && content[activeMetricsType] && content[activeMetricsType].description}
      </Paragraph>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={parsedData}
          margin={{
            // TODO: use tokens
            top: 30,
            right: 50,
            bottom: 30,
            left: 0
          }}>
          <XAxis dataKey="date"/>
          <YAxis/>
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
// TODO: use tokens
