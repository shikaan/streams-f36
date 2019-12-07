import React, {useEffect, useState} from 'react';
import Workbench from "@contentful/forma-36-react-components/dist/components/Workbench/Workbench";
import {EmptyState, Illustration} from "@contentful/forma-36-react-components";

import ViewFolder from "./ViewFolder/ViewFolder";
import Graph from './Graph';

enum MetricsType {
  Percentage = 'percentage',
  Nice = 'nice',
  System = 'system',
  Idle = 'idle',
  IOWait = 'iowait'
}

interface SidebarProps {
  metricsType: MetricsType,
  setActiveMetricsType: Function
}

const SideBar = ({metricsType, setActiveMetricsType}: SidebarProps) => {
  return <ViewFolder>
    <ViewFolder.Header title={"Metrics"}/>
    <ViewFolder.List>
      {
        Object.entries(MetricsType).map(([title, type]) => (
          <ViewFolder.Item
            key={type}
            title={title}
            isActive={metricsType === type}
            onClick={() => setActiveMetricsType(type)}
          />
        ))
      }
    </ViewFolder.List>
  </ViewFolder>;
};

async function* getStreamIterator(stream: ReadableStream) {
  const reader = stream.getReader();

  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

const pushFixedLength = (entry: any, array: Array<any>, length = 10) => {
  const result = [...array, entry];

  if (result.length >= length) {
    result.shift()
  }

  return result;
};

export interface Dataset {
  metadata: {
    date: string
  }
  data: {
    [label: string]: {
      nice: number;
      system: number;
      idle: number;
      iowait: number;
      irq: number;
      softirq: number;
      steal: number;
      guest: number;
      guestNice: number;
      user: number;
    }
  }
}

const fetchMetrics = async (datasets: Array<Dataset>, setDatasets: Function) => {
  const textDecoder = new TextDecoder();
  const {body} = await fetch(`${process.env.API_URL}/stats`);

  // We cannot access the updated datasets upon every setDataset
  // This will allow keep an internal reference to the most up to date element to allow queuing...
  // TODO: Use a Stream?
  let auxDatasets : Array<Dataset> = [];

  if (body) {
    const chunks = getStreamIterator(body);

    // @ts-nocheck
    for await (const chunk of chunks) {
      const string = textDecoder.decode(chunk);

      try {
        const dataset = JSON.parse(string) as Dataset;
        auxDatasets = pushFixedLength(dataset, auxDatasets, 10);
        setDatasets(auxDatasets)
      } catch (e) {
        console.log('Parse error');
        console.log(e);
      }
    }
  }
};

const Dashboard = () => {
  const [metricsType, setActiveMetricsType] = useState(MetricsType.Percentage);
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    if(!datasets.length) {
      fetchMetrics(datasets, setDatasets);
    }
  }, [datasets]);

  return (
    <Workbench>
      <Workbench.Header
        title={'Dashboard'}
        icon={<Illustration illustration={"Spreadsheet"}/>}
      />
      <Workbench.Sidebar position="left">
        <SideBar metricsType={metricsType} setActiveMetricsType={setActiveMetricsType}/>
      </Workbench.Sidebar>
      <Workbench.Content>
        {datasets.length
          ? <Graph data={datasets} activeMetricsType={metricsType}/>
          : <EmptyState headingProps={{text: 'Empty'}} descriptionProps={{text: 'LOL'}}/>
        }
      </Workbench.Content>
    </Workbench>
  );
};

export default Dashboard;
