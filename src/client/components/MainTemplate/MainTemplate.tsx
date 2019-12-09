import React from 'react';
import cn from 'classnames';

import TopBar from "../TopBar";

const styles = require('./MainTemplate.scss');

interface MainTemplateProps {
  className?: string,
  children: React.ReactNode
}

const MainTemplate = ({className, children}: MainTemplateProps) => (
  <main className={cn(styles['MainTemplate'], className)}>
    <header className={cn(styles['MainTemplate__top-bar'], className)}>
      <TopBar/>
    </header>
    <section className={cn(styles['MainTemplate__page-wrapper'], className)}>
      {children}
    </section>
  </main>
);

export default MainTemplate;
