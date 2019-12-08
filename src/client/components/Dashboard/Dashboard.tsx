import React, {useEffect, useState} from 'react';
import Workbench from "@contentful/forma-36-react-components/dist/components/Workbench/Workbench";
import {Illustration} from "@contentful/forma-36-react-components";

import {pushift} from "../../utils";
import {CONTENT_TYPE, DATASET_SIZE, MetricsType} from "./constants";

import Graph from './Graph';
import Sidebar from "./Sidebar";
import StatsHTTPClient, {Dataset} from "../../http/stats";
import ContentfulHTTPClient from "../../http/contentful";
import {ContentfulClientApi} from "contentful";

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

interface GraphContent {
  title: string,
  description: string,
  reference: MetricsType
}

const fetchContent = async (client: ContentfulClientApi, setContent: Function) => {
  const {items} = await client.getEntries({content_type: CONTENT_TYPE});

  const result = {};

  for (const item of items as Array<{ fields: GraphContent }>) {
    result[item.fields.reference] = item.fields
  }

  setContent(result)
};

const Dashboard = ({statsClient = StatsHTTPClient.getInstance(), contentfulClient = ContentfulHTTPClient.getInstance()}) => {
  const [metricsType, setActiveMetricsType] = useState(MetricsType.Percentage);
  const [datasets, setDatasets] = useState<Array<Dataset>>([]);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(false);
  const [content, setContent] = useState<any>();
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // Stripping out undefined elements
  const datasetRealLength = datasets.filter(i => i).length;

  useEffect(() => {
    if (!isLoadingDatasets && !datasets.length) {
      setIsLoadingDatasets(true);
      fetchStats(statsClient, datasets, setDatasets)
        .then(() => setIsLoadingDatasets(false))
        .catch(() => setIsLoadingDatasets(false))
    }

    if (!isLoadingContent && !content) {
      setIsLoadingContent(true);
      fetchContent(contentfulClient, setContent)
        .then(() => setIsLoadingContent(false))
        .catch(() => setIsLoadingContent(false))
    }
  }, [content, datasets]);

  // Don't show the graph with only one dataset
  const isGraphEmpty = datasetRealLength < 2;
  const isGraphLoading = isLoadingContent || (isLoadingDatasets && isGraphEmpty);

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

        <Graph
          data={datasets}
          activeMetricsType={metricsType}
          content={content}
          isLoading={isGraphLoading}
          isEmpty={isGraphEmpty}
        />

      </Workbench.Content>
    </Workbench>
  );
};

export default Dashboard;
