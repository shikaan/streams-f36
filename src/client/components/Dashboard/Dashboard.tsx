import React, {useEffect, useState} from 'react';
import Workbench from "@contentful/forma-36-react-components/dist/components/Workbench/Workbench";
import {EmptyState, Illustration} from "@contentful/forma-36-react-components";

import {pushift} from "../../utils";
import {DATASET_SIZE, MetricsType} from "./constants";

import Graph from './Graph';
import Sidebar from "./Sidebar";
import StatsHTTPClient, {Dataset} from "../../http/stats";

const fetchStats = async (client: StatsHTTPClient, datasets: Array<Dataset>, setDatasets: Function) => {
  // We cannot access the updated datasets upon every setDataset
  // This will allow keep an internal reference to the most up to date element to allow queuing...
  // TODO: Use a Stream?
  let auxDatasets: Array<Dataset> = new Array(DATASET_SIZE);

  for await (const dataset of client.fetch()) {
    auxDatasets = pushift(auxDatasets, dataset);
    setDatasets(auxDatasets)
  }
};

const Dashboard = ({statsClient = StatsHTTPClient.getInstance()}) => {
  const [metricsType, setActiveMetricsType] = useState(MetricsType.Percentage);
  const [datasets, setDatasets] = useState<Array<Dataset>>([]);

  useEffect(() => {
    if (!datasets.length) {
      fetchStats(statsClient, datasets, setDatasets);
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
