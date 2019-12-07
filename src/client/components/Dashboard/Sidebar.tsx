import ViewFolder from "../ViewFolder";
import React from "react";

import {MetricsType} from "./constants";

export interface SideBarProps {
  metricsType: MetricsType,
  setActiveMetricsType: Function
}

const Sidebar = ({metricsType, setActiveMetricsType}: SideBarProps) => {
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

export default Sidebar;
