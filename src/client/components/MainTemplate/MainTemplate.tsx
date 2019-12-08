import React from 'react';
import cn from 'classnames';

import Dashboard from "../Dashboard";
import TopBar from "../TopBar";

const styles = require('./MainTemplate.scss');

interface MainTemplateProps {
  className?: string
}

const MainTemplate = ({className}: MainTemplateProps) => (
  <div className={cn(styles['MainTemplate'], className)}>
    <div className={cn(styles['MainTemplate__top-bar'], className)}>
      <TopBar/>
    </div>
    <div className={cn(styles['MainTemplate__page-wrapper'], className)}>
      <Dashboard/>
    </div>
  </div>
);

export default MainTemplate;
