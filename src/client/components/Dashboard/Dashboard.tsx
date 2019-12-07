import React, {useEffect, useState} from 'react';
import Workbench from "@contentful/forma-36-react-components/dist/components/Workbench/Workbench";
import {EmptyState, Illustration} from "@contentful/forma-36-react-components";

import {getAsyncIterator, pushift} from "../../utils";
import {DATASET_SIZE, MetricsType} from "./constants";

import Graph from './Graph';
import Sidebar from "./Sidebar";

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
  let auxDatasets: Array<Dataset> = new Array(DATASET_SIZE);

  if (body) {
    const chunks = getAsyncIterator(body);

    // @ts-nocheck
    for await (const chunk of chunks) {
      const string = textDecoder.decode(chunk);

      try {
        const dataset = JSON.parse(string) as Dataset;
        auxDatasets = pushift(auxDatasets, dataset);
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
  const [datasets, setDatasets] = useState<Array<Dataset>>([]);

  useEffect(() => {
    if (!datasets.length) {
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
        <Sidebar metricsType={metricsType} setActiveMetricsType={setActiveMetricsType}/>
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
